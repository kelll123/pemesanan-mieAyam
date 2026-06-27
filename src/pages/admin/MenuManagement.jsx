import React, { useState, useEffect } from "react";
import menuService from "../../services/menuService"; // Import service CRUD menu

export default function MenuManagement({ setView, orders, onAssignCourier, globalMenu, setGlobalMenu }) {
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Mie", image: "" });
  const [loading, setLoading] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false); // State untuk status database
  const [selectedCourier, setSelectedCourier] = useState({}); // State pelacak kurir terpilih per pesanan

  // --- STATE DETEKSI KARTU SUB-VIEW AKTIF ---
  const [activeSubView, setActiveSubView] = useState("main");

  // --- STATE MANAJEMEN INPUT MULTIMEDIA GALERI & TESTIMONI ---
  const [galleryType, setGalleryType] = useState("Foto");
  const [galleryItem, setGalleryItem] = useState({ title: "", fileUrl: "", description: "" });
  const [localGalleryList, setLocalGalleryList] = useState([]);

  // --- MASTER DATA OPERASIONAL TIM KURIR YANG SINKRON ---
  const [courierStatus, setCourierStatus] = useState([
    { id: 1, nama: "Budi Santoso (Kurir 1)", tugas: "-", status: "💤 STANDBY" },
    { id: 2, nama: "Andi Wijaya (Kurir 2)", tugas: "-", status: "💤 STANDBY" },
    { id: 3, nama: "Siti Rahma (Kurir 3)", tugas: "-", status: "💤 STANDBY" }
  ]);

  // Digunakan untuk merender dropdown select admin agar ID-nya klop dengan tabel monitoring
  const couriersList = courierStatus.map(c => ({
    Id_login: c.id,
    Nama: c.nama
  }));

  // Fungsi memuat ulang data galeri dari localStorage
  const refreshGalleryData = () => {
    const savedGallery = JSON.parse(localStorage.getItem("niki_eco_gallery")) || [];
    setLocalGalleryList(savedGallery);
  };

  // Cek koneksi backend secara berkala & muat data galeri
  useEffect(() => {
    const fetchAdminMenu = async () => {
      try {
        const data = await menuService.getAllMenu();
        setGlobalMenu(data);
        setIsDbConnected(true);
      } catch (error) {
        console.log("Koneksi backend belum aktif, mempertahankan data di state global.");
        setIsDbConnected(false);
      }
    };
    fetchAdminMenu();
    refreshGalleryData();
  }, [setGlobalMenu]);

  // Efek Sinkronisasi: Otomatis mendeteksi pesanan aktif "DIKIRIM" dari App.jsx untuk mengubah tabel kurir bawah
  useEffect(() => {
    if (orders) {
      setCourierStatus(prevStatus =>
        prevStatus.map(k => {
          // Cari apakah kurir ini sedang memegang pesanan yang statusnya sedang dikirim
          const orderAktif = orders.find(o => o.Id_kurir === k.id && o.Status_pesanan === "DIKIRIM");
          if (orderAktif) {
            return { ...k, tugas: `#${orderAktif.Id_pesanan}`, status: "🛵 SEDANG MENGANTAR" };
          }
          // Cari apakah ada riwayat pesanan selesai untuk kurir ini
          const orderSelesai = orders.find(o => o.Id_kurir === k.id && o.Status_pesanan === "SELESAI");
          if (orderSelesai) {
            return { ...k, tugas: `#${orderSelesai.Id_pesanan}`, status: "✅ SELESAI" };
          }
          return { ...k, tugas: "-", status: "💤 STANDBY" };
        })
      );
    }
  }, [orders]);

  // Hitung data statistik untuk komponen Dashboard ringkas
  const totalMenu = globalMenu ? globalMenu.length : 0;
  const totalMie = globalMenu ? globalMenu.filter(item => (item.category || item.Kategori) === "Mie").length : 0;
  const kurirAktif = courierStatus.filter(k => k.status.includes("MENGANTAR")).length;

  const handleSelectCourierChange = (orderId, courierId) => {
    setSelectedCourier({ ...selectedCourier, [orderId]: courierId });
  };

  // --- HANDLER INTERAKTIF PERINTAH KURIR ---
  const handleTugaskanKurirAction = (orderId) => {
    const courierId = selectedCourier[orderId];
    if (!courierId) return alert("Silakan pilih personel kurir terlebih dahulu!");

    // 1. Eksekusi fungsi global router App.jsx agar status pesanan naik menjadi "DIKIRIM"
    onAssignCourier(orderId, courierId);

    // 2. Tampilkan Alert Informasi Sukses
    const kurirInfo = courierStatus.find(c => c.id === parseInt(courierId));
    alert(`Perintah Berhasil! Pesanan #${orderId} resmi didelegasikan kepada ${kurirInfo?.nama}. Notifikasi tugas otomatis terkirim.`);
  };

  // --- HANDLER: CRUD MEDIA GALERI & TESTIMONI ---
  const tambahGaleri = (e) => {
    e.preventDefault();
    if (!galleryItem.title || !galleryItem.description) {
      return alert("Nama/Judul dan Keterangan wajib diisi!");
    }
    if (galleryType !== "Testimoni" && !galleryItem.fileUrl) {
      return alert("URL File Media wajib diisi untuk Foto/Video!");
    }

    const dataMediaBaru = {
      id: Date.now(),
      type: galleryType,
      title: galleryItem.title,
      fileUrl: galleryType === "Testimoni" ? "" : galleryItem.fileUrl,
      description: galleryItem.description
    };

    const currentGallery = JSON.parse(localStorage.getItem("niki_eco_gallery")) || [];
    const updatedGallery = [dataMediaBaru, ...currentGallery];
    localStorage.setItem("niki_eco_gallery", JSON.stringify(updatedGallery));

    alert(`Sukses menyimpan ${galleryType} baru ke database lokal Galeri!`);
    setGalleryItem({ title: "", fileUrl: "", description: "" });
    refreshGalleryData();
  };

  const editGaleri = (id) => {
    const item = localGalleryList.find(g => g.id === id);
    if (!item) return;

    const t = prompt(`Ubah Judul / Nama (${item.type}):`, item.title);
    const d = prompt("Ubah Keterangan / Isi Ulasan:", item.description);
    let u = item.fileUrl;
    
    if (item.type !== "Testimoni") {
      u = prompt("Ubah URL Link Berkas Media:", item.fileUrl);
    }

    if (t && d) {
      const updatedGallery = localGalleryList.map(g => 
        g.id === id ? { ...g, title: t, description: d, fileUrl: u } : g
      );
      localStorage.setItem("niki_eco_gallery", JSON.stringify(updatedGallery));
      alert("Konten galeri sukses diperbarui!");
      refreshGalleryData();
    }
  };

  const hapusGaleri = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aset galeri/testimoni ini?")) {
      const updatedGallery = localGalleryList.filter(g => g.id !== id);
      localStorage.setItem("niki_eco_gallery", JSON.stringify(updatedGallery));
      alert("Aset galeri berhasil dihapus!");
      refreshGalleryData();
    }
  };

  // --- CRUD INVENTARIS MENU ---
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
      setGlobalMenu([...globalMenu, menuBaruDariDB]);
      alert("Menu sukses disimpan ke Database MySQL!");
    } catch (error) {
      const backupLokal = { id: Date.now(), name: dataKirim.Nama_menu, price: dataKirim.Harga, category: dataKirim.category, image: dataKirim.Gambar };
      setGlobalMenu([...globalMenu, backupLokal]);
      alert("Menu sukses ditambahkan! (Simulasi Browser)");
    } finally {
      setNewItem({ name: "", price: "", category: "Mie", image: "" });
      setLoading(false);
    }
  };

  const editMenu = async (id) => {
    const item = globalMenu.find(m => m.id === id || m.Id_menu === id);
    const n = prompt("Ubah Nama Menu:", item ? (item.name || item.Nama_menu) : "");
    const h = prompt("Ubah Harga:", item ? (item.price || item.Harga) : 0);

    if (n && h) {
      try { await menuService.updateMenu(id, { Nama_menu: n, Harga: parseInt(h) }); } catch (error) {}
      setGlobalMenu(globalMenu.map(m => (m.id === id || m.Id_menu === id) ? { ...m, name: n, price: parseInt(h), Nama_menu: n, Harga: parseInt(h) } : m));
    }
  };

  const hapusMenu = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try { await menuService.deleteMenu(id); } catch (error) {}
      setGlobalMenu(globalMenu.filter(m => m.id !== id && m.Id_menu !== id));
    }
  };

  return (
    <section className="admin-panel-container" style={{ padding: "40px var(--padding-side)", backgroundColor: "#faf8f5", minHeight: "100vh" }}>
      
      {/* HEADER PANEL UTAMA */}
      <div className="admin-header-row" style={{ marginBottom: "30px" }}>
        <div>
          <h2>Dashboard & Manajemen Toko (Admin)</h2>
          <p>Sistem Integrasi Pengolahan Data Kuliner Niki Eco 602</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {activeSubView !== "main" && (
            <button className="back-to-store-btn" style={{ backgroundColor: "#4a5568" }} onClick={() => setActiveSubView("main")}>
              ← Menu Utama Admin
            </button>
          )}
          <button className="back-to-store-btn" onClick={() => setView("home")}>
            Kembali ke Toko
          </button>
        </div>
      </div>

      {/* --- SEKSI STATISTIK ATAS --- */}
      <div className="admin-dashboard-grid" style={{ marginBottom: "40px" }}>
        <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => setActiveSubView("inventaris")}>
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>TOTAL INVENTARIS</h4>
            <h3>{totalMenu} Menu</h3>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => setActiveSubView("inventaris")}>
          <div className="stat-icon">🍜</div>
          <div className="stat-info">
            <h4>VARIAN MIE</h4>
            <h3>{totalMie} Items</h3>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => setActiveSubView("kurir")}>
          <div className="stat-icon">🛵</div>
          <div className="stat-info">
            <h4>KURIR ON-DUTY</h4>
            <h3>{kurirAktif} Aktif</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-info">
            <h4>STATUS MYSQL</h4>
            <h3 style={{ color: isDbConnected ? "#2e7d32" : "#d32f2f" }}>
              {isDbConnected ? "● Terhubung" : "● Mode Lokal"}
            </h3>
          </div>
        </div>
      </div>

      {/* ==================== DISPLAY UTAMA: KARTU PILIHAN NAVIGASI ==================== */}
      {activeSubView === "main" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", marginTop: "20px" }}>
          <div className="stat-card" style={{ flexDirection: "column", padding: "30px", background: "#ffffff", borderRadius: "16px", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "3.2rem", marginBottom: "15px" }}>🍜</div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1a1a1a", margin: "0 0 10px 0" }}>Kelola Menu Kuliner</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-gray)", marginBottom: "25px", minHeight: "36px" }}>Tambah produk baru, modifikasi harga pasar, dan hapus menu makanan.</p>
            <button className="admin-submit-btn" style={{ width: "100%", margin: 0 }} onClick={() => setActiveSubView("inventaris")}>Buka Manajemen Menu</button>
          </div>

          <div className="stat-card" style={{ flexDirection: "column", padding: "30px", background: "#ffffff", borderRadius: "16px", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "3.2rem", marginBottom: "15px" }}>📸</div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1a1a1a", margin: "0 0 10px 0" }}>Galeri & Testimoni</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-gray)", marginBottom: "25px", minHeight: "36px" }}>Input asset promosi foto, tautan video liputan YouTube, dan ulasan pembeli.</p>
            <button className="admin-submit-btn" style={{ width: "100%", margin: 0, backgroundColor: "#3182ce" }} onClick={() => setActiveSubView("multimedia")}>Buka Manajemen Galeri</button>
          </div>

          <div className="stat-card" style={{ flexDirection: "column", padding: "30px", background: "#ffffff", borderRadius: "16px", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "3.2rem", marginBottom: "15px" }}>📦</div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1a1a1a", margin: "0 0 10px 0" }}>Penugasan Order</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-gray)", marginBottom: "25px", minHeight: "36px" }}>Delegasikan pesanan catering atau perorangan yang masuk menuju kurir internal.</p>
            <button className="admin-submit-btn" style={{ width: "100%", margin: 0, backgroundColor: "#eab308" }} onClick={() => setActiveSubView("pesanan")}>Buka Manajemen Order</button>
          </div>

          <div className="stat-card" style={{ flexDirection: "column", padding: "30px", background: "#ffffff", borderRadius: "16px", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: "3.2rem", marginBottom: "15px" }}>🛵</div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1a1a1a", margin: "0 0 10px 0" }}>Monitoring Kurir</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-gray)", marginBottom: "25px", minHeight: "36px" }}>Pantau log operasional logistik status tugas pengantaran tim kurir lapangan.</p>
            <button className="admin-submit-btn" style={{ width: "100%", margin: 0, backgroundColor: "#38a169" }} onClick={() => setActiveSubView("kurir")}>Buka Log Status Kurir</button>
          </div>
        </div>
      )}

      {/* ==================== SUB VIEW 1: MANAJEMEN INVENTARIS MENU ==================== */}
      {activeSubView === "inventaris" && (
        <div className="fade-in">
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
              <button type="submit" className="admin-submit-btn" disabled={loading}>{loading ? "Menyimpan..." : "Simpan Menu"}</button>
            </form>
          </div>

          <div className="admin-card-section" style={{ marginTop: "30px" }}>
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
                {globalMenu && globalMenu.map(item => (
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
        </div>
      )}

      {/* ==================== SUB VIEW 2: INPUT & TABEL GALERI ==================== */}
      {activeSubView === "multimedia" && (
        <div className="fade-in">
          <div className="admin-card-section">
            <h3>Form Input Konten Galeri & Testimoni</h3>
            <div style={{ display: "flex", gap: "12px", marginBottom: "25px" }}>
              {["Foto", "Video", "Testimoni"].map((type) => (
                <button
                  key={type} type="button" onClick={() => setGalleryType(type)}
                  style={{
                    flex: 1, padding: "12px", fontWeight: "700", borderRadius: "8px", border: "none", cursor: "pointer",
                    backgroundColor: galleryType === type ? (type === "Foto" ? "#c8102e" : type === "Video" ? "#3182ce" : "#38a169") : "#e2e8f0",
                    color: galleryType === type ? "#ffffff" : "#4a5568", transition: "all 0.2s ease"
                  }}
                >
                  {type === "Foto" ? "📸 Materi Foto" : type === "Video" ? "🎥 Berkas Video" : "💬 Ulasan / Testimoni"}
                </button>
              ))}
            </div>

            <form onSubmit={tambahGaleri} className="admin-form-row" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "grid", gridTemplateColumns: galleryType === "Testimoni" ? "1fr" : "1fr 1fr", gap: "15px" }}>
                <input type="text" placeholder={galleryType === "Testimoni" ? "Nama Lengkap Pemberi Ulasan Konsumen" : "Judul Galeri Foto/Video Kuliner"} value={galleryItem.title} onChange={(e) => setGalleryItem({ ...galleryItem, title: e.target.value })} />
                {galleryType !== "Testimoni" && (
                  <input type="text" placeholder="Link URL Gambar (.jpg/.png) atau Link Video YouTube Embed" value={galleryItem.fileUrl} onChange={(e) => setGalleryItem({ ...galleryItem, fileUrl: e.target.value })} />
                )}
              </div>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <input type="text" placeholder={galleryType === "Testimoni" ? "Tuliskan isi kalimat ulasan/testimoni lengkap konsumen disini..." : "Keterangan/deskripsi singkat isi konten media galeri..."} value={galleryItem.description} onChange={(e) => setGalleryItem({ ...galleryItem, description: e.target.value })} style={{ flex: 1 }} />
                <button type="submit" className="admin-submit-btn" style={{ whiteSpace: "nowrap", height: "100%", margin: 0, padding: "0 25px" }}>💾 Simpan Galeri</button>
              </div>
            </form>
          </div>

          <div className="admin-card-section" style={{ marginTop: "30px" }}>
            <h3>Daftar Inventaris Galeri & Testimoni</h3>
            <table className="admin-table-custom">
              <thead>
                <tr>
                  <th>Preview / Tipe</th>
                  <th>Judul / Nama Kontributor</th>
                  <th>Keterangan / Konten</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {localGalleryList.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "#a0aec0", padding: "15px", fontStyle: "italic" }}>Belum ada aset multimedia galeri yang disimpan di browser ini.</td>
                  </tr>
                ) : (
                  localGalleryList.map((item) => (
                    <tr key={item.id}>
                      <td style={{ verticalAlign: "middle" }}>
                        {item.type === "Foto" && item.fileUrl && (
                          <img src={item.fileUrl} alt={item.title} style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px", display: "block", marginBottom: "4px" }} />
                        )}
                        <span className="admin-category-badge" style={{ 
                          backgroundColor: item.type === "Foto" ? "#ffeef0" : item.type === "Video" ? "#ebf8ff" : "#e6fffa",
                          color: item.type === "Foto" ? "#c8102e" : item.type === "Video" ? "#2b6cb0" : "#234e52",
                          fontSize: "11px", fontWeight: "700"
                        }}>
                          {item.type === "Foto" ? "📸 Foto" : item.type === "Video" ? "🎥 Video" : "💬 Review"}
                        </span>
                      </td>
                      <td><strong>{item.title}</strong></td>
                      <td style={{ fontSize: "13px", color: "#4a5568", maxWidth: "400px", whiteSpace: "normal" }}>
                        {item.description}
                        {item.fileUrl && <div style={{ fontSize: "11px", color: "#a0aec0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "4px" }}>{item.fileUrl}</div>}
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                        <button className="act-btn btn-edit-style" onClick={() => editGaleri(item.id)}>Edit</button>
                        <button className="act-btn btn-delete-style" onClick={() => hapusGaleri(item.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== SUB VIEW 3: PENUGASAN PESANAN MASUK ==================== */}
      {activeSubView === "pesanan" && (
        <div className="admin-card-section fade-in">
          <h3>📦 Penugasan Pesanan Masuk</h3>
          <table className="admin-table-custom">
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Pelanggan / No. HP</th>
                <th>Alamat Pengiriman</th>
                <th>Total Harga</th>
                <th style={{ textAlign: "center" }}>Pilih & Tugaskan Kurir</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.filter(o => o.Status_pesanan === "DIPROSES" || o.Status_pesanan === "PENDING").length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#666", padding: "15px", fontStyle: "italic" }}>Tidak ada pesanan baru yang perlu diproses.</td>
                </tr>
              ) : (
                orders && orders.filter(order => order.Status_pesanan === "DIPROSES" || order.Status_pesanan === "PENDING").map((order) => (
                  <tr key={order.Id_pesanan}>
                    <td><strong>#{order.Id_pesanan}</strong></td>
                    <td>
                      <div>{order.Nama_pelanggan}</div>
                      <small style={{ color: "#777" }}>{order.No_hp}</small>
                    </td>
                    <td>{order.Alamat_pengiriman}</td>
                    <td>Rp {(order.Total_harga || 0).toLocaleString("id-ID")}</td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                        <select style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc" }} value={selectedCourier[order.Id_pesanan] || ""} onChange={(e) => handleSelectCourierChange(order.Id_pesanan, e.target.value)}>
                          <option value="">-- Pilih --</option>
                          {couriersList.map(c => <option key={c.Id_login} value={c.Id_login}>{c.Nama}</option>)}
                        </select>
                        <button 
                          className="act-btn btn-edit-style" 
                          style={{ padding: "6px 12px", margin: 0 }} 
                          onClick={() => handleTugaskanKurirAction(order.Id_pesanan)} 
                          disabled={!selectedCourier[order.Id_pesanan]}
                        >
                          Tugaskan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ==================== SUB VIEW 4: MONITORING STATUS KURIR ==================== */}
      {activeSubView === "kurir" && (
        <div className="admin-card-section fade-in">
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
                  <td><strong>K0{k.id}</strong></td>
                  <td>{k.nama}</td>
                  <td><span className="admin-task-badge">{k.tugas}</span></td>
                  <td>
                    <span className={`admin-courier-status ${k.status.includes("MENGANTAR") ? "st-antar" : k.status.includes("SELESAI") ? "st-selesai" : "st-standby"}`}>
                      {k.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </section>
  );
}