import api from "./api";

const authService = {
  /**
   * Fungsi untuk mengirimkan kredensial login ke Backend API (FR-07, FR-08)
   * @param {string} username 
   * @param {string} password 
   */
  login: async (username, password) => {
    try {
      // Menembak endpoint backend port 5000 secara nyata
      const response = await api.post("/auth/login", { username, password });
      
      // Jika berhasil, backend biasanya mengembalikan data: { role, nama, token }
      if (response.data && response.data.token) {
        // Simpan session login ke localStorage browser agar tidak hilang saat di-refresh
        localStorage.setItem("user_role", response.data.role);
        localStorage.setItem("user_nama", response.data.nama);
        localStorage.setItem("user_token", response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error("Proses autentikasi gagal:", error);
      throw error;
    }
  },

  /**
   * Fungsi membersihkan session saat Admin atau Kurir keluar dari sistem
   */
  logout: () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_nama");
    localStorage.removeItem("user_token");
  }
};

export default authService;