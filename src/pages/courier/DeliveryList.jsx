import React, { useState } from "react";

export default function DeliveryList() {
  // Simulasi data pesanan kurir sesuai pemetaan laporan (UC-03)
  const [orders, setOrders] = useState([
    {
      id: "#101",
      customer: "Nasywa Mutiara",
      address: "Kosan Area Politeknik Caltex Riau",
      items: "Mie Ayam Pangsit (x2)",
      status: "SIAP_ANTAR"
    },
    {
      id: "#102",
      customer: "Rackel Gilang",
      address: "Jl. Rumbai Pesisir No. 12",
      items: "Mie Ayam Bakso (x1), Es Teh (x1)",
      status: "DIKIRIM"
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="courier-page-container">
      <div className="courier-header">
        <h2>Halaman Tugas Pengantaran (Kurir)</h2>
        <p>Sesuai dengan pemetaan Use Case UC-03 & Kebutuhan Fungsional Sistem.</p>
      </div>

      <div className="delivery-list-wrapper">
        {orders.map((order) => (
          <div key={order.id} className="delivery-card">
            <div className="delivery-info">
              <h3>ID Pesanan: {order.id}</h3>
              <p><strong>Pelanggan:</strong> {order.customer}</p>
              <p><strong>Alamat:</strong> {order.address}</p>
              <p><strong>Item:</strong> {order.items}</p>
              <p className="status-container">
                <strong>Status Pengiriman:</strong>{" "}
                <span className={`badge-status ${order.status.toLowerCase()}`}>
                  {order.status === "SIAP_ANTAR" ? "📦 SIAP ANTAR" : order.status === "DIKIRIM" ? "🛵 DIKIRIM" : "✅ SELESAI"}
                </span>
              </p>
            </div>

            {/* SISI TOMBOL AKSI YANG SUDAH DIRAPIKAN */}
            <div className="delivery-actions">
              <button 
                className="btn-action btn-diantar"
                onClick={() => updateStatus(order.id, "DIKIRIM")}
                disabled={order.status !== "SIAP_ANTAR"}
              >
                Set Diantar
              </button>
              <button 
                className="btn-action btn-selesai"
                onClick={() => updateStatus(order.id, "SELESAI")}
                disabled={order.status !== "DIKIRIM"}
              >
                Set Selesai
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}