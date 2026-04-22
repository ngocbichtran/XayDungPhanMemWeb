-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 06, 2026 at 08:51 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minhanh`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_categories_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Điện thoại', 'Danh mục điện thoại', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 'Laptop', 'Danh mục laptop', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 'Phụ kiện', 'Danh mục phụ kiện công nghệ', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(4, 'Tablet', 'Danh mục máy tính bảng', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

DROP TABLE IF EXISTS `login_logs`;
CREATE TABLE IF NOT EXISTS `login_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `login_status` enum('success','failed') NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_login_logs_user` (`user_id`),
  KEY `idx_login_logs_email` (`email`),
  KEY `idx_login_logs_status` (`login_status`),
  KEY `idx_login_logs_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`id`, `user_id`, `email`, `ip_address`, `user_agent`, `login_status`, `message`, `created_at`) VALUES
(1, 1, 'admin@example.com', '127.0.0.1', 'Mozilla/5.0 Admin Browser', 'success', 'Đăng nhập thành công', '2026-03-06 09:12:01'),
(2, 2, 'user@example.com', '127.0.0.1', 'Mozilla/5.0 User Browser', 'success', 'Đăng nhập thành công', '2026-03-06 09:12:01'),
(3, NULL, 'unknown@example.com', '127.0.0.1', 'Mozilla/5.0 Unknown Browser', 'failed', 'Sai email hoặc mật khẩu', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_code` varchar(50) NOT NULL,
  `total_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `status` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `payment_method` varchar(50) NOT NULL,
  `payment_status` enum('unpaid','paid','failed','refunded') NOT NULL DEFAULT 'unpaid',
  `shipping_name` varchar(150) NOT NULL,
  `shipping_phone` varchar(20) NOT NULL,
  `shipping_address` text NOT NULL,
  `note` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_code` (`order_code`),
  KEY `idx_orders_user` (`user_id`),
  KEY `idx_orders_status` (`status`),
  KEY `idx_orders_payment_status` (`payment_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_code`, `total_amount`, `status`, `payment_method`, `payment_status`, `shipping_name`, `shipping_phone`, `shipping_address`, `note`, `created_at`, `updated_at`) VALUES
(1, 2, 'ORD20250001', '21890000.00', 'processing', 'COD', 'unpaid', 'Nguyen Van User', '0900000002', '12 Nguyen Trai, Ninh Kieu, Can Tho', 'Giao giờ hành chính', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 2, 'ORD20250002', '27890000.00', 'delivered', 'Banking', 'paid', 'Nguyen Van User', '0900000002', '12 Nguyen Trai, Ninh Kieu, Can Tho', 'Đã nhận hàng', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 4, 'ORD20260406001', '21890000.00', 'pending', 'COD', 'unpaid', 'Dev Dev', '0387646729', 'Hồ Chí Minh', 'Đơn hàng test', '2026-04-06 08:47:29', '2026-04-06 08:47:29');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `subtotal` decimal(15,2) GENERATED ALWAYS AS ((`quantity` * `price`)) STORED,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order` (`order_id`),
  KEY `idx_order_items_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, '18900000.00', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 1, 6, 1, '390000.00', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 1, 5, 2, '990000.00', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(4, 2, 3, 1, '27500000.00', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(5, 2, 6, 1, '390000.00', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(6, 3, 1, 1, '18900000.00', '2026-04-06 08:47:29', '2026-04-06 08:47:29'),
(7, 3, 5, 2, '990000.00', '2026-04-06 08:47:29', '2026-04-06 08:47:29'),
(8, 3, 6, 1, '390000.00', '2026-04-06 08:47:29', '2026-04-06 08:47:29');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(150) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('bich@example.com', 'reset_token_demo_bich_456', '2026-03-06 09:12:01'),
('user@example.com', 'reset_token_demo_user_123', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `code`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'view_dashboard', 'Xem dashboard', 'Truy cập trang tổng quan quản trị', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 'manage_users', 'Quản lý người dùng', 'Thêm sửa xóa và khóa người dùng', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 'manage_roles', 'Quản lý phân quyền', 'Quản lý vai trò và quyền', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(4, 'manage_products', 'Quản lý sản phẩm', 'Thêm sửa xóa sản phẩm', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(5, 'manage_categories', 'Quản lý danh mục', 'Thêm sửa xóa danh mục', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(6, 'manage_orders', 'Quản lý đơn hàng', 'Xem và cập nhật đơn hàng', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(7, 'view_profile', 'Xem hồ sơ', 'Xem thông tin tài khoản', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(8, 'update_profile', 'Cập nhật hồ sơ', 'Cập nhật thông tin cá nhân', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(9, 'create_order', 'Tạo đơn hàng', 'Tạo đơn hàng mới', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(10, 'view_own_orders', 'Xem đơn của mình', 'Xem lịch sử đơn hàng cá nhân', '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `sale_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `idx_products_name` (`name`),
  KEY `idx_products_category` (`category_id`),
  KEY `idx_products_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `sku`, `price`, `sale_price`, `quantity`, `image`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'iPhone 14', 'IP14-001', '22000000.00', '21000000.00', 15, 'iphone14.jpg', 'Điện thoại Apple iPhone 14', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 1, 'Samsung Galaxy S23', 'SS23-001', '20000000.00', '18900000.00', 20, 's23.jpg', 'Điện thoại Samsung Galaxy S23', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 2, 'MacBook Air M2', 'MBA-M2-001', '28500000.00', '27500000.00', 10, 'macbook-air-m2.jpg', 'Laptop Apple MacBook Air M2', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(4, 2, 'Dell Inspiron 15', 'DELL-INS15-001', '18000000.00', '17500000.00', 8, 'dell-inspiron-15.jpg', 'Laptop Dell Inspiron 15', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(5, 3, 'Tai nghe Bluetooth', 'ACC-HEADPHONE-001', '1200000.00', '990000.00', 50, 'headphone.jpg', 'Tai nghe không dây', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(6, 3, 'Chuột không dây', 'ACC-MOUSE-001', '450000.00', '390000.00', 60, 'mouse.jpg', 'Chuột không dây dùng cho laptop', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(7, 4, 'iPad Air', 'IPAD-AIR-001', '17000000.00', '16500000.00', 12, 'ipadair.jpg', 'Máy tính bảng iPad Air', 1, '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Quản trị hệ thống', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 'user', 'Người dùng thường', '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `fk_role_permissions_permission` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 7),
(1, 8),
(2, 8),
(1, 9),
(2, 9),
(1, 10),
(2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sessions_user_id` (`user_id`),
  KEY `idx_sessions_last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`, `created_at`, `updated_at`) VALUES
