CREATE DATABASE  IF NOT EXISTS `mvp_habitat_connect` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mvp_habitat_connect`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mvp_habitat_connect
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `amenity_id` int NOT NULL,
  `amenity_name` char(50) NOT NULL,
  `rent_cost` char(6) NOT NULL DEFAULT '0.00',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `additional_cost_per_hour` char(10) NOT NULL DEFAULT '0.00',
  `nickName` char(30) NOT NULL,
  `time_limit` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`amenity_id`),
  UNIQUE KEY `amenty_id_UNIQUE` (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartament`
--

DROP TABLE IF EXISTS `apartament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartament` (
  `apartament_id` int NOT NULL,
  `apartament_number` char(5) NOT NULL,
  `apartament_name` char(65) NOT NULL,
  `apartament_level` int NOT NULL,
  `pedestrian_cards` json NOT NULL,
  `parking_data` json NOT NULL,
  `tenant_name` char(65) NOT NULL,
  `phone_number_tenant` char(15) NOT NULL,
  `landlord_name` char(75) NOT NULL,
  `phone_number_landlord` char(15) NOT NULL,
  `id_features_apartament` int NOT NULL,
  `ocupation_state` tinyint DEFAULT NULL,
  PRIMARY KEY (`apartament_id`),
  UNIQUE KEY `apartament_id_UNIQUE` (`apartament_id`),
  UNIQUE KEY `apartament_number_UNIQUE` (`apartament_number`),
  UNIQUE KEY `phone_number_tenant_UNIQUE` (`phone_number_tenant`),
  UNIQUE KEY `phone_number_landlord_UNIQUE` (`phone_number_landlord`),
  KEY `id_features_apartament_idx` (`id_features_apartament`),
  CONSTRAINT `id_features_apartament` FOREIGN KEY (`id_features_apartament`) REFERENCES `features_apartaments` (`feature_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartament`
--

LOCK TABLES `apartament` WRITE;
/*!40000 ALTER TABLE `apartament` DISABLE KEYS */;
INSERT INTO `apartament` VALUES (1,'1-2','FHA',1,'{\"sticker_a\": \"140181808\", \"sticker_b\": \"14016953\"}','{\"parking_cards\": \"\", \"parking_spaces\": [3, 4]}','FHA','0000-0000','FHA','0000-0000',1,1),(2,'1-3','Ingrid Johana Escriba',1,'{\"sticker_1\": \"14042244\", \"sticker_2\": \"14016959\"}','{\"parking_cards\": {\"sticker_1\": \"10087\", \"sticker_2\": \"214325\", \"sticker_3\": \"214345\"}, \"parking_spaces\": [\"13\", \"primer nivel\", \"12\", \"segundo nivel\"]}','Ingrid Johana Escriba','3456-2349','Ingrid Johana Escriba','5687-8900',2,1),(3,'1-4','Manuel Alexander Ortiz Moralez',1,'{\"sticker_a\": \"14021251\", \"sticker_b\": \"14010805\"}','{\"parking_cards\": {\"sticker_a\": \"18774\", \"sticker_b\": \"null\"}, \"parking_spaces\": [25, 26]}','Manuel Alexander Ortiz Moralez','5412-3338','Manuel Alexander Ortiz Moralez','5412-3338',3,1),(4,'1-5','Josue Miguel Ramirez Lemuz',1,'{\"sticker_a\": \"14011641\", \"sticker_b\": \"14012343\"}','{\"parking_cards\": {\"sticker_a\": \"21606\", \"sticker_b\": \"null\"}, \"parking_spaces\": [23, 24]}','Josue Miguel Ramirez Lemuz','5202-4692','Josue Miguel Ramirez Lemuz','5202-4692',3,1),(5,'1-7','Diego Armando Maldonado Contreras',1,'{\"sticker_a\": \"14025408\", \"sticker_b\": \"14024782\"}','{\"parking_cards\": {\"sticker_a\": \"21608\", \"sticker_b\": \"null\"}, \"parking_spaces\": [27, 28]}','Diego Armando Maldonado Contreras','4749-0349','Diego Armando Maldonado Contreras','4749-0349',1,1),(6,'2-1','Cesar Sanchez',2,'{\"sticker_a\": \"14007243\", \"sticker_b\": \"14035020\"}','{\"parking_cards\": {\"sticker_a\": \"10071\", \"sticker_b\": \"null\"}, \"parking_spaces\": [2]}','Cesar Sanchez','4392-5432','Cesar Sanchez','4392-5432',4,1),(7,'2-2','Evelyn Marisol TelloHerrera',2,'{\"sticker_a\": \"14021236\", \"sticker_b\": \"14036364\"}','{\"parking_cards\": {\"sticker_a\": \"47807\", \"sticker_b\": \"21610\"}, \"parking_spaces\": [19, 20]}','Evelyn Marisol TelloHerrera','5697-0812','Evelyn Marisol TelloHerrera','5697-0812',1,1),(8,'2-3','Karin A. Cano',2,'{\"sticker_a\": \"14016132\", \"sticker_b\": \"null\"}','{\"parking_cards\": {\"sticker_a\": \"10088\", \"sticker_b\": \"10089\"}, \"parking_spaces\": [1]}','Karin A. Cano','4038-1232','Karin A. Cano','4038-1232',2,1),(9,'2-4','Gustavo García Cortez',2,'{\"sticker_a\": \"14031311\", \"sticker_b\": \"14021201\"}','{\"parking_cards\": {\"sticker_a\": \"21613\", \"sticker_b\": \"21614\"}, \"parking_spaces\": [23, 24, \"Tercer nivel\"]}','Gustavo GarcíaCortez','4212-9878','Gustavo GarcíaCortez','4212-9878',3,1),(10,'2-5','Luis Alfredo corado Garcia; Nidia Mirela Aquino Donis de Corado',2,'{\"sticker_a\": \"14012534\", \"sticker_b\": \"14012356\"}','{\"parking_cards\": {\"sticker_a\": \"47809\", \"sticker_b\": \"47803\"}, \"parking_spaces\": [21, 22, \"Tercer nivel\"]}','Luis Alfredo corado Garcia; Nidia Mirela Aquino Donis de Corado','5630-5371','Luis Alfredo corado Garcia; Nidia Mirela Aquino Donis de Corado','5630-5371',3,1),(11,'2-6','Olga Hidalgo Motta; Monica Floridalma Hidalgo Motta',2,'{\"sticker_a\": \"14036544\", \"sticker_b\": \"14026898\"}','{\"parking_cards\": {\"sticker_a\": \"10067\", \"sticker_b\": \"47803\"}, \"parking_spaces\": [21, 22, \"Tercer nivel\"]}','Olga Hidalgo Motta; Monica Floridalma Hidalgo Motta','5030-3051','Olga Hidalgo Motta; Monica Floridalma Hidalgo Motta','5030-3051',2,1),(12,'2-7','Adiel Estuardo Orozco Lopez',2,'{\"sticker_a\": \"14021566\", \"sticker_b\": \"14022231\"}','{\"parking_cards\": {\"sticker_a\": \"21619\", \"sticker_b\": \"21618\"}, \"parking_spaces\": [17, 18, \"Tercer nivel\"]}','Adiel Estuardo Orozco Lopez','5018-1677','Adiel Estuardo Orozco Lopez','5018-1677',1,1);
/*!40000 ALTER TABLE `apartament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartament_employee`
--

DROP TABLE IF EXISTS `apartament_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartament_employee` (
  `apt_employee_id` int NOT NULL AUTO_INCREMENT,
  `name` char(55) NOT NULL,
  `lastname` char(55) NOT NULL,
  `dpi` char(15) NOT NULL,
  `phone_number` char(14) NOT NULL,
  `boss_name` char(65) NOT NULL,
  `boss_phone_1` char(14) NOT NULL,
  `boss_phone_2` char(14) DEFAULT NULL,
  `id_employee_apartament` int NOT NULL,
  PRIMARY KEY (`apt_employee_id`),
  UNIQUE KEY `apt_employee_id_UNIQUE` (`apt_employee_id`),
  UNIQUE KEY `dpi_UNIQUE` (`dpi`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  KEY `id_employee_apartament` (`id_employee_apartament`),
  CONSTRAINT `id_employee_apartament` FOREIGN KEY (`id_employee_apartament`) REFERENCES `apartament` (`apartament_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartament_employee`
--

LOCK TABLES `apartament_employee` WRITE;
/*!40000 ALTER TABLE `apartament_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `apartament_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features_apartaments`
--

DROP TABLE IF EXISTS `features_apartaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features_apartaments` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `area` char(10) NOT NULL,
  `maintenance_fee` decimal(10,2) NOT NULL,
  `late_fee` decimal(10,2) NOT NULL,
  PRIMARY KEY (`feature_id`),
  UNIQUE KEY `feature_id_UNIQUE` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features_apartaments`
--

LOCK TABLES `features_apartaments` WRITE;
/*!40000 ALTER TABLE `features_apartaments` DISABLE KEYS */;
INSERT INTO `features_apartaments` VALUES (1,'71',1061.00,300.00),(2,'51',790.00,200.00),(3,'75',1144.00,375.00),(4,'37',550.00,150.00);
/*!40000 ALTER TABLE `features_apartaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_visit`
--

DROP TABLE IF EXISTS `home_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_visit` (
  `home_visit_id` int NOT NULL AUTO_INCREMENT,
  `resident_name` char(75) NOT NULL,
  `visitors_name` char(75) NOT NULL,
  `dpi` char(15) NOT NULL,
  `start_visit_time` datetime NOT NULL,
  `end_visit_time` datetime NOT NULL,
  `id_visit_creator` int NOT NULL,
  `id_apartament_visit` int NOT NULL,
  PRIMARY KEY (`home_visit_id`),
  UNIQUE KEY `home_visit_id_UNIQUE` (`home_visit_id`),
  KEY `id_visit_creator_idx` (`id_visit_creator`),
  KEY `id_apartament_visit` (`id_apartament_visit`),
  CONSTRAINT `id_apartament_visit` FOREIGN KEY (`id_apartament_visit`) REFERENCES `apartament` (`apartament_id`),
  CONSTRAINT `id_visit_creator` FOREIGN KEY (`id_visit_creator`) REFERENCES `security_user` (`security_user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_visit`
--

LOCK TABLES `home_visit` WRITE;
/*!40000 ALTER TABLE `home_visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_delivery`
--

DROP TABLE IF EXISTS `package_delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_delivery` (
  `package_delivery_id` int NOT NULL AUTO_INCREMENT,
  `residents_name` char(75) NOT NULL,
  `company_name` char(65) NOT NULL,
  `delivery_time` datetime NOT NULL,
  `id_package_recipient` int NOT NULL,
  `id_delivery_creator` int NOT NULL,
  `id_apartament_package` int NOT NULL,
  PRIMARY KEY (`package_delivery_id`),
  UNIQUE KEY `package_delivery_UNIQUE` (`package_delivery_id`),
  KEY `id_package_recipient_idx` (`id_package_recipient`),
  KEY `id_delivery_creator_idx` (`id_delivery_creator`),
  KEY `id_apartament_package` (`id_apartament_package`),
  CONSTRAINT `id_apartament_package` FOREIGN KEY (`id_apartament_package`) REFERENCES `apartament` (`apartament_id`),
  CONSTRAINT `id_delivery_creator` FOREIGN KEY (`id_delivery_creator`) REFERENCES `security_user` (`security_user_id`),
  CONSTRAINT `id_package_recipient` FOREIGN KEY (`id_package_recipient`) REFERENCES `security_user` (`security_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_delivery`
--

LOCK TABLES `package_delivery` WRITE;
/*!40000 ALTER TABLE `package_delivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `package_delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reserv_id` int NOT NULL AUTO_INCREMENT,
  `reservation_date` date NOT NULL,
  `start_reserv_time` time NOT NULL,
  `end_reserv_time` time NOT NULL,
  `renter_name` char(65) NOT NULL,
  `renter_phone` char(14) NOT NULL,
  `reserv_state` tinyint NOT NULL,
  `id_apartament_reservations` int NOT NULL,
  `id_amenity_reserved` int NOT NULL,
  PRIMARY KEY (`reserv_id`),
  UNIQUE KEY `reserv_id_UNIQUE` (`reserv_id`),
  KEY `id_apartament_reservations` (`id_apartament_reservations`),
  KEY `id_amenity_reserved_idx` (`id_amenity_reserved`),
  CONSTRAINT `id_amenity_reserved` FOREIGN KEY (`id_amenity_reserved`) REFERENCES `amenities` (`amenity_id`),
  CONSTRAINT `id_apartament_reservations` FOREIGN KEY (`id_apartament_reservations`) REFERENCES `apartament` (`apartament_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_user`
--

DROP TABLE IF EXISTS `security_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_user` (
  `security_user_id` int NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `lastname` char(55) NOT NULL,
  `email` char(65) NOT NULL,
  `password` char(150) NOT NULL,
  `user_type` char(10) NOT NULL,
  PRIMARY KEY (`security_user_id`),
  UNIQUE KEY `security_user_UNIQUE` (`security_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_user`
--

LOCK TABLES `security_user` WRITE;
/*!40000 ALTER TABLE `security_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `security_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_type` char(20) NOT NULL,
  `name` char(55) NOT NULL,
  `lastname` char(55) NOT NULL,
  `email` char(75) NOT NULL,
  `phone_number` char(14) NOT NULL,
  `dpi` char(15) NOT NULL,
  `password` char(150) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id_user_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `dpi_UNIQUE` (`dpi`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','Alejandro','Roche','adminprimium@gmail.com','4702 9314','2295-50800-0000','$2b$10$0BZuKWkr5jfwbE3zJQALj.hv1sKd17IseaLxNOfyQdhROXk/wW/p.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 22:05:54
