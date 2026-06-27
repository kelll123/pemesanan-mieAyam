import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ setView, setUser }) {
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
      
      const { Id_login, role, nama } = response.data; 
      
      alert(`Selamat datang kembali, ${nama}!`);
      
      setUser({ Id_login: Id_login, Nama: nama, Role: role });

      if (role === "ADMIN") setView("admin");
      else if (role === "KURIR") setView("kurir");
    } catch (err) {
      console.log("Koneksi API belum aktif, menjalankan simulasi login lokal.");
      
      // ==================== SIMULASI LOKAL 3 AKUN KURIR SINKRON ====================
      if (username === "admin" && password === "niki123") {
        alert("Selamat datang, Pemilik Niki Eco! (Mode Simulasi)");
        setUser({ Id_login: 99, Nama: "Pemilik Niki Eco", Role: "ADMIN" });
        setView("admin");
      } 
      // Akun Kurir 1
      else if (username === "kurir1" && password === "kurir123") {
        alert("Selamat datang, Budi Santoso! (Kurir 1 - Mode Simulasi)");
        setUser({ Id_login: 1, Nama: "Budi Santoso", Role: "KURIR" });
        setView("kurir");
      }
      // Akun Kurir 2
      else if (username === "kurir2" && password === "kurir123") {
        alert("Selamat datang, Andi Wijaya! (Kurir 2 - Mode Simulasi)");
        setUser({ Id_login: 2, Nama: "Andi Wijaya", Role: "KURIR" });
        setView("kurir");
      }
      // Akun Kurir 3
      else if (username === "kurir3" && password === "kurir123") {
        alert("Selamat datang, Siti Rahma! (Kurir 3 - Mode Simulasi)");
        setUser({ Id_login: 3, Nama: "Siti Rahma", Role: "KURIR" });
        setView("kurir");
      } 
      else {
        setError("Username atau password salah! (Tips: Gunakan admin, kurir1, kurir2, atau kurir3)");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
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
                placeholder="admin / kurir1 / kurir2 / kurir3"
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
                placeholder="niki123 / kurir123"
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