import React from "react";

export default function About() {
  return (
    <section className="about-section fade-in">
      <div className="about-header">
        <h2>Tentang NIKI ECO 602</h2>
        <p className="about-subtitle">Cita Rasa Otentik, Higienis, & Tanpa Bahan Pengawet</p>
      </div>
      <div className="about-container">
        <div className="about-box">
          <h3>Profil Warung Kami</h3>
          <p>
            <strong>NIKI ECO 602</strong> adalah penyedia kuliner khas yang memproduksi bahan baku utamanya secara mandiri. Kami berkomitmen menyajikan kelezatan sehat, di mana produk <strong>Mie Segar</strong> diolah sendiri menggunakan resep rahasia keluarga tanpa tambahan zat pewarna sintetik maupun pengawet buatan.
          </p>
        </div>
        <div className="about-box highlighted">
          <h3>Menerima Pesanan Acara (Catering)</h3>
          <ul className="about-list">
            <li>🎉 Acara Pesta & Ulang Tahun</li>
            <li>🤝 Kegiatan Arisan Keluarga</li>
            <li>💼 Rapat Kantor & Gathering Instansi</li>
          </ul>
        </div>
      </div>
      <div className="about-address">
        <h4>📍 Lokasi Operasional</h4>
        <p>Jl. Limbungan – Simpang Tugu AMD, Rumbai Pesisir, Pekanbaru, Riau.</p>
      </div>
    </section>
  );
}