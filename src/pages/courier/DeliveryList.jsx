import React from "react";

export default function DeliveryList({ orders, currentUser, onCompleteDelivery, setView }) {
  // 1. Tentukan ID Kurir yang aktif (Gunakan fallback ID 1 untuk keperluan simulasi/testing jika user kosong)
  const myCourierId = currentUser ? currentUser.Id_login : 1;

  // 2. Filter pesanan aktif yang SEDANG DIKIRIM oleh kurir ini
  const activeDeliveries = orders.filter(
    (order) => order.Id_kurir === myCourierId && order.Status_pesanan === "DIKIRIM"
  );

  // 3. Filter riwayat pesanan yang SUDAH SELESAI diantar oleh kurir ini
  const completedDeliveries = orders.filter(
    (order) => order.Id_kurir === myCourierId && order.Status_pesanan === "SELESAI"
  );

  // 4. Hitung statistik ringkas untuk kurir
  const totalSelesaiHariIni = completedDeliveries.length; 
  const estimasiPendapatan = totalSelesaiHariIni * 5000; // Komisi Rp 5.000 per antaran

  return (
    <div style={{ backgroundColor: "#faf8f5", width: "100%", minHeight: "100vh", padding: "40px var(--padding-side) 60px" }}>
      
      {/* HEADER UTAMA */}
      <div className="courier-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2>Panel Pengantaran Kurir</h2>
          <p>Selamat bertugas, <strong>{currentUser?.Nama || "Budi Santoso (Kurir 1)"}</strong>! Tetap utamakan keselamatan di jalan.</p>
        </div>
        <button
          onClick={() => setView("home")}
          className="back-to-store-btn"
          style={{ backgroundColor: "#c8102e", border: "none", cursor: "pointer" }}
        >
          ← Keluar / Ke Toko
        </button>
      </div>

      {/* 🔔 BANNER NOTIFIKASI REAL-TIME TUGAS BARU (Hanya Muncul Jika Ada Order Masuk) */}
      {activeDeliveries.length > 0 ? (
        <div style={{ backgroundColor: "#fff5f5", borderLeft: "6px solid #c8102e", padding: "20px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(200, 16, 46, 0.08)" }} className="fade-in">
          <h3 style={{ margin: "0 0 6px 0", color: "#c8102e", display: "flex", alignItems: "center", gap: "8px", fontWeight: "800" }}>
            🚨 Perintah Tugas Pengantaran Baru!
          </h3>
          <p style={{ margin: 0, color: "#4a5568", fontSize: "0.95rem", lineHeight: "1.5" }}>
            Admin Baru saja mendelegasikan <strong>{activeDeliveries.length} Pesanan</strong> untuk kamu antar. Silakan periksa detail alamat dan selesaikan pengiriman di bawah ini.
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: "#f0fdf4", borderLeft: "6px solid #25d366", padding: "16px 20px", borderRadius: "12px", marginBottom: "30px" }} className="fade-in">
          <p style={{ margin: 0, color: "#166534", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
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
            <h3 style={{ color: "#2e7d32" }}>● On Duty</h3>
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
              <h4 style={{ fontWeight: "700", color: "#1a1a1a", margin: "0 0 5px 0" }}>Semua Mie Ayam Sudah Diantar!</h4>
              <p style={{ fontSize: "0.9rem", color: "#a0aec0" }}>Belum ada penugasan pengantaran baru dari Admin Niki Eco 602.</p>
            </div>
          ) : (
            activeDeliveries.map((order) => (
              <div 
                key={order.Id_pesanan} 
                style={{ 
                  padding: "25px", 
                  borderRadius: "12px", 
                  border: "1px solid #fca5a5",
                  borderLeft: "6px solid #3182ce", 
                  background: "#fff9f9", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontWeight: "800", fontSize: "1.1rem" }}>Order #{order.Id_pesanan}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#4a5568", marginBottom: "15px", lineHeight: "1.6" }}>
                    <div>👤 <strong>Pelanggan:</strong> {order.Nama_pelanggan}</div>
                    <div>📍 <strong>Alamat:</strong> {order.Alamat_pengiriman}</div>
                    <div>📞 <strong>No. HP:</strong> {order.No_hp}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#c8102e", marginTop: "5px" }}>
                      💰 Total Tagihan: Rp {(order.Total_harga || 0).toLocaleString("id-ID")}
                    </div>
                  </div>
                  <div className="status-container">
                    <span className="badge-status dikirim" style={{ background: "#3182ce", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "700" }}>
                      🛵 SEDANG DIKIRIM
                    </span>
                  </div>
                </div>
                
                <div className="delivery-actions" style={{ minWidth: "200px", flexShrink: 0 }}>
                  <button 
                    className="add-to-cart" 
                    style={{ 
                      width: "100%",
                      margin: 0, padding: "14px 25px", fontSize: "0.95rem", fontWeight: "700",
                      borderRadius: "12px", boxShadow: "0 4px 12px rgba(37, 211, 102, 0.15)",
                      backgroundColor: "#25d366", color: "#fff", border: "none", cursor: "pointer"
                    }} 
                    onClick={() => onCompleteDelivery(order.Id_pesanan)}
                  >
                    Selesai / Sampai Tujuan ✔
                  </button>
                </div>
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