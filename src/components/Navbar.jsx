import React from "react";

export default function Navbar({ view, setView, setSearch }) {
  return (
    <nav className="navbar">
      {/* SISI KIRI: Logo */}
      <div className="logo" onClick={() => setView("home")}>
        <span>🍜</span> NIKI ECO 602
      </div>

      {/* SISI TENGAH: Navigasi Utama */}
      <ul className="nav-links">
        <li className={`nav-item ${view === 'home' ? 'active-link' : ''}`} onClick={() => setView("home")}>HOME</li>
        <li className={`nav-item ${view === 'documentation' ? 'active-link' : ''}`} onClick={() => setView("documentation")}>DOCS</li>
        <li className={`nav-item ${view === 'about' ? 'active-link' : ''}`} onClick={() => setView("about")}>ABOUT</li>
      </ul>

      {/* SISI KANAN: Aksi (Cari & Tombol Login Spesial) */}
      <div className="nav-actions">
        {view === "home" && (
          <input 
            type="text" 
            placeholder="Cari kuliner favorit..." 
            className="search-input" 
            onChange={(e) => setSearch(e.target.value)} 
          />
        )}
        <button 
          className={`nav-login-btn ${view === 'login' ? 'active-login-btn' : ''}`} 
          onClick={() => setView("login")}
        >
          LOGIN INTERNAL
        </button>
      </div>
    </nav>
  );
}