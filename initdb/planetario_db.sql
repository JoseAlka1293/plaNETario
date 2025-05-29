-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2025 at 06:23 PM
-- Server version: 8.0.39
-- PHP Version: 8.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `planetario_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `planeta_id` int NOT NULL,
  `orden` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planetas`
--

CREATE TABLE `planetas` (
  `id` int NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `orden_solar` int DEFAULT NULL,
  `imagen_web` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `modelo_3d` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `planetas`
--

INSERT INTO `planetas` (`id`, `nombre`, `descripcion`, `orden_solar`, `imagen_web`, `modelo_3d`) VALUES
(3, 'Tierra', 'Nuestro planeta Tierra', 3, '/uploads/images/Tierra.png', '/uploads/models/Earth.glb'),
(4, 'Mercurio', 'Planeta 1', 1, '/uploads/images/Mercurio.png', '/uploads/models/Mercury.glb'),
(5, 'Venus', 'Numero 2', 2, '/uploads/images/Venus.png', '/uploads/models/Venus.glb'),
(6, 'Marte', 'Numero 4 Planeta Rojo', 5, '/uploads/images/Marte.png', '/uploads/models/Marte.glb'),
(7, 'Jupiter', 'Numero 5', 4, '/uploads/images/Jupiter.png', '/uploads/models/Jupiter.glb'),
(8, 'Saturno', 'Numero 6', 6, '/uploads/images/Saturno.png', '/uploads/models/Saturn.glb'),
(9, 'Urano', 'Numero 7', 7, '/uploads/images/Urano.png', '/uploads/models/Uranus.glb'),
(10, 'Neptuno', 'Numero 8', 8, '/uploads/images/Neptuno.png', '/uploads/models/Neptune.glb');

-- --------------------------------------------------------

--
-- Table structure for table `secciones_planeta`
--

CREATE TABLE `secciones_planeta` (
  `id` int NOT NULL,
  `planeta_id` int NOT NULL,
  `titulo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contenido` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rol` enum('user','admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `rol`, `fecha_registro`) VALUES
(4, 'JoseAdmin', 'JoseAdmin@gmail.com', '$2b$10$GUQKJJpBCjUyNdFUWg7NaOYt.V4hK/mzEheAz6dp1ZTbpSQR79kXe', 'admin', '2025-05-02 22:19:42'),
(5, 'Admin', 'admin@gmail.com', '$2b$10$CBvCgL.h51MlxEimP4EsHeBZIgQsYhRoysANq5OolwCNPB3arWIkO', 'admin', '2025-05-02 23:06:02'),
(6, 'Prueba1', 'Prueba1@gmail.com', '$2b$10$2LAm6qzKcSJO0DEvd2YIje1jrZZQ4lnVSl6YJBC.hhmhiryy3SW0C', 'user', '2025-05-12 10:01:17'),
(7, 'Prueba2', 'Prueba2@gmail.com', '$2b$10$cKtImYrrhHN9FzpZqw.Gme1K8hb3OiYPW13pmNvSOtD.wZw5A782q', 'user', '2025-05-12 10:34:59'),
(9, 'Final1', 'Final1@gmail.com', '$2b$10$kfi/ByJ5xqxdm.jBmZJT0.EnlmDurNRjjXto7mAdAQ3bbc7pX5TZW', 'admin', '2025-05-27 19:33:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `planeta_id` (`planeta_id`);

--
-- Indexes for table `planetas`
--
ALTER TABLE `planetas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `secciones_planeta`
--
ALTER TABLE `secciones_planeta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `planeta_id` (`planeta_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `planetas`
--
ALTER TABLE `planetas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `secciones_planeta`
--
ALTER TABLE `secciones_planeta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`planeta_id`) REFERENCES `planetas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `secciones_planeta`
--
ALTER TABLE `secciones_planeta`
  ADD CONSTRAINT `secciones_planeta_ibfk_1` FOREIGN KEY (`planeta_id`) REFERENCES `planetas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
