import api from "./api";

const menuService = {
  // 1. Mengambil semua data menu dari Table Menu di MySQL (FR-01, FR-02)
  getAllMenu: async () => {
    try {
      const response = await api.get("/menu");
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data menu dari database:", error);
      throw error;
    }
  },

  // 2. Menambahkan menu baru ke database (FR-09, FR-10)
  createMenu: async (menuData) => {
    try {
      const response = await api.post("/menu", menuData);
      return response.data;
    } catch (error) {
      console.error("Gagal menyimpan menu baru ke database:", error);
      throw error;
    }
  },

  // 3. Mengubah data menu yang sudah ada berdasarkan Id_menu (FR-09, FR-10)
  updateMenu: async (id, menuData) => {
    try {
      const response = await api.put(`/menu/${id}`, menuData);
      return response.data;
    } catch (error) {
      console.error(`Gagal mengubah data menu ID ${id}:`, error);
      throw error;
    }
  },

  // 4. Menghapus menu dari database berdasarkan Id_menu (FR-09, FR-10)
  deleteMenu: async (id) => {
    try {
      const response = await api.delete(`/menu/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Gagal menghapus data menu ID ${id}:`, error);
      throw error;
    }
  }
};

export default menuService;