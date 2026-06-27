-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 26, 2026 at 03:45 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mieayam_nikieco`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `Id_login` int NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('ADMIN','KURIR') NOT NULL,
  `Nama` varchar(100) NOT NULL,
  `Create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`Id_login`, `Username`, `Password`, `Role`, `Nama`, `Create_at`) VALUES
(1, 'admin', 'niki123', 'ADMIN', 'Pemilik Niki Eco', '2026-06-15 19:21:03'),
(2, 'kurir', 'kurir123', 'KURIR', 'Kurir Pengantaran 1', '2026-06-15 19:21:03');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `Id_menu` int NOT NULL,
  `Nama_menu` varchar(100) NOT NULL,
  `Harga` decimal(10,2) NOT NULL,
  `Deskripsi` text,
  `Gambar` varchar(255) DEFAULT NULL,
  `stok` int NOT NULL DEFAULT '0',
  `Create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`Id_menu`, `Nama_menu`, `Harga`, `Deskripsi`, `Gambar`, `stok`, `Create_at`) VALUES
(1, 'Mie Ayam Original', 15000.00, 'Mie segar buatan sendiri dengan potongan ayam gurih.', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500', 50, '2026-06-15 19:21:16'),
(2, 'Mie Ayam Bakso', 18000.00, 'Mie segar ditambah bakso sapi homemade yang kenyal.', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500', 40, '2026-06-15 19:21:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`Id_login`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`Id_menu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `Id_login` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `Id_menu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
