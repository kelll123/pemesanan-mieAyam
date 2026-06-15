import React from "react";

export default function Documentation({ setView }) {
  return (
    <section className="docs-section fade-in">
      <div className="docs-header">
        <span className="docs-badge">Sistem Produksi & Galeri</span>
        <h2>Dokumentasi Niki Eco 602</h2>
        <p className="docs-subtitle">Eksplorasi transparansi dapur produksi, sertifikasi standar higienis, dan galeri produk otentik kami.</p>
      </div>
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <h4>Dokumentasi</h4>
          <ul>
            <li className="active">🚀 Ringkasan Sistem</li>
            <li>Clarifikasi Alur CRUD</li>
          </ul>
        </aside>
        <main className="docs-content">
          <div className="docs-card animate-card">
            <h3>🛠️ Proses & Standar Produksi</h3>
            <p>Setiap mangkuk mi ayam yang disajikan diproduksi melalui alur kendali mutu yang ketat, mulai dari penggilingan tepung hingga penyajian akhir di meja pelanggan.</p>
          </div>
          <div className="view-more-container" style={{ marginTop: '20px' }}>
            <button className="view-more-btn" onClick={() => setView("home")}>
              ← Kembali ke Beranda Utama
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}