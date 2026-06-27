import React, { useState, useEffect } from "react";
import "./App.css";

// Import Komponen Modular
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import MenuList from "./pages/customer/MenuList";
import About from "./pages/customer/About";
import Documentation from "./pages/customer/Documentation";
import Login from "./pages/auth/Login";
import Gallery from "./pages/customer/Gallery"; // Import komponen Galeri baru

// Import Komponen Admin & Kurir
import MenuManagement from "./pages/admin/MenuManagement";
import DeliveryList from "./pages/courier/DeliveryList";

// Import data json lokal sebagai data awal default aplikasi jika storage kosong
import menuData from "./assets/menu.json";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);

  // --- STATE MENU GLOBAL DENGAN LOCALSTORAGE (ANTI-REFRESH HILANG) ---
  const [globalMenu, setGlobalMenu] = useState(() => {
    const savedMenu = localStorage.getItem("niki_eco_menu");
    if (savedMenu) {
      return JSON.parse(savedMenu); // Gunakan data dari storage jika ada
    }
    return menuData.food_items || []; // Cadangan awal jika storage kosong
  });

  // Otomatis simpan ke localStorage setiap kali ada perubahan pada data menu
  useEffect(() => {
    localStorage.setItem("niki_eco_menu", JSON.stringify(globalMenu));
  }, [globalMenu]);

  // --- STATE ORDERS ---
  const [orders, setOrders] = useState([
    {
      Id_pesanan: 1,
      Nama_pelanggan: "Budi Santoso",
      Alamat_pengiriman: "Jl. Merdeka No. 12, Padang",
      No_hp: "082171835646",
      Total_harga: 48000.00,
      Status_pesanan: "DIPROSES",
      Id_kurir: null
    }
  ]);

  // --- FUNGSI BARU: MENANGKAP CHECKOUT PESANAN BARU DARI PELANGGAN ---
  const handleCustomerCheckoutSubmit = (newOrderData) => {
    const orderIdBaru = orders.length + 1;
    const formatOrder = {
      Id_pesanan: orderIdBaru,
      Nama_pelanggan: newOrderData.Nama_pelanggan,
      Alamat_pengiriman: newOrderData.Alamat_pengiriman,
      No_hp: "082171835646", // Placeholder nomor HP simulasi pelanggan
      Total_harga: newOrderData.Total_harga,
      Status_pesanan: "DIPROSES", // Masuk dengan status DIPROSES agar langsung tampil di antrean tugas Admin
      Id_kurir: null
    };

    // Push pesanan baru ke urutan paling atas di state orders
    setOrders([formatOrder, ...orders]);
    setCart([]); // Reset isi keranjang belanja setelah sukses checkout
  };

  // Fungsi pengubah state pesanan saat Admin menugaskan kurir tertentu
  const handleAssignCourier = (orderId, courierId) => {
    setOrders(orders.map(order =>
      order.Id_pesanan === orderId
        ? { ...order, Id_kurir: parseInt(courierId), Status_pesanan: "DIKIRIM" }
        : order
    ));
    alert("Kurir berhasil ditugaskan!");
  };

  // Fungsi pengubah state pesanan saat Kurir menyelesaikan pengantaran
  const handleCompleteDelivery = (orderId) => {
    setOrders(orders.map(order =>
      order.Id_pesanan === orderId
        ? { ...order, Status_pesanan: "SELESAI" }
        : order
    ));
    alert("Pesanan telah selesai diantarkan!");
  };

  const addToCart = (item) => {
    const itemId = item.id || item.Id_menu;
    const isExist = cart.find((cartItem) => (cartItem.id || cartItem.Id_menu) === itemId);

    if (isExist) {
      setCart(cart.map((cartItem) => (cartItem.id || cartItem.Id_menu) === itemId ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateCartQty = (id, change) => {
    setCart(cart.map((item) => ((item.id || item.Id_menu) === id ? { ...item, qty: item.qty + change } : item)).filter((item) => item.qty > 0));
  };

  return (
    <div className="app-container fade-in">
      {/* Navbar menerima prop user dan setUser untuk mengontrol alur login */}
      <Navbar view={view} setView={setView} setSearch={setSearch} user={user} setUser={setUser} />

      <main>
        {view === "home" && (
          <MenuList
            search={search}
            category={category}
            setCategory={setCategory}
            addToCart={addToCart}
            menu={globalMenu}
          />
        )}
        {view === "about" && <About />}
        {view === "documentation" && <Documentation setView={setView} />}
        {view === "gallery" && <Gallery setView={setView} />} {/* Render komponen Galeri */}
        {view === "login" && <Login setView={setView} setUser={setUser} />}

        {view === "admin" && (
          <MenuManagement
            orders={orders}
            onAssignCourier={handleAssignCourier}
            setView={setView}
            globalMenu={globalMenu}
            setGlobalMenu={setGlobalMenu}
          />
        )}

        {view === "kurir" && (
          <DeliveryList
            orders={orders}
            currentUser={user}
            onCompleteDelivery={handleCompleteDelivery}
            setView={setView}
          />
        )}
      </main>

      {/* Menambahkan prop onCheckoutSubmit ke CartSidebar */}
      {cart.length > 0 && view === "home" && (
        <CartSidebar 
          cart={cart} 
          updateCartQty={updateCartQty} 
          onCheckoutSubmit={handleCustomerCheckoutSubmit} 
        />
      )}
    </div>
  );
}

export default App;