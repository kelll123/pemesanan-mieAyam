import React, { useState } from "react";
import "./App.css";

// Import Komponen Modular
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import MenuList from "./pages/customer/MenuList";
import About from "./pages/customer/About";
import Documentation from "./pages/customer/Documentation";
import MenuManagement from "./pages/admin/MenuManagement";
import DeliveryList from "./pages/courier/DeliveryList";
import Login from "./pages/auth/Login";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [view, setView] = useState("home"); // "home", "about", "documentation", "admin", "kurir", "login"

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
      <Navbar view={view} setView={setView} setSearch={setSearch} />

      <main>
        {view === "home" && (
          <MenuList
            search={search}
            category={category}
            setCategory={setCategory}
            addToCart={addToCart}
          />
        )}
        {view === "about" && <About />}
        {view === "documentation" && <Documentation setView={setView} />}
        {view === "login" && <Login setView={setView} />}
        {view === "admin" && <MenuManagement menu={[]} setMenu={() => { }} setView={setView} />}
        {view === "kurir" && <DeliveryList />}
      </main>

      {cart.length > 0 && view === "home" && (
        <CartSidebar cart={cart} updateCartQty={updateCartQty} />
      )}
    </div>
  );
}

export default App;