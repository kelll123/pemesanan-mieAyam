import React, { useState, useEffect } from "react";
import "./App.css";
import heroImg from "./assets/hero.png";
import menuData from "./assets/menu.json";

function App() {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");
    const [view, setView] = useState("home"); // Navigasi halaman: "home", "about", "admin"

    // Data identitas pelanggan untuk keperluan nota WhatsApp
    const [customerName, setCustomerName] = useState("");
    const [tableNumber, setTableNumber] = useState("");

    const [newItem, setNewItem] = useState({ name: "", price: "", category: "Mie", image: "" });

    // 1. Memuat data menu awal dari LocalStorage atau file JSON
    useEffect(() => {
        const savedMenu = localStorage.getItem("niki_eco_menu");
        if (savedMenu) {
            setMenu(JSON.parse(savedMenu));
        } else if (menuData && menuData.food_items) {
            setMenu(menuData.food_items);
        }
        setLoading(false);
    }, []);

    // 2. Sinkronisasi otomatis data menu ke LocalStorage setiap ada perubahan
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("niki_eco_menu", JSON.stringify(menu));
            setFilteredMenu(menu);
        }
    }, [menu, loading]);

    // 3. Logika fitur pencarian dan filter kategori menu
    useEffect(() => {
        let hasil = menu.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        if (category !== "Semua") {
            hasil = hasil.filter((item) => item.category === category);
        }
        setFilteredMenu(hasil);
    }, [search, category, menu]);

    // 4. Logika penambahan item ke dalam keranjang belanja (Akumulasi Qty)
    const addToCart = (item) => {
        const isExist = cart.find((cartItem) => cartItem.id === item.id);
        if (isExist) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
                )
            );
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    // 5. Mengubah kuantitas item atau menghapus jika jumlahnya 0
    const updateCartQty = (id, change) => {
        setCart(
            cart
                .map((item) => (item.id === id ? { ...item, qty: item.qty + change } : item))
                .filter((item) => item.qty > 0)
        );
    };

    // 6. Integrasi pengiriman rincian pesanan terformat ke WhatsApp Merchant
    const kirimWA = (e) => {
        e.preventDefault();
        if (!customerName) return alert("Silakan masukkan nama pemesan terlebih dahulu!");

        const totalHarga = cart.reduce((total, item) => total + item.price * item.qty, 0);
        const rincian = cart.map((i) => `- ${i.name} (x${i.qty})`).join("%0A");

        const pesan = `Halo Mie Ayam Niki Eco!%0A%0A*Data Pemesan:*%0A- Nama: ${customerName}%0A- Lokasi/Meja: ${tableNumber || "-"}%0A%0A*Daftar Pesanan:*%0A${rincian}%0A%0A*Total Pembayaran: Rp ${totalHarga.toLocaleString("id-ID")}*`;

        window.open(`https://wa.me/62881080579585?text=${pesan}`, "_blank");
    };

    const handleAdminLogin = () => {
        const password = prompt("Masukkan Password Admin:");
        if (password === "niki123") setView("admin");
        else alert("Password Salah!");
    };

    // 7. Fitur Control Panel Admin (CRUD)
    const tambahMenu = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return alert("Nama dan harga wajib diisi!");
        const menuBaru = {
            ...newItem,
            id: Date.now(),
            price: parseInt(newItem.price),
            // Menggunakan gambar default yang stabil jika input kosong agar tidak merusak UI
            image: newItem.image || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500"
        };
        setMenu([...menu, menuBaru]);
        setNewItem({ name: "", price: "", category: "Mie", image: "" });
    };

    const editMenu = (id) => {
        const item = menu.find(m => m.id === id);
        const n = prompt("Ubah Nama Menu:", item.name);
        const h = prompt("Ubah Harga:", item.price);
        if (n && h) {
            setMenu(menu.map(m => m.id === id ? { ...m, name: n, price: parseInt(h) } : m));
        }
    };

    const hapusMenu = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
            setMenu(menu.filter(m => m.id !== id));
        }
    };

    if (loading) return <div className="loading-screen">Memuat Niki Eco...</div>;

    return (
        <div className="app-container fade-in">
            {/* GLOBAL NAVBAR */}
            <nav className="navbar">
                <div className="logo" onClick={() => setView("home")}>🍜 NIKI ECO 602</div>
                <ul className="nav-links">
                    <li className={`nav-item ${view === 'home' ? 'active-link' : ''}`} onClick={() => setView("home")}>HOME</li>
                    <li className={`nav-item ${view === 'about' ? 'active-link' : ''}`} onClick={() => setView("about")}>ABOUT</li>
                    <li className="nav-admin" onClick={handleAdminLogin}>ADMIN</li>
                </ul>
                <div className="nav-actions">
                    {view === "home" && (
                        <input type="text" placeholder="Cari kuliner favorit..." className="search-input" onChange={(e) => setSearch(e.target.value)} />
                    )}
                </div>
            </nav>

            {/* TAMPILAN UTAMA (HOME VIEW) */}
            {view === "home" && (
                <>
                    <header className="hero">
                        <div className="hero-content">
                            <span className="badge-promo">Homemade & Tanpa Pengawet</span>
                            <h1>ENJOY OUR DELICIOUS <br /> <span>MIE AYAM SPECIAL</span></h1>
                            <p className="description">Rasakan kenikmatan mie segar produksi sendiri dipadu bumbu kaldu warisan keluarga. Pesan praktis, bebas antre lama!</p>
                            <button className="order-btn" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>Lihat Daftar Menu</button>
                        </div>
                        {/* FIX PERBAIKAN ERROR: Menggunakan variabel heroImg pada tag img di bawah ini */}
                        <div className="hero-image-container">
                            <img src={heroImg} alt="Banner Utama Mie Ayam Niki Eco" className="main-hero-img floating-anim" />
                        </div>
                    </header>

                    <section className="menu-section" id="menu">
                        <div className="section-title">
                            <h2>Menu Populer Kami</h2>
                            <div className="filter-buttons">
                                {["Semua", "Mie", "Minuman", "Tambahan"].map((cat) => (
                                    <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat}</button>
                                ))}
                            </div>
                        </div>

                        <div className="menu-grid">
                            {filteredMenu.map((item) => (
                                <div key={item.id} className="menu-card">
                                    <div className="card-img-wrapper">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            // FIX PERBAIKAN IMAGE ERROR: Mengganti gambar otomatis jika URL bernilai kosong/rusak
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500";
                                            }}
                                        />
                                    </div>
                                    <div className="card-info">
                                        <h3>{item.name}</h3>
                                        <p className="price">Rp {item.price.toLocaleString("id-ID")}</p>
                                        <button className="add-to-cart" onClick={() => addToCart(item)}>Tambah ke Keranjang</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {/* TAMPILAN PROFIL RESMI (ABOUT VIEW) */}
            {view === "about" && (
                <section className="about-section fade-in">
                    <div className="about-header">
                        <h2>Tentang NIKI ECO 602</h2>
                        <p className="about-subtitle">Cita Rasa Otentik, Higienis, & Tanpa Bahan Pengawet</p>
                    </div>
                    <div className="about-container">
                        <div className="about-box">
                            <h3>Profil Warung Kami</h3>
                            <p>
                                <strong>NIKI ECO 602</strong> adalah penyedia kuliner khas yang memproduksi bahan baku utamanya secara mandiri. Kami berkomitmen menyajikan kelezatan sehat, di mana produk <strong>Mie Segar</strong> dan <strong>Daging Burger</strong> kami diolah sendiri menggunakan resep rahasia keluarga tanpa tambahan zat pewarna sintetik maupun pengawet buatan.
                            </p>
                            <p>
                                Selain menu andalan Mie Ayam Pangsit dan Mie Ayam Bakso, kami juga menghidangkan variasi kuliner favorit lain seperti <em>Ketoprak Ala Jakarta</em>, <em>Bubur Ayam Kuah Kuning</em>, serta ragam minuman segar pendamping makan Anda.
                            </p>
                        </div>

                        <div className="about-box highlighted">
                            <h3>Menerima Pesanan Acara (Catering)</h3>
                            <p>Kami siap memeriahkan dan melayani kebutuhan hidangan untuk berbagai momen spesial Anda, termasuk:</p>
                            <ul className="about-list">
                                <li>🎉 Acara Pesta & Ulang Tahun</li>
                                <li>🤝 Kegiatan Arisan Keluarga</li>
                                <li>💼 Rapat Kantor & Gathering Instansi</li>
                                <li>✨ Acara Terobosan & Syukuran</li>
                            </ul>
                            <p className="contact-info-text">Silakan hubungi admin kami atau lakukan simulasi pemesanan keranjang belanja di halaman utama.</p>
                        </div>
                    </div>
                    <div className="about-address">
                        <h4>📍 Lokasi Operasional</h4>
                        <p>Jl. Limbungan – Simpang Tugu AMD, Rumbai Pesisir, Pekanbaru, Riau.</p>
                    </div>
                </section>
            )}

            {/* PANEL PENGELOLAAN DATA (ADMIN VIEW) */}
            {view === "admin" && (
                <section className="admin-panel">
                    <div className="admin-header">
                        <h2>Panel Pengelolaan Menu</h2>
                        <button className="back-btn" onClick={() => setView("home")}>Kembali ke Toko</button>
                    </div>

                    <div className="add-menu-form">
                        <h3>Tambah Menu Baru</h3>
                        <form onSubmit={tambahMenu}>
                            <input type="text" placeholder="Nama Menu" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                            <input type="number" placeholder="Harga" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                            <input type="text" placeholder="URL Link Gambar (Opsional)" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} />
                            <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                                <option value="Mie">Mie</option>
                                <option value="Minuman">Minuman</option>
                                <option value="Tambahan">Tambahan</option>
                            </select>
                            <button type="submit" className="add-btn-submit">Simpan Menu</button>
                        </form>
                    </div>

                    <table className="admin-table">
                        <thead>
                            <tr><th>Nama Menu</th><th>Harga</th><th>Kategori</th><th>Aksi</th></tr>
                        </thead>
                        <tbody>
                            {menu.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>Rp {item.price.toLocaleString("id-ID")}</td>
                                    <td><span className="badge-category">{item.category}</span></td>
                                    <td>
                                        <button className="edit-btn" onClick={() => editMenu(item.id)}>Edit</button>
                                        <button className="delete-btn" onClick={() => hapusMenu(item.id)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* FLOATING SIDEBAR KERANJANG */}
            {cart.length > 0 && view === "home" && (
                <div className="cart-sidebar">
                    <h3>🛒 Keranjang Belanja</h3>
                    <div className="cart-items-container">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-detail">
                                    <h4>{item.name}</h4>
                                    <p>Rp {(item.price * item.qty).toLocaleString("id-ID")}</p>
                                </div>
                                <div className="cart-qty-control">
                                    <button onClick={() => updateCartQty(item.id, -1)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateCartQty(item.id, 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={kirimWA} className="form-checkout">
                        <input type="text" placeholder="Nama Pemesan (Wajib)" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                        <input type="text" placeholder="Nomor Meja / Catatan Lokasi" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
                        <div className="total-box">
                            <span>Total Bayar:</span>
                            <strong>Rp {cart.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString("id-ID")}</strong>
                        </div>
                        <button type="submit" className="checkout-btn">Pesan via WhatsApp</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;