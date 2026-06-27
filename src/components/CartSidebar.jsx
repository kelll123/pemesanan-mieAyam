import React, { useState } from "react";

// Tambahkan prop 'onCheckoutSubmit' untuk menghubungkan data dengan state orders global di App.jsx
export default function CartSidebar({ cart, updateCartQty, onCheckoutSubmit }) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  
  // --- STATE BARU: METODE PENGIRIMAN ---
  const [shippingMethod, setShippingMethod] = useState("DIANTAR"); // Pilihan: "DIANTAR" atau "DIAMBIL"

  const kirimWA = (e) => {
    e.preventDefault();
    if (!customerName) return alert("Silakan masukkan nama pemesan terlebih dahulu!");
    if (shippingMethod === "DIANTAR" && !tableNumber) {
      return alert("Silakan masukkan alamat pengiriman terlebih dahulu!");
    }

    const totalHarga = cart.reduce((total, item) => total + item.price * item.qty, 0);
    const rincian = cart.map((i) => `- ${i.name} (x${i.qty})`).join("%0A");

    // --- LOGIKA PENGIRIMAN DATA KE ADMIN (JIKA PILIH DIANTAR) ---
    if (shippingMethod === "DIANTAR" && typeof onCheckoutSubmit === "function") {
      const orderData = {
        Nama_pelanggan: customerName,
        Alamat_pengiriman: tableNumber, // Isi input tableNumber difungsikan sebagai Alamat
        Total_harga: totalHarga
      };
      onCheckoutSubmit(orderData);
    }

    // Format pesan WhatsApp yang dinamis sesuai metode pilihan
    const metodeTeks = shippingMethod === "DIANTAR" ? "*Diantar Kurir*" : "*Diambil Sendiri ke Toko*";
    const lokasiLabel = shippingMethod === "DIANTAR" ? "Alamat Pengiriman" : "Nomor Meja / Catatan";

    const pesan = `Halo Mie Ayam Niki Eco!%0A%0A` +
      `*Data Pemesan:*%0A` +
      `- Nama: ${customerName}%0A` +
      `- Metode: ${metodeTeks}%0A` +
      `- ${lokasiLabel}: ${tableNumber || "-"}%0A%0A` +
      `*Daftar Pesanan:*%0A${rincian}%0A%0A` +
      `*Total Pembayaran: Rp ${totalHarga.toLocaleString("id-ID")}*`;

    window.open(`https://wa.me/62881080579585?text=${pesan}`, "_blank");
  };

  return (
    <div className="cart-sidebar">
      <h3>🛒 Keranjang Belanja</h3>
      
      {/* ITEMS CONTAINER */}
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

      {/* --- SEKSI BARU: TOMBOL TOGGLE PILIHAN METODE --- */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", background: "#f1f1f5", padding: "4px", borderRadius: "8px" }}>
        <button
          type="button"
          onClick={() => setShippingMethod("DIANTAR")}
          style={{
            flex: 1, padding: "10px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "0.85rem",
            backgroundColor: shippingMethod === "DIANTAR" ? "#c8102e" : "transparent",
            color: shippingMethod === "DIANTAR" ? "#ffffff" : "#4a5568",
            transition: "all 0.2s ease"
          }}
        >
          🛵 Diantar Kurir
        </button>
        <button
          type="button"
          onClick={() => setShippingMethod("DIAMBIL")}
          style={{
            flex: 1, padding: "10px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "0.85rem",
            backgroundColor: shippingMethod === "DIAMBIL" ? "#4a5568" : "transparent",
            color: shippingMethod === "DIAMBIL" ? "#ffffff" : "#4a5568",
            transition: "all 0.2s ease"
          }}
        >
          🏪 Diambil Sendiri
        </button>
      </div>

      {/* FORM CHECKOUT */}
      <form onSubmit={kirimWA} className="form-checkout">
        <input 
          type="text" 
          placeholder="Nama Pemesan (Wajib)" 
          value={customerName} 
          onChange={(e) => setCustomerName(e.target.value)} 
          required 
        />
        
        {/* Placeholder berubah dinamis mendeteksi tombol toggle di atas */}
        <input 
          type="text" 
          placeholder={shippingMethod === "DIANTAR" ? "Masukkan Alamat Lengkap Rumah Anda (Wajib)" : "Nomor Meja / Catatan Lokasi (Opsional)"} 
          value={tableNumber} 
          onChange={(e) => setTableNumber(e.target.value)} 
          required={shippingMethod === "DIANTAR"}
        />
        
        <div className="total-box">
          <span>Total Bayar:</span>
          <strong>Rp {cart.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString("id-ID")}</strong>
        </div>
        
        <button 
          type="submit" 
          className="checkout-btn"
          style={{ backgroundColor: shippingMethod === "DIANTAR" ? "#25d366" : "#4a5568" }}
        >
          {shippingMethod === "DIANTAR" ? "🚀 Kirim & Pesan via WhatsApp" : "💬 Pesan via WhatsApp"}
        </button>
      </form>
    </div>
  );
}