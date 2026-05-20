import React, { useState, useEffect } from "react";
import "./App.css";
import heroImg from "./assets/hero.png";
import menuData from "./assets/menu.json";

function App() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [view, setView] = useState("home");

  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Mie", image: "" });

  // Load data dari LocalStorage saat startup
  useEffect(() => {
    const savedMenu = localStorage.getItem("niki_eco_menu");
    if (savedMenu) {
      setMenu(JSON.parse(savedMenu));
    } else {
      setMenu(menuData.food_items);
    }
    setLoading(false);
  }, []);

  // Simpan ke LocalStorage setiap kali menu berubah
  useEffect(() => {
    if (menu.length > 0) {
      localStorage.setItem("niki_eco_menu", JSON.stringify(menu));
      setFilteredMenu(menu);
    }
  }, [menu]);

  useEffect(() => {
    let hasil = menu.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "Semua") {
      hasil = hasil.filter((item) => item.category === category);
    }
    setFilteredMenu(hasil);
  }, [search, category, menu]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const kirimWA = () => {
    const totalHarga = cart.reduce((total, item) => total + item.price, 0);
    const rincian = cart.map((i) => `- ${i.name}`).join("%0A");
    const pesan = `Halo Mie Ayam Niki Eco!%0ASaya ingin memesan:%0A${rincian}%0A%0A*Total: Rp ${totalHarga.toLocaleString("id-ID")}*`;
    window.open(`https://wa.me/62881080579585?text=${pesan}`, "_blank");
  };

  const handleAdminLogin = () => {
    const password = prompt("Masukkan Password Admin:");
    if (password === "niki123") setView("admin");
    else alert("Password Salah!");
  };

  // FUNGSI ADMIN: TAMBAH
  const tambahMenu = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return alert("Isi nama dan harga!");
    const menuBaru = { ...newItem, id: Date.now(), price: parseInt(newItem.price), image: newItem.image || "https://via.placeholder.com/150" };
    setMenu([...menu, menuBaru]);
    setNewItem({ name: "", price: "", category: "Mie", image: "" });
  };

  // FUNGSI ADMIN: EDIT
  const editMenu = (id) => {
    const item = menu.find(m => m.id === id);
    const n = prompt("Nama baru:", item.name);
    const h = prompt("Harga baru:", item.price);
    if (n && h) {
      setMenu(menu.map(m => m.id === id ? { ...m, name: n, price: parseInt(h) } : m));
    }
  };

  // FUNGSI ADMIN: HAPUS
  const hapusMenu = (id) => {
    if (window.confirm("Hapus menu ini?")) {
      setMenu(menu.filter(m => m.id !== id));
    }
  };

  if (loading) return <div className="loading-screen">Memuat Niki Eco...</div>;

  return (
    <div className="app-container fade-in">
      <nav className="navbar">
        <div className="logo" onClick={() => setView("home")} style={{ cursor: 'pointer' }}>🍜 MIE AYAM NIKI ECO</div>
        <ul className="nav-links">
          <li className={`nav-item ${view === 'home' ? 'active-link' : ''}`} onClick={() => setView("home")}>HOME</li>
          <li className={`nav-item ${view === 'about' ? 'active-link' : ''}`} onClick={() => setView("about")}>ABOUT</li>
          <li className="nav-admin" onClick={handleAdminLogin}>ADMIN</li>
        </ul>
        <div className="nav-actions">
          <input type="text" placeholder="Cari menu..." className="search-input" onChange={(e) => setSearch(e.target.value)} />
          <div className="cart-badge">🛒 {cart.length}</div>
        </div>
      </nav>

      {view === "home" && (
        <>
          <header className="hero">
            <div className="hero-content">
              <p className="subtitle">Best in Town</p>
              <h1>ENJOY OUR DELICIOUS <br /> <span>MIE AYAM SPECIAL</span></h1>
              <p className="description">Solusi makan nikmat tanpa antre. Pesan sekarang, jemput saat siap!</p>
              <button className="order-btn" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>Order Now</button>
            </div>
            <div className="hero-image-container">
              <img src={heroImg} alt="Hero" className="main-hero-img floating-anim" />
            </div>
          </header>

          <section className="menu-section" id="menu">
            <div className="section-title">
              <h2>Menu Populer Kami</h2>
              <div className="filter-buttons">
                {["Semua", "Mie", "Minuman", "Tambahan"].map((cat) => (
                  <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="menu-grid">
              {filteredMenu.map((item) => (
                <div key={item.id} className="menu-card">
                  <img src={item.image} alt={item.name} />
                  <div className="card-info">
                    <h3>{item.name}</h3>
                    <p className="price">Rp {item.price.toLocaleString("id-ID")}</p>
                    <button className="add-to-cart" onClick={() => addToCart(item)}>Tambah</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === "admin" && (
        <section className="admin-panel" style={{ padding: '50px 8%' }}>
          <div className="admin-header">
            <h2>Panel Pengelolaan Menu</h2>
            <button className="back-btn" onClick={() => setView("home")}>Kembali ke Toko</button>
          </div>

          <div className="add-menu-form">
            <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Tambah Menu Baru</h3>
            <form onSubmit={tambahMenu} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Nama Menu" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="number" placeholder="Harga" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
              <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                <option value="Mie">Mie</option><option value="Minuman">Minuman</option><option value="Tambahan">Tambahan</option>
              </select>
              <button type="submit" className="add-btn-submit">Simpan Menu</button>
            </form>
          </div>

          <table className="admin-table">
            <thead>
              <tr><th>Nama Menu</th><th>Harga</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {menu.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>Rp {item.price.toLocaleString("id-ID")}</td>
                  <td>
                    <button className="edit-btn" onClick={() => editMenu(item.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => hapusMenu(item.id)} style={{ marginLeft: '10px' }}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {cart.length > 0 && view === "home" && (
        <div className="floating-cart">
          <span><strong>{cart.length} Pesanan</strong></span>
          <button className="checkout-btn" onClick={kirimWA}>Pesan di WhatsApp</button>
        </div>
      )}
    </div>
  );
}

export default App;