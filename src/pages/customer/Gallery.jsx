import React, { useState, useEffect } from "react";

export default function Gallery({ setView }) {
  // State untuk melacak kategori filter aktif: "Foto" / "Video" / "Testimoni"
  const [activeFilter, setActiveFilter] = useState("Foto");
  const [galleryItems, setGalleryItems] = useState([]);

  // Mengambil data galeri yang diinput admin melalui localStorage secara real-time
  useEffect(() => {
    const savedGallery = JSON.parse(localStorage.getItem("niki_eco_gallery")) || [];
    
    // Jika data dari admin masih kosong, kita berikan data mockup/default agar tidak sepi
    if (savedGallery.length === 0) {
      const defaultData = [
        {
          id: 1,
          type: "Foto",
          title: "Mie Ayam Bakso Spesial",
          fileUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
          description: "Sajian legendaris mie segar buatan sendiri dengan toping ayam melimpah dan bakso sapi kenyal."
        },
        {
          id: 2,
          type: "Video",
          title: "Review Jujur Nex Carlos di Niki Eco",
          fileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Ganti dengan link embed video youtube asli nanti
          description: "Liputan suasana warung dan kenikmatan bumbu rahasia bakso Niki Eco 602."
        },
        {
          id: 3,
          type: "Testimoni",
          title: "Ahmad Subarjo (Driver Ojol)",
          fileUrl: "",
          description: "Bumbunya meresap sampai ke dalam, porsi kenyang, harga sangat bersahabat buat langganan makan siang!"
        }
      ];
      setGalleryItems(defaultData);
    } else {
      setGalleryItems(savedGallery);
    }
  }, []);

  // Menyaring data berdasarkan tombol kategori yang sedang aktif
  const filteredItems = galleryItems.filter(item => item.type === activeFilter);

  return (
    <div style={{ backgroundColor: "#faf8f5", width: "100%", minHeight: "100vh", padding: "40px 20px" }}>
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* HEADER HALAMAN */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ background: "#ffeef0", color: "#c8102e", padding: "6px 16px", borderRadius: "20px", fontWeight: "700", fontSize: "0.85rem" }}>
            Dokumentasi & Ulasan Kreatif
          </span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: "800", color: "#1a1a1a", marginTop: "10px" }}>
            Galeri Niki Eco 602
          </h2>
          <p style={{ color: "#718096", fontSize: "1.05rem", maxWidth: "600px", margin: "10px auto 0" }}>
            Intip kelezatan hidangan kami melalui dokumentasi lensa, video liputan, serta ulasan tulus dari pelanggan setia.
          </p>
        </div>

        {/* BUTTON PILIHAN FILTER (FOTO / VIDEO / TESTIMONI) */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" }}>
          <button
            onClick={() => setActiveFilter("Foto")}
            style={{
              padding: "12px 30px",
              fontWeight: "700",
              borderRadius: "30px",
              border: "2px solid",
              borderColor: activeFilter === "Foto" ? "#c8102e" : "#e2e8f0",
              cursor: "pointer",
              backgroundColor: activeFilter === "Foto" ? "#c8102e" : "#ffffff",
              color: activeFilter === "Foto" ? "#ffffff" : "#4a5568",
              boxShadow: activeFilter === "Foto" ? "0 4px 12px rgba(200, 16, 46, 0.15)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            📸 Foto Menu
          </button>
          
          <button
            onClick={() => setActiveFilter("Video")}
            style={{
              padding: "12px 30px",
              fontWeight: "700",
              borderRadius: "30px",
              border: "2px solid",
              borderColor: activeFilter === "Video" ? "#3182ce" : "#e2e8f0",
              cursor: "pointer",
              backgroundColor: activeFilter === "Video" ? "#3182ce" : "#ffffff",
              color: activeFilter === "Video" ? "#ffffff" : "#4a5568",
              boxShadow: activeFilter === "Video" ? "0 4px 12px rgba(49, 130, 206, 0.15)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            🎥 Liputan Video
          </button>
          
          <button
            onClick={() => setActiveFilter("Testimoni")}
            style={{
              padding: "12px 30px",
              fontWeight: "700",
              borderRadius: "30px",
              border: "2px solid",
              borderColor: activeFilter === "Testimoni" ? "#38a169" : "#e2e8f0",
              cursor: "pointer",
              backgroundColor: activeFilter === "Testimoni" ? "#38a169" : "#ffffff",
              color: activeFilter === "Testimoni" ? "#ffffff" : "#4a5568",
              boxShadow: activeFilter === "Testimoni" ? "0 4px 12px rgba(56, 161, 105, 0.15)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            💬 Ulasan Pelanggan
          </button>
        </div>

        {/* CONTAINER DISPLAY GRID KONTEN */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#a0aec0", fontStyle: "italic", background: "#fff", borderRadius: "12px" }}>
            Belum ada konten di kategori ini. Konten yang diinput Admin akan otomatis muncul di sini!
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  background: "#ffffff", 
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                  border: activeFilter === "Testimoni" ? "1px solid #e2e8f0" : "none",
                  borderTop: activeFilter === "Testimoni" ? "4px solid #38a169" : "none"
                }}
              >
                {/* JIKA KATEGORI FOTO */}
                {item.type === "Foto" && (
                  <img 
                    src={item.fileUrl} 
                    alt={item.title} 
                    style={{ width: "100%", height: "220px", objectFit: "cover" }} 
                  />
                )}

                {/* JIKA KATEGORI VIDEO */}
                {item.type === "Video" && (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                    <iframe
                      title={item.title}
                      src={item.fileUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    />
                  </div>
                )}

                {/* BAGIAN TEKS INFORMASI KARTU */}
                <div style={{ padding: "20px" }}>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1a1a1a", margin: "0 0 10px 0" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                    {activeFilter === "Testimoni" ? `"${item.description}"` : item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TOMBOL BACK TO HOME */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button 
            onClick={() => setView("home")}
            style={{
              background: "#1a1a1a",
              color: "#ffffff",
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ← Kembali ke Menu Utama
          </button>
        </div>

      </section>
    </div>
  );
}