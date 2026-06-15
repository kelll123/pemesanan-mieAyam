import React, { useState, useEffect } from "react";
import menuService from "../../services/menuService"; // Import service CRUD menu
import menuData from "../../assets/menu.json"; // Import data json lokal sebagai cadangan

export default function MenuManagement({ setView }) {
  const [menu, setMenu] = useState([]); 
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Mie", image: "" });
  const [loading, setLoading] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false); // State untuk status database

  // Simulasi data kurir untuk pemantauan Admin (UC-03 / Antarmuka Pengiriman)
  const [courierStatus] = useState([
    { id: "K01", nama: "Budi Santoso", tugas: "#101", status: "🛵 SEDANG MENGANTAR" },
    { id: "K02", nama: "Andi Wijaya", tugas: "#102", status: "✅ SELESAI" },
    { id: "K03", nama: "Siti Rahma", tugas: "-", status: "💤 STANDBY" }
  ]);

  // Ambil data menu secara mandiri saat halaman admin dibuka
  useEffect(() => {
    const fetchAdminMenu = async () => {
      try {
        const data = await menuService.getAllMenu();
        setMenu(data);
        setIsDbConnected(true); // Database sukses terhubung
      } catch (error) {
        console.log("Koneksi backend belum aktif, admin menggunakan data cadangan JSON.");
        setIsDbConnected(false); // Database gagal terhubung (mode cadangan)
        if (menuData && menuData.food_items) {
          setMenu(menuData.food_items);
        }
      }
    };
    fetchAdminMenu();
  }, []);

  // Hitung data statistik untuk komponen Dashboard ringkas
  const totalMenu = menu.length;
  const totalMie = menu.filter(item => (item.category || item.Kategori) === "Mie").length;
  const kurirAktif = courierStatus.filter(k => k.status.includes("MENGANTAR")).length;

  const tambahMenu = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return alert("Nama dan harga wajib diisi!");
    
    setLoading(true);
    const dataKirim = {
      Nama_menu: newItem.name,
      Harga: parseInt(newItem.price),
      Deskripsi: "Mie segar lezat buatan sendiri",
      Gambar: newItem.image || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
      category: newItem.category,
      stok: 50 
    };

    try {
      const menuBaruDariDB = await menuService.createMenu(dataKirim);
      setMenu([...menu, menuBaruDariDB]);
      alert("Menu sukses disimpan ke Database MySQL!");
    } catch (error) {
      console.log("Menggunakan mode cadangan karena database eksternal belum siap.");
      const backupLokal = { ...dataKirim, id: Date.now(), name: dataKirim.Nama_menu, price: dataKirim.Harga };
      setMenu([...menu, backupLokal]);
    } finally {
      setNewItem({ name: "", price: "", category: "Mie", image: "" });
      setLoading(false);
    }
  };

  const editMenu = async (id) => {
    const item = menu.find(m => m.id === id || m.Id_menu === id);
    const namaAwal = item.name || item.Nama_menu;
    const hargaAwal = item.price || item.Harga;

    const n = prompt("Ubah Nama Menu:", namaAwal);
    const h = prompt("Ubah Harga:", hargaAwal);
    
    if (n && h) {
      const dataUpdate = { Nama_menu: n, Harga: parseInt(h) };
      try {
        await menuService.updateMenu(id, dataUpdate);
        alert("Menu berhasil diperbarui di database!");
      } catch (error) {
        console.log("Update cadangan lokal dijalankan.");
      }
      setMenu(menu.map(m => (m.id === id || m.Id_menu === id) ? { ...m, name: n, price: parseInt(h), Nama_menu: n, Harga: parseInt(h) } : m));
    }
  };

  const hapusMenu = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        await menuService.deleteMenu(id);
        alert("Menu terhapus dari Database MySQL!");
      } catch (error) {
        console.log("Penghapusan cadangan lokal dijalankan.");
      }
      setMenu(menu.filter(m => m.id !== id && m.Id_menu !== id));
    }
  };

  return (
    <section className="admin-panel-container">
      {/* HEADER PANEL */}
      <div className="admin-header-row">
        <div>
          <h2>Dashboard & Manajemen Toko (Admin)</h2>
          <p>Sistem Integrasi Pengolahan Data Kuliner Niki Eco 602</p>
        </div>
        <button className="back-to-store-btn" onClick={() => setView("home")}>
          Kembali ke Toko
        </button>
      </div>

      {/* --- SEKSI 1: DASHBOARD STATISTIK RINGKAS --- */}
      <div className="admin-dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Total Inventaris</h4>
            <h3>{totalMenu} Menu</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍜</div>
          <div className="stat-info">
            <h4>Varian Mie</h4>
            <h3>{totalMie} Items</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛵</div>
          <div className="stat-info">
            <h4>Kurir On-Duty</h4>
            <h3>{kurirAktif} Aktif</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-info">
            <h4>Status MySQL</h4>
            <h3 style={{ color: isDbConnected ? "#2e7d32" : "#d32f2f" }}>
              {isDbConnected ? "● Terhubung" : "● Mode Lokal"}
            </h3>
          </div>
        </div>
      </div>

      {/* --- SEKSI NEW: TABEL MONITORING STATUS KURIR --- */}
      <div className="admin-card-section">
        <h3>Log & Monitoring Status Kurir</h3>
        <table className="admin-table-custom">
          <thead>
            <tr>
              <th>ID Kurir</th>
              <th>Nama Kurir</th>
              <th>ID Tugas Pengantaran</th>
              <th>Status Operasional</th>
            </tr>
          </thead>
          <tbody>
            {courierStatus.map(k => (
              <tr key={k.id}>
                <td><strong>{k.id}</strong></td>
                <td>{k.nama}</td>
                <td><span className="admin-task-badge">{k.tugas}</span></td>
                <td>
                  <span className={`admin-courier-status ${
                    k.status.includes("MENGANTAR") ? "st-antar" : k.status.includes("SELESAI") ? "st-selesai" : "st-standby"
                  }`}>
                    {k.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- SEKSI 2: FORM TAMBAH MENU --- */}
      <div className="admin-card-section">
        <h3>Tambah Menu Baru</h3>
        <form onSubmit={tambahMenu} className="admin-form-row">
          <input type="text" placeholder="Nama Menu" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} disabled={loading} />
          <input type="number" placeholder="Harga" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} disabled={loading} />
          <input type="text" placeholder="URL Link Gambar (Opsional)" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} disabled={loading} />
          <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} disabled={loading}>
            <option value="Mie">Mie</option>
            <option value="Minuman">Minuman</option>
            <option value="Tambahan">Tambahan</option>
          </select>
          <button type="submit" className="admin-submit-btn" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Menu"}
          </button>
        </form>
      </div>

      {/* --- SEKSI 3: TABEL DATA MENU --- */}
      <div className="admin-card-section">
        <h3>Daftar Inventaris Menu</h3>
        <table className="admin-table-custom">
          <thead>
            <tr>
              <th>Nama Menu</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id || item.Id_menu}>
                <td style={{ fontWeight: "600" }}>{item.name || item.Nama_menu}</td>
                <td>Rp {(item.price || item.Harga || 0).toLocaleString("id-ID")}</td>
                <td><span className="admin-category-badge">{item.category || item.Kategori || "Mie"}</span></td>
                <td style={{ textAlign: "center" }}>
                  <button className="act-btn btn-edit-style" onClick={() => editMenu(item.id || item.Id_menu)}>Edit</button>
                  <button className="act-btn btn-delete-style" onClick={() => hapusMenu(item.id || item.Id_menu)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}