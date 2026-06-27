import React from "react";

export default function About() {
  const handleOrderViaWA = () => {
    const phoneNumber = "6281234567890"; // Sesuaikan dengan nomor WhatsApp warung
    const message = encodeURIComponent("Halo Niki Eco 602, saya ingin bertanya tentang pesanan catering / acara.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#faf8f5", width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      
      {/* ELEMEN DEKORASI LATAR BELAKANG (Bikin Suasana Ramai & Hidup) */}
      <div className="bg-decorations" style={{ pointerEvents: "none" }}>
        <span className="decor-item d1" style={{ top: "10%", left: "5%" }}>🍜</span>
        <span className="decor-item d2" style={{ top: "15%", right: "6%" }}>🥬</span>
        <span className="decor-item d3" style={{ bottom: "30%", left: "4%" }}>🥢</span>
        <span className="decor-item d4" style={{ bottom: "15%", right: "5%" }}>🌶️</span>
        <span className="decor-item d5" style={{ top: "45%", left: "2%" }}>🔥</span>
        <span className="decor-item d6" style={{ bottom: "45%", right: "2%" }}>✨</span>
      </div>

      <section className="about-section fade-in" style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px", position: "relative", zIndex: 2 }}>
        
        {/* 1. HEADER HALAMAN */}
        <div className="about-header" style={{ textCenter: "center", marginBottom: "50px" }}>
          <span className="badge-promo" style={{ marginBottom: "12px", background: "#ffeef0", color: "#c8102e" }}>
            Kisah & Komitmen Kami
          </span>
          <h2 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#1a1a1a", letterSpacing: "-1px" }}>
            Tentang NIKI ECO 602
          </h2>
          <p className="about-subtitle" style={{ color: "#c8102e", fontWeight: "700" }}>
            Cita Rasa Otentik, Higienis, & Tanpa Bahan Pengawet
          </p>
        </div>

        {/* 2. DASHBOARD STATISTIK (Angka Pencapaian Warung) */}
        <div className="admin-dashboard-grid" style={{ marginBottom: "50px", gap: "25px" }}>
          <div className="stat-card" style={{ padding: "25px", justifyContent: "center", textAlign: "center", background: "#ffffff", borderTop: "4px solid #c8102e" }}>
            <div className="stat-info">
              <h3 style={{ fontSize: "2.3rem", color: "#c8102e", fontWeight: "800", marginBottom: "5px" }}>2005</h3>
              <h4 style={{ fontSize: "0.85rem", color: "var(--text-gray)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Melayani Sejak</h4>
            </div>
          </div>
          <div className="stat-card" style={{ padding: "25px", justifyContent: "center", textAlign: "center", background: "#ffffff", borderTop: "4px solid #c8102e" }}>
            <div className="stat-info">
              <h3 style={{ fontSize: "2.3rem", color: "#c8102e", fontWeight: "800", marginBottom: "5px" }}>10K+</h3>
              <h4 style={{ fontSize: "0.85rem", color: "var(--text-gray)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Mangkok Terjual</h4>
            </div>
          </div>
          <div className="stat-card" style={{ padding: "25px", justifyContent: "center", textAlign: "center", background: "#ffffff", borderTop: "4px solid #c8102e" }}>
            <div className="stat-info">
              <h3 style={{ fontSize: "2.3rem", color: "#c8102e", fontWeight: "800", marginBottom: "5px" }}>100%</h3>
              <h4 style={{ fontSize: "0.85rem", color: "var(--text-gray)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Homemade & Halal</h4>
            </div>
          </div>
          <div className="stat-card" style={{ padding: "25px", justifyContent: "center", textAlign: "center", background: "#ffffff", borderTop: "4px solid #c8102e" }}>
            <div className="stat-info">
              <h3 style={{ fontSize: "2.3rem", color: "#c8102e", fontWeight: "800", marginBottom: "5px" }}>Dinkes</h3>
              <h4 style={{ fontSize: "0.85rem", color: "var(--text-gray)", textTransform: "uppercase", letterSpacing: "0.5px" }}>P-IRT Terdaftar</h4>
            </div>
          </div>
        </div>

        {/* 3. LAYOUT GRID UTAMA: PROFIL & LAYANAN CATERING */}
        <div className="about-container" style={{ marginBottom: "50px", gap: "30px" }}>
          {/* KARTU PROFIL WARUNG */}
          <div className="about-box" style={{ background: "#ffffff", borderRadius: "20px", padding: "35px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #f1f1f5", paddingBottom: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "800" }}>Profil Warung Kami</h3>
              <span style={{ fontSize: "1.6rem" }}>🏢</span>
            </div>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "#2d3748" }}>
              <strong>NIKI ECO 602</strong> merupakan warung kuliner legendaris di Pekanbaru yang menyajikan menu favorit secara higienis menggunakan resep rahasia warisan keluarga. Kami memproduksi bahan baku utama secara mandiri, memastikan produk <strong>Mie Ayam Pangsit</strong> kami bebas dari bahan pengawet buatan dan pewarna sintetik.
            </p>
            <p style={{ marginTop: "15px", color: "var(--text-gray)", fontSize: "1rem", lineHeight: "1.8" }}>
              Telah memperoleh izin resmi dari <strong>Dinkes Pekanbaru</strong> untuk Produksi Industri Rumah Tangga (P-IRT) dengan nomor registrasi resmi, menjamin keamanan, kebersihan, dan mutu hidangan di setiap mangkuk yang kami sajikan kepada pelanggan setia.
            </p>
          </div>

          {/* KARTU LAYANAN CATERING */}
          <div className="about-box highlighted" style={{ borderRadius: "20px", padding: "35px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #f1f1f5", paddingBottom: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "800" }}>Menerima Pesanan Acara</h3>
              <span style={{ fontSize: "1.6rem" }}>🍱</span>
            </div>
            <p style={{ color: "var(--text-gray)", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.6" }}>
              Bikin momen berhargamu makin istimewa dengan hidangan kuliner lezat yang siap diantarkan langsung ke lokasi acara oleh tim kurir internal kami:
            </p>
            <ul className="about-list" style={{ gap: "12px" }}>
              <li>🎉 Acara Pesta & Ulang Tahun</li>
              <li>🤝 Kegiatan Arisan Keluarga</li>
              <li>💼 Rapat Kantor & Gathering Instansi</li>
            </ul>
            
            <button 
              className="checkout-btn" 
              onClick={handleOrderViaWA}
              style={{ 
                width: "100%", 
                marginTop: "25px", 
                padding: "14px", 
                fontWeight: "700", 
                borderRadius: "12px",
                background: "linear-gradient(135deg, #c8102e 0%, #a00d25 100%)",
                boxShadow: "0 4px 15px rgba(200, 16, 46, 0.2)"
              }}
            >
              💬 Hubungi via WhatsApp Catering
            </button>
          </div>
        </div>

        {/* 4. PILAR UTAMA KEUNGGULAN (3 KOLOM PREMIUM) */}
        <div className="info-card-grid" style={{ marginBottom: "60px", gap: "25px" }}>
          <div className="info-box-premium" style={{ background: "#ffffff", padding: "30px 20px" }}>
            <div className="info-icon-wrapper" style={{ background: "#ffeef0", color: "#c8102e" }}>🌾</div>
            <h4 style={{ fontWeight: "700", marginTop: "10px" }}>Bahan Baku Mandiri</h4>
            <p style={{ fontSize: "0.9rem" }}>Adonan mie telur segar diolah mandiri setiap pagi tanpa pengawet kimia.</p>
          </div>
          <div className="info-box-premium" style={{ background: "#ffffff", padding: "30px 20px" }}>
            <div className="info-icon-wrapper" style={{ background: "#ffeef0", color: "#c8102e" }}>📜</div>
            <h4 style={{ fontWeight: "700", marginTop: "10px" }}>Resep Warisan</h4>
            <p style={{ fontSize: "0.9rem" }}>Rasa racikan kuah kaldu ayam gurih otentik asli yang terjaga sejak tahun 2005.</p>
          </div>
          <div className="info-box-premium" style={{ background: "#ffffff", padding: "30px 20px" }}>
            <div className="info-icon-wrapper" style={{ background: "#ffeef0", color: "#c8102e" }}>🛡️</div>
            <h4 style={{ fontWeight: "700", marginTop: "10px" }}>Jaminan Higienis</h4>
            <p style={{ fontSize: "0.9rem" }}>Proses produksi bersih berstandar tinggi dan mengantongi izin resmi P-IRT.</p>
          </div>
        </div>

        {/* 5. SEKSI TESTIMONI (Tema Gelap Kontras Elegan) */}
        <div className="testimonials-section" style={{ margin: "40px 0 60px 0", borderRadius: "24px", padding: "50px 30px" }}>
          <div className="section-title">
            <h2>Apa Kata Pelanggan Setia?</h2>
            <p className="section-subtitle" style={{ color: "#cbd5e1", marginTop: "-15px", marginBottom: "35px" }}>
              Ulasan tulus dari penikmat mie ayam racikan Niki Eco 602.
            </p>
          </div>
          
          <div className="testimonials-grid" style={{ gap: "25px" }}>
            <div className="testimonial-card" style={{ background: "#262c36", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                <div className="avatar avatar-green">R</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem", color: "#ffffff" }}>Rian Pratama</h3>
                  <small style={{ color: "#a0aec0" }}>Pelanggan Tetap</small>
                </div>
              </div>
              <p className="comment" style={{ color: "#cbd5e1" }}>
                "Mienya beneran kenyal beda dari yang lain, kuah kaldunya gurih alami gak bikin serak di tenggorokan. Recommended banget yang komplit!"
              </p>
            </div>

            <div className="testimonial-card" style={{ background: "#262c36", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                <div className="avatar avatar-orange">A</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem", color: "#ffffff" }}>Amelia Putri</h3>
                  <small style={{ color: "#a0aec0" }}>Pesan Catering Pesta</small>
                </div>
              </div>
              <p className="comment" style={{ color: "#cbd5e1" }}>
                "Kemarin pesan 100 porsi buat acara arisan keluarga besar, semuanya puji mienya enak dan bersih. Pelayanan pengantarannya juga tepat waktu."
              </p>
            </div>
          </div>
        </div>

        {/* 6. LOKASI OPERASIONAL TERBARU + MAPS INTERAKTIF */}
        <div className="about-address-container" style={{ textAlign: "center", marginTop: "40px" }}>
          <div className="about-address" style={{ display: "inline-block", maxWidth: "650px", width: "100%", marginBottom: "30px", background: "#ffffff", padding: "25px", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
            <h4 style={{ color: "#c8102e", fontWeight: "800" }}>📍 Lokasi Tepat Warung</h4>
            <p style={{ fontWeight: "700", fontSize: "1.1rem", color: "#1a1a1a", margin: "5px 0" }}>
              Mie Ayam Pangsit NIKI ECO 602
            </p>
            <small style={{ color: "var(--text-gray)", display: "block", fontWeight: "600", lineHeight: "1.5" }}>
              Jl. Limbungan Simpang Tugu AMD, Lembah Sari, Rumbai Timur,<br />
              Kota Pekanbaru, Riau 28261, Indonesia.
            </small>
          </div>

          {/* GOOGLE MAPS EMBED YANG DI-UPDATE (Fokus ke Tugu AMD Rumbai) */}
          <div className="map-wrapper" style={{ border: "8px solid #ffffff", boxShadow: "var(--shadow-md)" }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6247963738096!2d101.4468641!3d0.551152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ac0337852fbf%3A0xe54cb831b5fc9ee8!2sJl.%20Limbungan%2C%20Lembah%20Sari%2C%20Kec.%20Rumbai%20Pesisir%2C%20Kota%20Pekanbaru%2C%20Riau!5e0!3m2!1sid!2sid!4v1719441111111!5m2!1sid!2sid"
              className="google-map-iframe"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Resmi Mie Ayam Pangsit Niki Eco 602 Pekanbaru"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}