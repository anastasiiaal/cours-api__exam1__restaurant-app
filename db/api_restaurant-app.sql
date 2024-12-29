-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 29, 2024 at 09:37 PM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_restaurant-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
CREATE TABLE IF NOT EXISTS `dishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` float NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `restaurantId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurantId` (`restaurantId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `image`, `price`, `description`, `restaurantId`, `createdAt`, `updatedAt`) VALUES
(1, 'Pizza Margherita', 'https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067', 12.99, 'A delicious classic Italian pizza!', 6, '2024-12-13 10:34:39', '2024-12-29 17:18:15'),
(4, 'Tartar', 'https://assets.afcdn.com/recipe/20211130/125060_w1024h1024c1cx827cy763cxt0cyt0cxb2120cyb1414.webp', 22.25, 'Best tartar in the city', 6, '2024-12-13 11:29:21', '2024-12-13 11:29:21'),
(5, 'Ice cream', 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/homemade-ice-cream.jpg', 9.99, 'Best ice cream', 6, '2024-12-13 14:59:24', '2024-12-13 14:59:24'),
(6, 'Ramen', 'https://images.themodernproper.com/billowy-turkey/production/posts/SlowCookerCurryBeefRamen_11.jpg?w=1200&q=82&auto=format&fit=crop&dm=1676687723&s=8b51b8436205cc5428c9a7300c0ad861', 14, 'Beef ramen', 7, '2024-12-15 17:50:44', '2024-12-15 17:50:44'),
(7, 'Sushi', 'https://offloadmedia.feverup.com/lillesecret.com/wp-content/uploads/2023/03/12102658/COUV-ARTICLES-1920x1080-2023-03-09T161912.579-1024x576.jpg', 12, 'Maki + California', 7, '2024-12-15 17:51:35', '2024-12-15 17:51:35'),
(8, 'Ramune', 'https://www.roskosushi.com/pub/Photos_produits_2021/Boissons/Rosko-Sushi-Limonade-Ramune.jpg', 4, 'Japanese lemonade', 7, '2024-12-15 17:52:20', '2024-12-15 17:52:20'),
(9, 'Apple pie', 'https://joyfoodsunshine.com/wp-content/uploads/2019/08/best-apple-pie-recipe-from-scratch-8.jpg', 12, 'Delicious apple pie', 6, '2024-12-28 19:48:35', '2024-12-28 19:48:35'),
(10, 'Grilled octopus', 'https://lamaisondubrasero.fr/cdn/shop/articles/poulpe_grille_1.jpg?v=1720540825&width=1100', 35, 'Best in the city. Served with grilled vegetables', 3, '2024-12-28 21:01:15', '2024-12-29 17:35:41'),
(11, 'Amazing tomato soup', 'https://images.themodernproper.com/billowy-turkey/production/posts/2018/TomatoBisque_8.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1666788561&s=81b122be1b313ffd22a428185e6d5e8c', 19, 'Do not hesitate', 3, '2024-12-28 21:04:24', '2024-12-28 21:04:24');

-- --------------------------------------------------------

--
-- Table structure for table `orderdish`
--

DROP TABLE IF EXISTS `orderdish`;
CREATE TABLE IF NOT EXISTS `orderdish` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderId` int NOT NULL,
  `dishId` int NOT NULL,
  PRIMARY KEY (`orderId`,`dishId`),
  KEY `dishId` (`dishId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `restaurantId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `items` text COLLATE utf8mb4_general_ci NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurantId` (`restaurantId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `date`, `restaurantId`, `createdAt`, `updatedAt`, `userId`, `items`, `total`) VALUES
(1, '2024-12-26 21:57:29', 7, '2024-12-26 21:57:29', '2024-12-26 21:57:29', 105, '[{\"dishId\":7,\"name\":\"Sushi\",\"image\":\"https://offloadmedia.feverup.com/lillesecret.com/wp-content/uploads/2023/03/12102658/COUV-ARTICLES-1920x1080-2023-03-09T161912.579-1024x576.jpg\",\"price\":12,\"quantity\":1},{\"dishId\":8,\"name\":\"Ramune\",\"image\":\"https://www.roskosushi.com/pub/Photos_produits_2021/Boissons/Rosko-Sushi-Limonade-Ramune.jpg\",\"price\":4,\"quantity\":1}]', 16),
(2, '2024-12-26 21:58:18', 6, '2024-12-26 21:58:18', '2024-12-26 21:58:18', 105, '[{\"dishId\":5,\"name\":\"Ice cream\",\"image\":\"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/homemade-ice-cream.jpg\",\"price\":9.99,\"quantity\":2},{\"dishId\":4,\"name\":\"Tartar\",\"image\":\"https://assets.afcdn.com/recipe/20211130/125060_w1024h1024c1cx827cy763cxt0cyt0cxb2120cyb1414.webp\",\"price\":22.25,\"quantity\":1}]', 42.23),
(3, '2024-12-26 21:58:27', 7, '2024-12-26 21:58:27', '2024-12-26 21:58:27', 105, '[{\"dishId\":8,\"name\":\"Ramune\",\"image\":\"https://www.roskosushi.com/pub/Photos_produits_2021/Boissons/Rosko-Sushi-Limonade-Ramune.jpg\",\"price\":4,\"quantity\":1},{\"dishId\":6,\"name\":\"Ramen\",\"image\":\"https://images.themodernproper.com/billowy-turkey/production/posts/SlowCookerCurryBeefRamen_11.jpg?w=1200&q=82&auto=format&fit=crop&dm=1676687723&s=8b51b8436205cc5428c9a7300c0ad861\",\"price\":14,\"quantity\":1}]', 18),
(4, '2024-12-26 21:59:26', 6, '2024-12-26 21:59:26', '2024-12-26 21:59:26', 105, '[{\"dishId\":5,\"name\":\"Ice cream\",\"image\":\"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/homemade-ice-cream.jpg\",\"price\":9.99,\"quantity\":2}]', 19.98);

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
CREATE TABLE IF NOT EXISTS `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `zipCode` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ownerId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ownerId` (`ownerId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `address`, `zipCode`, `city`, `image`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(3, 'Best Restaurant', '10 bd de France', '74010', 'Annecy-le-Vieux', 'https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg', 87, '2024-11-27 13:53:44', '2024-11-27 13:53:44'),
(6, 'Le Clos de Sens', '144 Route d\'Annecy', '74010', 'Annecy-le-Vieux', 'https://nolinskiparis.com/wp-content/uploads/2024/09/reportagesalle%C2%A9julieLimont1646-2016x1600.jpg', 103, '2024-11-28 12:47:49', '2024-12-29 21:17:06'),
(7, 'Fujikoya', '37 Rue Sommeiller', '74000', 'Annecy', 'https://media.admagazine.fr/photos/620298e978bfe369d6fae549/16:9/w_2580,c_limit/SUMI.jpeg', 104, '2024-12-15 17:49:46', '2024-12-15 17:49:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('USER','ADMIN','OWNER') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'USER',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `users_email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Super Admin', '$2a$08$72l1il.sQHlEoM1S1Y60HeqLTW.i0SptB7nZXCfA7sMy9q86DY3hi', 'admin@gmail.com', 'ADMIN', '2024-11-27 09:57:52', '2024-12-15 17:07:53'),
(87, 'Arthur Tintin', '$2a$08$M8HpgzLRuFBp7Xgtm3pcXOjWa42Yq3I0EayS5SVmivTnXqg4pSRbe', 'owner1@gmail.com', 'OWNER', '2024-11-27 13:53:44', '2024-11-27 13:53:44'),
(103, 'Andrew Mason', '$2a$08$RBb0vcGtAElFepcV/fpK7O1EIxaMbyYpiG/Z1.oLfAUZiwYIVlmEi', 'owner@gmail.com', 'OWNER', '2024-11-28 12:47:49', '2024-11-28 12:47:49'),
(104, 'Mr. Tanaka', '$2a$08$hPWhvWG17bGa8hleY9L9fuLOPkGcGpGUtNKH6pczSM699rnDwViWi', 'owner2@gmail.com', 'OWNER', '2024-12-15 17:49:46', '2024-12-15 17:49:46'),
(105, 'Toto Tatin', '$2a$08$50rKbIJMGhgGUFq/A0Vjre63qUZXVXMfTHlBdlhpnRRrxf06DMgle', 'user@gmail.com', 'USER', '2024-12-26 18:31:37', '2024-12-26 18:31:37');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dishes`
--
ALTER TABLE `dishes`
  ADD CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_10` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_11` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_12` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_2` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_3` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_4` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_5` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_6` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_7` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_8` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dishes_ibfk_9` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderdish`
--
ALTER TABLE `orderdish`
  ADD CONSTRAINT `orderdish_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdish_ibfk_2` FOREIGN KEY (`dishId`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_10` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_12` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_14` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_16` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_18` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_19` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_9` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Orders_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_10` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_11` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_12` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_13` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_2` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_3` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_4` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_5` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_6` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_7` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_8` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurants_ibfk_9` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
