import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ setView }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      return setError("Username dan password wajib diisi!");
    }

    setLoading(true);
    try {
      // Jalur hit API Backend nyata
      const response = await api.post("/auth/login", { username, password });
      const { role, nama } = response.data;
      
      alert(`Selamat datang kembali, ${nama}!`);
      if (role === "ADMIN") setView("admin");
      else if (role === "KURIR") setView("kurir");
    } catch (err) {
      console.log("Koneksi API belum aktif, menjalankan simulasi login lokal.");
      
      // FALLBACK SIMULASI LOKAL (Agar tetap bisa testing walau backend mati)
      if (username === "admin" && password === "niki123") {
        alert("Selamat datang, Pemilik Niki Eco! (Mode Simulasi)");
        setView("admin");
      } else if (username === "kurir" && password === "kurir123") {
        alert("Selamat datang, Kurir Niki Eco! (Mode Simulasi)");
        setView("kurir");
      } else {
        setError("Username atau password salah!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Elemen hiasan abstrak cahaya di latar belakang */}
      <div className="login-bg-glow-1"></div>
      <div className="login-bg-glow-2"></div>

      <div className="login-card-container">
        <div className="login-card-header">
          <div className="login-avatar-icon">🔒</div>
          <h2>Login Sistem</h2>
          <p>Niki Eco 602 Database Integration</p>
        </div>

        {error && <div className="login-error-alert">⚠️ {error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group-modern">
            <label>Username</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group-modern">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Memverifikasi..." : "Masuk ke Sistem"}
          </button>
        </form>

        <div className="login-card-footer">
          <button onClick={() => setView("home")} className="back-to-store-link">
            ← Kembali Sebagai Pelanggan
          </button>
        </div>
      </div>
    </div>
  );
}