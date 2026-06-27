import React, { useState } from 'react';

const OrderManagement = ({ orders, onAssignCourier, setView }) => {
  const [selectedCourier, setSelectedCourier] = useState({});

  // Dummy list kurir berdasarkan database mieayam_nikieco.sql
  const couriers = [
    { Id_login: 2, Nama: "Kurir Pengantaran 1" }
  ];

  const handleSelectChange = (orderId, courierId) => {
    setSelectedCourier({
      ...selectedCourier,
      [orderId]: courierId
    });
  };

  return (
    <div className="courier-page-container">
      <div className="courier-header">
        <h2>Halaman Manajemen Pesanan (Admin)</h2>
        <p>Gunakan halaman ini untuk menugaskan kurir ke pesanan masuk.</p>
        <button onClick={() => setView("home")} className="back-to-store-link" style={{ marginBottom: '15px' }}>
          ← Kembali ke Beranda
        </button>
      </div>

      <div className="delivery-list-wrapper">
        {orders.filter(o => o.Status_pesanan === "DIPROSES" || o.Status_pesanan === "PENDING").length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Tidak ada pesanan baru yang perlu diproses.</p>
        ) : (
          orders
            .filter(order => order.Status_pesanan === "DIPROSES" || order.Status_pesanan === "PENDING")
            .map((order) => (
              <div key={order.Id_pesanan} className="delivery-card">
                <div className="delivery-info">
                  <h3>ID Pesanan: #{order.Id_pesanan}</h3>
                  <p><strong>Pelanggan:</strong> {order.Nama_pelanggan}</p>
                  <p><strong>Alamat:</strong> {order.Alamat_pengiriman}</p>
                  <p><strong>No HP:</strong> {order.No_hp}</p>
                  <p><strong>Total:</strong> Rp {order.Total_harga.toLocaleString('id-ID')}</p>
                  <p className="status-container">
                    <strong>Status:</strong> <span className="badge-status diproses">📦 {order.Status_pesanan}</span>
                  </p>
                </div>

                <div className="delivery-actions" style={{ flexDirection: 'column', gap: '10px' }}>
                  <select 
                    className="input-wrapper"
                    style={{ padding: '8px', borderRadius: '6px', width: '100%' }}
                    value={selectedCourier[order.Id_pesanan] || ""}
                    onChange={(e) => handleSelectChange(order.Id_pesanan, e.target.value)}
                  >
                    <option value="">-- Pilih Kurir --</option>
                    {couriers.map(courier => (
                      <option key={courier.Id_login} value={courier.Id_login}>
                        {courier.Nama}
                      </option>
                    ))}
                  </select>
                  
                  <button 
                    className="btn-action btn-diantar"
                    style={{ width: '100%' }}
                    onClick={() => onAssignCourier(order.Id_pesanan, selectedCourier[order.Id_pesanan])}
                    disabled={!selectedCourier[order.Id_pesanan]}
                  >
                    Tugaskan Kurir
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;