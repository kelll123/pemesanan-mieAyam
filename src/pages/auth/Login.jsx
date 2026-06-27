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
      // Jalur API Backend Nyata
      const response = await api.post("/auth/login", { username, password });
      const { Id_login, role, nama } = response.data;

      alert(`Selamat datang kembali, ${nama}!`);

      // Menyetarakan format objek global
      setUser({ Id_login: parseInt(Id_login), Nama: nama, Role: role.toUpperCase() });

      if (role.toUpperCase() === "ADMIN") setView("admin");
      else if (role.toUpperCase() === "KURIR") setView("kurir");
    } catch (err) {
      console.log("Koneksi API belum aktif, menjalankan simulasi login lokal.");

      const userLower = username.toLowerCase();

      // ==================== SIMULASI LOKAL DENGAN NAMA BERBEDA ====================
      if (userLower === "admin" && password === "niki123") {
        alert("Selamat datang, Pemilik Niki Eco!");
        setUser({ Id_login: 99, Nama: "Pemilik Niki Eco", Role: "ADMIN" });
        setView("admin");
      }
      // Kurir 1: Budi Santoso
      else if (userLower === "budi" && password === "kurir123") {
        alert("Selamat datang, Budi Santoso!");
        setUser({ Id_login: 1, Nama: "Budi Santoso", Role: "KURIR" });
        setView("kurir");
      }
      // Kurir 2: Andi Wijaya
      else if (userLower === "andi" && password === "kurir123") {
        alert("Selamat datang, Andi Wijaya!");
        setUser({ Id_login: 2, Nama: "Andi Wijaya", Role: "KURIR" });
        setView("kurir");
      }
      // Kurir 3: Siti Rahma
      else if (userLower === "siti" && password === "kurir123") {
        alert("Selamat datang, Siti Rahma!");
        setUser({ Id_login: 3, Nama: "Siti Rahma", Role: "KURIR" });
        setView("kurir");
      }
      else {
        setError("Akun tidak ditemukan! Gunakan username: admin, budi, andi, atau siti");
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
          <p>Niki Eco 602 - 3 Kurir Terintegrasi</p>
        </div>

        {error && <div className="login-error-alert">⚠️ {error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group-modern">
            <label>Username Akun</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Contoh: budi / andi / siti / admin"
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