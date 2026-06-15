import React, { useState, useEffect } from "react";
import menuService from "../../services/menuService"; // Import service menu
import menuData from "../../assets/menu.json"; // Import data json lokal sebagai cadangan

export default function MenuList({ search, category, setCategory, addToCart }) {
  const [dbMenu, setDbMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // 1. Coba ambil data dari database MySQL lewat backend
        const data = await menuService.getAllMenu();
        setDbMenu(data);
      } catch (error) {
        console.log("Koneksi backend belum aktif, menggunakan data cadangan dari JSON lokal.");
        
        // 2. CADANGAN: Jika server database mati, pakai data dari menu.json agar tidak kosong
        if (menuData && menuData.food_items) {
          setDbMenu(menuData.food_items);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  // Filter pencarian dan kategori berdasarkan data dari database
  const filteredMenu = dbMenu.filter((item) => {
    const namaMenu = item.name || item.Nama_menu || "";
    return namaMenu.toLowerCase().includes(search.toLowerCase());
  });

  const displayMenu = category === "Semua" 
    ? filteredMenu 
    : filteredMenu.filter((item) => item.category === category || item.Kategori === category);

  // --- LOADING SCREEN ANIMASI MIE AYAM RAMAI & INTERAKTIF ---
  if (loading) {
    return (
      <div className="mie-loading-page-wrapper">
        {/* Elemen Latar Belakang / Partikel Kuliner Melayang */}
        <div className="bg-decorations">
          <span className="decor-item d1">🌶️</span>
          <span className="decor-item d2">🥬</span>
          <span className="decor-item d3">🥢</span>
          <span className="decor-item d4">✨</span>
          <span className="decor-item d5">🔥</span>
          <span className="decor-item d6">🥬</span>
          <span className="decor-item d7">🌶️</span>
          <span className="decor-item d8">✨</span>
          <span className="decor-item d9">🥢</span>
          
          {/* Garis-garis uap latar belakang abstrak */}
          <div className="abstract-steam s-left"></div>
          <div className="abstract-steam s-right"></div>
        </div>

        {/* Konten Utama di Tengah */}
        <div className="mie-loading-container">
          <div className="mie-animation-wrapper">
            <span className="mie-icon">🍜</span>
            <div className="mie-steam-burst">
              <span>░</span>
              <span>░</span>
              <span>░</span>
            </div>
          </div>
          <h3>Memuat Menu Segar...</h3>
          <p>Menyiapkan racikan mie homemade terbaik untuk Anda</p>
          <div className="loading-bar-wrapper">
            <div className="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 1. SEKSI BANNER HERO UTAMA */}
      <header className="hero">
        {/* SISI KIRI: Konten Teks */}
        <div className="hero-content">
          <span className="badge-promo">Homemade & Tanpa Pengawet</span>
          <h1>ENJOY OUR DELICIOUS <br /> <span>MIE AYAM SPECIAL</span></h1>
          <p className="description">Rasakan kenikmatan mie segar produksi sendiri dipadu bumbu kaldu warisan keluarga. Pesan praktis, bebas antre lama!</p>
          <button className="order-btn" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>Lihat Daftar Menu</button>
        </div>

        {/* SISI KANAN: Gambar Mangkuk Mie Ayam Asli dengan Ornamen Ikon Bergerak */}
        <div className="hero-image-container">
          {/* Ikon-ikon dekoratif kuliner yang melayang di sekeliling mangkuk */}
          <span className="floating-icon icon-1">🥢</span>
          <span className="floating-icon icon-2">✨</span>
          <span className="floating-icon icon-3">🍃</span>
          <span className="floating-icon icon-4">🔥</span>
          <span className="floating-icon icon-5">🍜</span>
          <span className="floating-icon icon-6">✨</span>

          <img 
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80" 
            alt="Mie Ayam Niki Eco Special" 
            className="main-hero-img floating-mie-anim" 
          />
          {/* Ornamen uap estetis di belakang gambar */}
          <div className="hero-steam-glow"></div>
        </div>
      </header>

      {/* 2. SEKSI DAFTAR GRID PRODUK MENU */}
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
          {displayMenu.map((item) => (
            <div key={item.id || item.Id_menu} className="menu-card">
              <div className="card-img-wrapper">
                <img
                  src={item.image || item.Gambar}
                  alt={item.name || item.Nama_menu}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500";
                  }}
                />
              </div>
              <div className="card-info">
                <h3>{item.name || item.Nama_menu}</h3>
                <p className="price">Rp {(item.price || item.Harga || 0).toLocaleString("id-ID")}</p>
                <button className="add-to-cart" onClick={() => addToCart(item)}>Tambah ke Keranjang</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEKSI INFORMASI WARUNG INTERAKTIF */}
      <section className="store-info-section">
        <div className="info-card-grid">
          <div className="info-box-premium">
            <div className="info-icon-wrapper">📍</div>
            <h4>Lokasi Warung</h4>
            <p>Jl. Rumbai Pesisir No. 602, Pekanbaru, Riau</p>
          </div>
          <div className="info-box-premium">
            <div className="info-icon-wrapper">🕒</div>
            <h4>Jam Operasional</h4>
            <p>Setiap Hari: 10:00 - 21:00 WIB</p>
          </div>
          <div className="info-box-premium">
            <div className="info-icon-wrapper">📞</div>
            <h4>Kontak & Pesanan</h4>
            <p>WhatsApp: +62 812-3456-7890</p>
          </div>
        </div>
      </section>

      {/* 4. FOOTER UTAMA PREMIUM ELEGAN */}
      <footer className="main-footer-premium">
        <div className="footer-top-brand">
          <h3 className="footer-logo"><span>🍜</span> NIKI ECO 602</h3>
          <p className="footer-tagline">Kelezatan Mie Ayam Homemade Terbaik dengan Layanan Integrasi Database Cepat.</p>
        </div>
        
        <div className="footer-premium-divider"></div>
        
        <div className="footer-bottom-bar">
          <p className="premium-copyright">© 2026 Niki Eco 602. Seluruh Hak Cipta Dilindungi.</p>
          <div className="footer-social-sim">
            <span>🌐 www.nikieco602.com</span>
            <span>📸 @nikieco602_official</span>
          </div>
        </div>
      </footer>
    </>
  );
}