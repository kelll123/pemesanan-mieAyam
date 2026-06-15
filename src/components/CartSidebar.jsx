import React, { useState } from "react";

export default function CartSidebar({ cart, updateCartQty }) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const kirimWA = (e) => {
    e.preventDefault();
    if (!customerName) return alert("Silakan masukkan nama pemesan terlebih dahulu!");

    const totalHarga = cart.reduce((total, item) => total + item.price * item.qty, 0);
    const rincian = cart.map((i) => `- ${i.name} (x${i.qty})`).join("%0A");

    const pesan = `Halo Mie Ayam Niki Eco!%0A%0A*Data Pemesan:*%0A- Nama: ${customerName}%0A- Lokasi/Meja: ${tableNumber || "-"}%0A%0A*Daftar Pesanan:*%0A${rincian}%0A%0A*Total Pembayaran: Rp ${totalHarga.toLocaleString("id-ID")}*`;

    window.open(`https://wa.me/62881080579585?text=${pesan}`, "_blank");
  };

  return (
    <div className="cart-sidebar">
      <h3>🛒 Keranjang Belanja</h3>
      <div className="cart-items-container">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-detail">
              <h4>{item.name}</h4>
              <p>Rp {(item.price * item.qty).toLocaleString("id-ID")}</p>
            </div>
            <div className="cart-qty-control">
              <button onClick={() => updateCartQty(item.id, -1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateCartQty(item.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={kirimWA} className="form-checkout">
        <input type="text" placeholder="Nama Pemesan (Wajib)" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        <input type="text" placeholder="Nomor Meja / Catatan Lokasi" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
        <div className="total-box">
          <span>Total Bayar:</span>
          <strong>Rp {cart.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString("id-ID")}</strong>
        </div>
        <button type="submit" className="checkout-btn">Pesan via WhatsApp</button>
      </form>
    </div>
  );
}