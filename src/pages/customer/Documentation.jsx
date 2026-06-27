import React, { useState } from "react";

export default function Documentation({ setView }) {
  // State untuk melacak menu/tab aktif di sidebar
  const [activeTab, setActiveTab] = useState("ringkasan");

  return (
    <div style={{ backgroundColor: "#faf8f5", width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      
      {/* ELEMEN DEKORASI LATAR BELAKANG */}
      <div className="bg-decorations" style={{ pointerEvents: "none" }}>
        <span className="decor-item d1" style={{ top: "8%", left: "4%" }}>📄</span>
        <span className="decor-item d2" style={{ top: "12%", right: "5%" }}>⚙️</span>
        <span className="decor-item d3" style={{ bottom: "25%", left: "3%" }}>💻</span>
        <span className="decor-item d4" style={{ bottom: "12%", right: "4%" }}>🗄️</span>
        <span className="decor-item d5" style={{ top: "40%", right: "2%" }}>🔥</span>
        <span className="decor-item d6" style={{ bottom: "50%", left: "2%" }}>🍜</span>
      </div>

      <section className="docs-section fade-in" style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        
        {/* 1. HEADER DOKUMENTASI */}
        <div className="docs-header" style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="docs-badge" style={{ background: "#ffeef0", color: "#c8102e", padding: "6px 16px", borderRadius: "20px", fontWeight: "700", fontSize: "0.85rem" }}>
            Overview & Business Log Specs
          </span>
          <h2 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#1a1a1a", marginTop: "10px", letterSpacing: "-1px" }}>
            Dokumentasi Niki Eco 602
          </h2>
          <p className="docs-subtitle" style={{ color: "var(--text-gray)", fontSize: "1.05rem", maxWidth: "700px", margin: "10px auto 0" }}>
            Informasi lengkap mengenai alur kerja operational sistem, pemantauan status penugasan, dan transparansi manipulasi data menu toko.
          </p>
        </div>

        {/* 2. LIVE OPERATIONAL METRICS (Tema Bisnis Warung, Bukan Kinerja Web) */}
        <div className="admin-dashboard-grid" style={{ marginBottom: "40px", gap: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div className="stat-card" style={{ padding: "20px", background: "#ffffff", borderLeft: "4px solid #c8102e", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#c8102e", fontWeight: "800", margin: 0 }}>Mie Komplit</h3>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-gray)", textTransform: "uppercase", marginTop: "5px" }}>Menu Terlaris Hari Ini</h4>
          </div>
          <div className="stat-card" style={{ padding: "20px", background: "#ffffff", borderLeft: "4px solid #25d366", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#25d366", fontWeight: "800", margin: 0 }}>3 Kurir</h3>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-gray)", textTransform: "uppercase", marginTop: "5px" }}>Status Siap Siaga (On-Duty)</h4>
          </div>
          <div className="stat-card" style={{ padding: "20px", background: "#ffffff", borderLeft: "4px solid #3b82f6", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#3b82f6", fontWeight: "800", margin: 0 }}>12 Antrean</h3>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-gray)", textTransform: "uppercase", marginTop: "5px" }}>Pesanan Sedang Diproses</h4>
          </div>
          <div className="stat-card" style={{ padding: "20px", background: "#ffffff", borderLeft: "4px solid #eab308", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#eab308", fontWeight: "800", margin: 0 }}>100% Halal</h3>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-gray)", textTransform: "uppercase", marginTop: "5px" }}>Jaminan Mutu Higienis</h4>
          </div>
        </div>
        
        {/* 3. LAYOUT UTAMA (SIDEBAR + DATA CONTENT) */}
        <div className="docs-layout" style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
          
          {/* SISI KIRI: ASIDE SIDEBAR */}
          <aside className="docs-sidebar" style={{ width: "280px", background: "#ffffff", padding: "20px", borderRadius: "16px", boxShadow: "var(--shadow-sm)", flexShrink: 0 }}>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "#a0aec0", marginBottom: "15px", paddingLeft: "10px" }}>
              Daftar Materi
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              <li 
                className={activeTab === "ringkasan" ? "active" : ""} 
                onClick={() => setActiveTab("ringkasan")}
                style={{ 
                  cursor: "pointer", 
                  padding: "12px 16px", 
                  borderRadius: "10px", 
                  fontWeight: "600",
                  backgroundColor: activeTab === "ringkasan" ? "#ffeef0" : "transparent",
                  color: activeTab === "ringkasan" ? "#c8102e" : "#4a5568",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                🚀 <span>Ringkasan Sistem</span>
              </li>
              <li 
                className={activeTab === "crud" ? "active" : ""} 
                onClick={() => setActiveTab("crud")}
                style={{ 
                  cursor: "pointer", 
                  padding: "12px 16px", 
                  borderRadius: "10px", 
                  fontWeight: "600",
                  backgroundColor: activeTab === "crud" ? "#ffeef0" : "transparent",
                  color: activeTab === "crud" ? "#c8102e" : "#4a5568",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                🛠️ <span>Clarifikasi Alur CRUD</span>
              </li>
            </ul>
          </aside>
          
          {/* SISI KANAN: ISI KONTEN DINAMIS */}
          <main className="docs-content" style={{ flex: 1 }}>
            {activeTab === "ringkasan" ? (
              /* PANEL ISI TAB 1: RINGKASAN SISTEM */
              <div className="docs-card animate-card" style={{ background: "#ffffff", padding: "35px", borderRadius: "20px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontSize: "1.4rem", fontWeight: "800" }}>
                  🚀 Manajemen Alur Kerja & Distribusi Kuliner
                </h3>
                <p style={{ lineHeight: "1.8", color: "#2d3748", fontSize: "0.98rem" }}>
                  Sistem manajemen **NIKI ECO 602** mengintegrasikan seluruh lini operational warung secara digital. Mulai dari pengelolaan menu makanan utama, kalkulasi keranjang belanja konsumen otomatis, hingga koordinasi kurir internal demi mengantarkan hidangan mie segar tepat waktu.
                </p>
                
                {/* INTERAKTIF LIST STEPS */}
                <div style={{ marginTop: "30px", background: "#f8fafc", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #c8102e" }}>
                  <h4 style={{ fontWeight: "800", marginBottom: "15px", color: "#1a1a1a", fontSize: "1rem" }}>3 Pilar Utama Operasional Toko:</h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <span style={{ background: "#c8102e", color: "#fff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "bold", flexShrink: 0, marginTop: "2px" }}>1</span>
                      <div>
                        <strong style={{ color: "#1a1a1a", display: "block" }}>Pengendalian Stok & Inventaris Menu</strong>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-gray)" }}>Dashboard administrator memegang kuasa penuh untuk menambah varian mie, mengubah harga pasar, atau menghapus menu yang habis secara real-time.</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <span style={{ background: "#c8102e", color: "#fff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "bold", flexShrink: 0, marginTop: "2px" }}>2</span>
                      <div>
                        <strong style={{ color: "#1a1a1a", display: "block" }}>Akurasi Kalkulasi Kasir Belanja</strong>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-gray)" }}>Setiap pesanan dihitung instan oleh sistem guna mencegah kesalahan hitung manual, memberikan transparansi nota belanja kepada pelanggan.</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <span style={{ background: "#c8102e", color: "#fff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "bold", flexShrink: 0, marginTop: "2px" }}>3</span>
                      <div>
                        <strong style={{ color: "#1a1a1a", display: "block" }}>Manajemen Hantaran Kurir Internal</strong>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-gray)" }}>Memantau penugasan kurir secara langsung (*Sedang Mengantar, Selesai, Standby*) untuk memastikan efisiensi pelayanan catering maupun pesanan perorangan.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* PANEL ISI TAB 2: ALUR CRUD SINKRONISASI DATABASE */
              <div className="docs-card animate-card" style={{ background: "#ffffff", padding: "35px", borderRadius: "20px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontSize: "1.4rem", fontWeight: "800" }}>
                  🗄️ Sinkronisasi Data & Enkapsulasi CRUD Menu
                </h3>
                <p style={{ lineHeight: "1.8", color: "#2d3748", fontSize: "0.98rem" }}>
                  Untuk mencegah hilangnya data daftar harga makanan saat warung beroperasi, aplikasi dirancang menggunakan pendekatan **Dual-Layer Storage Protection** terpusat:
                </p>

                {/* VISUAL LAYOUT GRID SINKRONISASI */}
                <div className="info-card-grid" style={{ marginTop: "25px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "12px", border: "1px solid #bbf7d0", borderTop: "5px solid #166534" }}>
                    <h4 style={{ color: "#166534", fontWeight: "800", marginBottom: "8px", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      🟢 Jalur Utama: Server Basis Data (MySQL)
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#14532d", lineHeight: "1.6", margin: 0 }}>
                      Saat menekan tombol **"Simpan Menu"**, modul `menuService.jsx` menembakkan data kuliner menuju server pusat database relasional MySQL agar tersimpan abadi dan tersinkronisasi di semua perangkat kasir.
                    </p>
                  </div>
                  
                  <div style={{ background: "#fffbeb", padding: "20px", borderRadius: "12px", border: "1px solid #fef3c7", borderTop: "5px solid #92400e" }}>
                    <h4 style={{ color: "#92400e", fontWeight: "800", marginBottom: "8px", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      🟡 Jalur Cadangan: Failover Lokal (JSON & Web Storage)
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#78350f", lineHeight: "1.6", margin: 0 }}>
                      Jika jaringan internet terputus di warung, aplikasi beralih otomatis menggunakan asset lokal cadangan (`menu.json`) dan `localStorage` browser sehingga proses jualan kasir tidak terganggu dan data tidak hilang saat refresh.
                    </p>
                  </div>
                </div>

                {/* HISTORI DATA LOG MOCKUP WARUNG (Bikin Tampilan Ramai & Informatif) */}
                <div style={{ background: "#1e1e24", borderRadius: "10px", padding: "15px 20px", fontFamily: "monospace", color: "#a3e635", fontSize: "0.85rem", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)" }}>
                  <div style={{ color: "#6b7280", marginBottom: "5px", borderBottom: "1px solid #374151", paddingBottom: "5px", fontWeight: "bold" }}>📦 Riwayat Mutasi Data Terakhir (Admin Log)</div>
                  <div>[10:15:22] - <span style={{ color: "#60a5fa" }}>[READ]</span> Memuat 12 item kuliner dari server Niki Eco.</div>
                  <div>[10:17:45] - <span style={{ color: "#34d399" }}>[CREATE]</span> Berhasil menambah menu "Mie Ayam Bakso Premium".</div>
                  <div>[10:19:02] - <span style={{ color: "#fca5a5" }}>[DELETE]</span> Menghapus item Id #04 (Stok Habis).</div>
                </div>
              </div>
            )}

            {/* TOMBOL KEMBALI */}
            <div className="view-more-container" style={{ marginTop: '30px', textAlign: "left" }}>
              <button 
                className="view-more-btn" 
                onClick={() => setView("home")}
                style={{
                  background: "linear-gradient(135deg, #c8102e 0%, #a00d25 100%)",
                  color: "#ffffff",
                  border: "none",
                  padding: "14px 35px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(200, 16, 45, 0.25)",
                  transition: "all 0.2s ease"
                }}
              >
                ← Kembali ke Beranda Utama
              </button>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}