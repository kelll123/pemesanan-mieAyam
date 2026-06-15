import axios from "axios";

// Sesuaikan URL di bawah ini dengan alamat port backend database kamu nanti (contoh: port 5000 atau 8000)
const API_BASE_URL = "http://localhost:5000/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;