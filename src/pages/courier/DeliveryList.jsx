import React from "react";

export default function DeliveryList({ orders, currentUser, onCompleteDelivery, setView }) {
  
  // 1. Ambil ID & Nama secara dinamis dari user yang sedang login saat ini
  const myCourierId = currentUser ? parseInt(currentUser.Id_login) : 1;
  const myName = currentUser ? currentUser.Nama : "Budi Santoso";

  // 2. Filter pesanan aktif yang ditugaskan khusus untuk ID kurir ini
  const activeDeliveries = orders.filter(
    (order) => parseInt(order.Id_kurir) === myCourierId && order.Status_pesanan === "DIKIRIM"
  );

  // 3. Filter riwayat pesanan selesai untuk kurir ini
  const completedDeliveries = orders.filter(
    (order) => parseInt(order.Id_kurir) === myCourierId && order.Status_pesanan === "SELESAI"
  );

  const totalSelesaiHariIni = completedDeliveries.length; 
  const estimasiPendapatan = totalSelesaiHariIni * 5000; 

  return (
    <div style={{ backgroundColor: "#faf8f5", width: "100%", minHeight: "100vh", padding: "40px var(--padding-side) 60px" }}>
      
      {/* HEADER UTAMA */}
      <div className="courier-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2>Panel Pengantaran Kurir</h2>
          <p>Selamat bertugas, <span style={{ color: "#c8102e", fontWeight: "700" }}>{myName}</span>! (ID: K0{myCourierId})</p>
        </div>
        <button
          onClick={() => setView("home")}
          className="back-to-store-btn"
          style={{ backgroundColor: "#c8102e", border: "none", cursor: "pointer" }}
        >
          ← Keluar / Ke Toko
        </button>
      </div>

      {/* 🔔 BANNER NOTIFIKASI REAL-TIME */}
      {activeDeliveries.length > 0 ? (
        <div style={{ backgroundColor: "#fff5f5", borderLeft: "6px solid #c8102e", padding: "20px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(200, 16, 46, 0.08)" }} className="fade-in">
          <h3 style={{ margin: "0 0 6px 0", color: "#c8102e", display: "flex", alignItems: "center", gap: "8px", fontWeight: "800" }}>
            🚨 Perintah Tugas Pengantaran Baru!
          </h3>
          <p style={{ margin: 0, color: "#4a5568", fontSize: "0.95rem", lineHeight: "1.5" }}>
            Halo {myName}, Admin baru saja menyerahkan <strong>{activeDeliveries.length} Pesanan</strong> untuk kamu antar ke pelanggan.
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: "#f0fdf4", borderLeft: "6px solid #25d366", padding: "16px 20px", borderRadius: "12px", marginBottom: "30px" }} className="fade-in">
          <p style={{ margin: 0, color: "#166534", fontWeight: "700" }}>
            ✅ Status Kerja: Standby / Siap Sedia Menunggu Orderan Masuk.
          </p>
        </div>
      )}

      {/* SEKSI 1: STATISTIK RINGKAS KURIR */}
      <div className="admin-dashboard-grid" style={{ marginBottom: "40px", gap: "20px" }}>
        <div className="stat-card" style={{ background: "#ffffff", padding: "20px" }}>
          <div className="stat-icon">🛵</div>
          <div className="stat-info">
            <h4>Tugas Aktif</h4>
            <h3 style={{ color: activeDeliveries.length > 0 ? "#c8102e" : "#1a1a1a" }}>{activeDeliveries.length} Pengantaran</h3>
          </div>
        </div>
        <div className="stat-card" style={{ background: "#ffffff", padding: "20px" }}>
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Total Selesai</h4>
            <h3>{totalSelesaiHariIni} Pesanan</h3>
          </div>
        </div>
        <div className="stat-card" style={{ background: "#ffffff", padding: "20px" }}>
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h4>Komisi Hari Ini</h4>
            <h3 style={{ color: "#25d366" }}>Rp {estimasiPendapatan.toLocaleString("id-ID")}</h3>
          </div>
        </div>
        <div className="stat-card" style={{ background: "#ffffff", padding: "20px" }}>
          <div className="stat-icon">🟢</div>
          <div className="stat-info">
            <h4>Status Kerja</h4>
            <h3>● On Duty</h3>
          </div>
        </div>
      </div>

      {/* SEKSI 2: DAFTAR PENGANTARAN AKTIF */}
      <div className="admin-card-section" style={{ marginBottom: "40px", background: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
        <h3 style={{ borderBottom: "2px solid #edf2f7", paddingBottom: "12px", marginBottom: "20px", fontWeight: "800" }}>
          🛵 Antrean Tugas Aktif (Wajib Diantar)
        </h3>

        <div className="delivery-list-wrapper" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {activeDeliveries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 20px", color: "#718096" }}>
              <span style={{ fontSize: "50px", display: "block", marginBottom: "15px" }}>💤</span>
              <h4 style={{ fontWeight: "700", color: "#1a1a1a", margin: "0 0 5px 0" }}>Belum Ada Tugas</h4>
              <p style={{ fontSize: "0.9rem", color: "#a0aec0" }}>Silakan bersantai dulu, belum ada penugasan dari Admin Niki Eco 602.</p>
            </div>
          ) : (
            activeDeliveries.map((order) => (
              <div 
                key={order.Id_pesanan} 
                style={{ 
                  padding: "25px", borderRadius: "12px", border: "1px solid #fca5a5",
                  borderLeft: "6px solid #3182ce", background: "#fff9f9", 
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  flexWrap: "wrap", gap: "20px"
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "1.3rem", fontWeight: "800", color: "#1a1a1a" }}>
                    ID Pesanan: #{order.Id_pesanan}
                  </h3>
                  <div style={{ lineHeight: "1.7", color: "#4a5568", fontSize: "0.95rem" }}>
                    <div>👤 <strong>Pelanggan:</strong> {order.Nama_pelanggan}</div>
                    <div>📍 <strong>Alamat Kirim:</strong> {order.Alamat_pengiriman}</div>
                    <div>📞 <strong>No. HP:</strong> {order.No_hp}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#c8102e", marginTop: "5px" }}>
                      💰 Total Tagihan: Rp {(order.Total_harga || 0).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
                
                <button 
                  className="add-to-cart" 
                  style={{ 
                    margin: 0, padding: "14px 25px", fontSize: "0.95rem", fontWeight: "700",
                    borderRadius: "12px", backgroundColor: "#25d366", color: "#fff", border: "none", cursor: "pointer"
                  }} 
                  onClick={() => onCompleteDelivery(order.Id_pesanan)}
                >
                  Selesai / Sampai Tujuan ✔
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SEKSI 3: RIWAYAT PENGANTARAN SELESAI */}
      <div className="admin-card-section" style={{ background: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "var(--shadow-sm)" }}>
        <h3 style={{ color: "#4a5568", marginBottom: "20px", fontWeight: "800" }}>
          📋 Riwayat Pengantaran Hari Ini
        </h3>
        <table className="admin-table-custom">
          <thead>
            <tr>
              <th>ID Pesanan</th>
              <th>Pelanggan</th>
              <th>Alamat Tujuan</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {completedDeliveries.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#a0aec0", padding: "20px", fontStyle: "italic" }}>
                  Belum ada riwayat pengantaran yang diselesaikan hari ini.
                </td>
              </tr>
            ) : (
              completedDeliveries.map((order) => (
                <tr key={order.Id_pesanan}>
                  <td><strong>#{order.Id_pesanan}</strong></td>
                  <td>{order.Nama_pelanggan}</td>
                  <td>{order.Alamat_pengiriman}</td>
                  <td style={{ textAlign: "center" }}>
                    <span className="admin-courier-status st-selesai" style={{ background: "#e6fffa", color: "#234e52", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "700" }}>
                      ✅ SELESAI
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}