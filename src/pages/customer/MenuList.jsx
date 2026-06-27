import React, { useState, useEffect } from "react";
import menuService from "../../services/menuService"; // Import service menu

export default function MenuList({ search, category, setCategory, addToCart, menu }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (menu && menu.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [menu]);

  // Ambil 3 menu teratas dari props data 'menu' sebagai Best Seller secara otomatis
  const bestSellerItems = menu ? menu.slice(0, 3) : [];

  // Filter pencarian dan kategori langsung bersumber dari props data 'menu' global
  const filteredMenu = menu.filter((item) => {
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
          <div className="abstract-steam s-left"></div>
          <div className="abstract-steam s-right"></div>
        </div>

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
        <div className="hero-content">
          <span className="badge-promo">Homemade & Tanpa Pengawet</span>
          <h1>ENJOY OUR DELICIOUS <br /> <span>MIE AYAM SPECIAL</span></h1>
          <p className="description">Rasakan kenikmatan mie segar produksi sendiri dipadu bumbu kaldu warisan keluarga. Pesan praktis, bebas antre lama!</p>
          <button className="order-btn" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>Lihat Daftar Menu</button>
        </div>

        <div className="hero-image-container">
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
          <div className="hero-steam-glow"></div>
        </div>
      </header>

      {/* ==================== 2. SEKSI PROFIL WARUNG KULINER (Sesuai image_61ff24.jpg) ==================== */}
      <section className="about-address-container" style={{ padding: "80px var(--padding-side) 60px", backgroundColor: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ color: "#c8102e", fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "8px" }}>
            PROFIL WARUNG KULINER
          </span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: "800", margin: "0 0 20px 0", color: "#1a1a1a", letterSpacing: "-0.5px" }}>
            Warisan Rasa Kuliner Niki Eco 602
          </h2>
          <p style={{ color: "#4a5568", lineHeight: "1.8", fontSize: "1.05rem", margin: 0, fontWeight: "400" }}>
            Berdiri sejak tahun 2005 di Pekanbaru, <strong style={{ color: "#1a1a1a" }}>NIKI ECO 602</strong> berkomitmen tinggi untuk menyajikan kelezatan sehat bagi para penikmat kuliner. 
            Setiap lembaran produk <strong style={{ color: "#1a1a1a" }}>Mie Ayam Pangsit</strong> basah diolah sendiri secara mandiri (*homemade*) menggunakan resep rahasia keluarga tanpa tambahan zat pewarna sintetik maupun pengawet buatan. 
            Didukung oleh surat izin resmi dari Dinas Kesehatan (P-IRT), kami menjamin keamanan, kebersihan, dan mutu otentik yang khas di setiap mangkuk yang kami hidangkan.
          </p>
        </div>
      </section>

      {/* ==================== 3. SEKSI MENU TERLARIS MINGGU INI (Sesuai image_61ff24.jpg) ==================== */}
      <section style={{ padding: "40px var(--padding-side) 80px", backgroundColor: "#faf8f5" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ color: "#c8102e", fontSize: "0.9rem", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            🔥 Rekomendasi Teratas
          </span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: "800", marginTop: "10px", marginBottom: "10px", color: "#1a1a1a", letterSpacing: "-0.5px" }}>
            Menu Terlaris Minggu Ini
          </h2>
          <p style={{ color: "#718096", fontSize: "1.05rem", margin: 0 }}>
            Cicipi menu favorit pilihan utama para pelanggan setia kami.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "35px", maxWidth: "1200px", margin: "0 auto" }}>
          {bestSellerItems.map((item, index) => (
            <div 
              key={item.id || item.Id_menu || index} 
              className="best-seller-card"
              style={{ 
                background: "#ffffff", 
                borderRadius: "20px", 
                padding: "24px", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)", 
                position: "relative", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                transition: "transform 0.3s ease, boxShadow 0.3s ease",
                border: "1px solid #f1f1f5"
              }}
            >
              {/* Badge Rank Favorit */}
              <span style={{ 
                position: "absolute", top: "20px", left: "20px", 
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", 
                color: "#ffffff", padding: "6px 14px", borderRadius: "30px", 
                fontSize: "0.75rem", fontWeight: "800", zIndex: 2,
                boxShadow: "0 4px 10px rgba(245, 158, 11, 0.25)",
                letterSpacing: "0.5px"
              }}>
                ⭐ FAVORIT #{index + 1}
              </span>

              <div>
                {/* Pembungkus Gambar */}
                <div style={{ width: "100%", height: "210px", borderRadius: "14px", overflow: "hidden", marginBottom: "20px" }}>
                  <img 
                    src={item.image || item.Gambar || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"} 
                    alt={item.name || item.Nama_menu} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} 
                  />
                </div>
                
                {/* Informasi Judul & Teks */}
                <h4 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#1a1a1a", margin: "0 0 8px 0" }}>
                  {item.name || item.Nama_menu}
                </h4>
                <p style={{ fontSize: "0.92rem", color: "#4a5568", lineHeight: "1.6", marginBottom: "25px" }}>
                  {item.description || "Sajian mie segar berkualitas premium dipadukan kuah kaldu ayam gurih alami khas racikan rahasia Niki Eco 602."}
                </p>
              </div>

              {/* Garis Aksi Bawah */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px dashed #e2e8f0", paddingTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8rem", color: "#a0aec0", fontWeight: "600", marginBottom: "2px" }}>Harga</span>
                  <span style={{ fontWeight: "800", color: "#c8102e", fontSize: "1.4rem" }}>
                    Rp {(item.price || item.Harga || 0).toLocaleString("id-ID")}
                  </span>
                </div>
                <button 
                  className="add-to-cart" 
                  style={{ 
                    margin: 0, padding: "12px 24px", fontSize: "0.9rem", fontWeight: "700",
                    borderRadius: "12px", boxShadow: "0 4px 12px rgba(200, 16, 46, 0.15)"
                  }} 
                  onClick={() => addToCart(item)}
                >
                  + Tambah
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SEKSI DAFTAR GRID PRODUK MENU (Katalog Utama) */}
      <section className="menu-section" id="menu" style={{ paddingTop: "80px", backgroundColor: "#ffffff" }}>
        <div className="section-title">
          <h2>Menu Populer Kami</h2>
          <div className="filter-buttons">
            {["Semua", "Mie", "Minuman", "Tambahan"].map((cat) => (
              <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {displayMenu.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--text-gray)", fontStyle: "italic", padding: "40px" }}>
              Menu kuliner tidak ditemukan. Silakan cari dengan kata kunci lain...
            </div>
          ) : (
            displayMenu.map((item) => (
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
            ))
          )}
        </div>
      </section>

      {/* 5. SEKSI INFORMASI WARUNG INTERAKTIF */}
      <section className="store-info-section">
        <div className="info-card-grid">
          <div className="info-box-premium">
            <div className="info-icon-wrapper">📍</div>
            <h4>Lokasi Warung</h4>
            <p>Jl. Limbungan Simpang Tugu AMD, Rumbai Timur, Pekanbaru</p>
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

      {/* 6. FOOTER UTAMA PREMIUM ELEGAN */}
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