('sess_admin_001', 1, '127.0.0.1', 'Mozilla/5.0 Admin Browser', '{\"login\":true,\"role\":\"admin\"}', 1772788321, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
('sess_user_001', 2, '127.0.0.1', 'Mozilla/5.0 User Browser', '{\"login\":true,\"role\":\"user\"}', 1772788321, '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key_name` varchar(100) NOT NULL,
  `value` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_name` (`key_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key_name`, `value`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'Shop Account Management', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 'site_email', 'support@example.com', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 'site_phone', '1900 0000', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(4, 'currency', 'VND', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(5, 'allow_register', 'true', '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password_hash`, `avatar`, `status`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@example.com', '0900000001', '$2y$10$abcdefghijklmnopqrstuv1234567890abcdefghijklmnopqrstuv', NULL, 'active', '2026-03-06 09:12:01', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 'Nguyen Van User', 'user@example.com', '0900000002', '$2y$10$zyxwvutsrqponmlkjihgfedcba1234567890zyxwvutsrqponmlkji', NULL, 'active', '2026-03-06 09:12:01', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 'Tran Thi Bich', 'bich@example.com', '0900000003', '$2y$10$hashpassworddemo000000000000000000000000000000000000', NULL, 'inactive', NULL, '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(4, 'dev', 'dev@gmail.com', '0387646729', '$2b$10$9/sLmdyv5wmP7pZIFph7aeBE4G6ZWwjf6ZYLgrDLTg3Y2NuSv5ff2', NULL, 'active', NULL, '2026-04-06 07:54:28', '2026-04-06 08:39:05'),
(5, 'Administrator', 'admin@gmail.com', '0901234567', '$2b$10$v.fHl4kB432zVUSlGSUo4OHqjSAY/9uLkKKPwb273zBTZYycemuE.', NULL, 'active', NULL, '2026-04-06 08:13:11', '2026-04-06 08:13:11');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
CREATE TABLE IF NOT EXISTS `user_profiles` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` text,
  `bio` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`user_id`, `gender`, `birth_date`, `address`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'male', '1995-01-01', 'Ho Chi Minh City', 'Tài khoản quản trị viên hệ thống', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(2, 'male', '2000-05-20', 'Can Tho', 'Người dùng mua hàng', '2026-03-06 09:12:01', '2026-03-06 09:12:01'),
(3, 'female', '2001-08-15', 'Vinh Long', 'Tài khoản chưa kích hoạt', '2026-03-06 09:12:01', '2026-03-06 09:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_user_roles_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`, `assigned_at`) VALUES
(1, 1, '2026-03-06 09:12:01'),
(2, 2, '2026-03-06 09:12:01'),
(3, 2, '2026-03-06 09:12:01'),
(4, 2, '2026-04-06 07:54:28'),
(5, 1, '2026-04-06 08:13:11');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD CONSTRAINT `fk_login_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `fk_role_permissions_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role_permissions_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `fk_user_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
