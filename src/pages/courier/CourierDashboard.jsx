import React, { useState, useEffect } from 'react';
import { completeOrder } from '../../services/orderService';

const CourierDashboard = () => {
  const [myOrders, setMyOrders] = useState([]);

  // Fungsi konfirmasi pengantaran selesai
  const handleComplete = async (orderId) => {
    try {
      await completeOrder(orderId);
      alert('Pesanan selesai diantar!');
      // Filter list untuk menghilangkan pesanan yang sudah selesai dari layar kurir
      setMyOrders(myOrders.filter(order => order.Id_pesanan !== orderId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="courier-dashboard">
      <h2>Tugas Pengantaran Kamu</h2>
      {myOrders.length === 0 ? <p>Tidak ada pengantaran aktif.</p> : (
        myOrders.map(order => (
          <div key={order.Id_pesanan} className="delivery-card">
            <h3>{order.Nama_pelanggan}</h3>
            <p>Alamat: {order.Alamat_pengiriman}</p>
            <p>No HP: {order.No_hp}</p>
            <button onClick={() => handleComplete(order.Id_pesanan)}>
              Tandai Sudah Sampai
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CourierDashboard;