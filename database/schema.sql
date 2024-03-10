-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mvp_habitat_connect
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts_payable`
--

DROP TABLE IF EXISTS `accounts_payable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_payable` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` char(100) NOT NULL,
  `invoice_date` date NOT NULL,
  `concept` char(180) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `number_of_transaction` int NOT NULL,
  `paid` tinyint NOT NULL,
  `id_bank_account` int NOT NULL,
  `id_provider_account` int NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  KEY `id_bank_account_idx` (`id_bank_account`),
  KEY `id_provider_account_idx` (`id_provider_account`),
  CONSTRAINT `id_bank_account` FOREIGN KEY (`id_bank_account`) REFERENCES `bank_accounts` (`account_id`),
  CONSTRAINT `id_provider_account` FOREIGN KEY (`id_provider_account`) REFERENCES `providers` (`provider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_payable`
--

LOCK TABLES `accounts_payable` WRITE;
/*!40000 ALTER TABLE `accounts_payable` DISABLE KEYS */;
INSERT INTO `accounts_payable` VALUES (1,'01000','2023-08-12','no concept',0,75,2,1,1),(2,'124231','2023-08-12','no concept',0,75,1,1,1),(3,'14231','2023-08-12','no concept',0,75,1,1,1),(4,'1234','2024-01-23','prueba',230,12,2,1,1),(5,'1111','2024-01-17','prueba',230,1234,2,2,1),(6,'2344','2024-01-25','prueba',230,123,1,2,1),(7,'2411','2024-01-26','prueba',230,123,1,2,1),(8,'43234','2024-01-25','prueba',120,11,2,1,2),(9,'4323','2024-01-25','prueba',120,12,1,1,2),(10,'123','2024-01-26','prueba',120,1,1,1,4),(11,'1244','2024-01-15','prueba',1233,123,1,2,7),(12,'124421','2024-02-01','prueba',1234,1234,2,1,11),(13,'12314','2024-02-01','no tiene',1234,1234,1,2,2),(14,'4434','2024-02-03','no tiene',1234,555,1,2,3);
/*!40000 ALTER TABLE `accounts_payable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `amenity_id` int NOT NULL,
  `amenity_name` char(50) NOT NULL,
  `rent_cost` char(6) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `additional_cost_per_hour` char(10) NOT NULL,
  `nickName` char(30) DEFAULT NULL,
  PRIMARY KEY (`amenity_id`),
  UNIQUE KEY `amenty_id_UNIQUE` (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'Deck Azotea','13.00','05:04:00','19:58:00','55.01','deck-azotea'),(2,'Sala de reuniones','123.06','02:05:00','23:59:00','110.99','bussines-center'),(3,'Salon social','122.99','08:30:00','22:05:00','323.01','social-hall');
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
INSERT INTO `apartament` VALUES (1,'1-2','FHA',1,'{\"sticker_a\": \"140181808\", \"sticker_b\": \"14016953\"}','{\"parking_cards\": \"\", \"parking_spaces\": [3, 4]}','FHA','0000-0000','FHA','0000-0000',1,1),(2,'1-3','Ingrid Johana Romero Escriba',1,'{\"sticker_a\": \"14042244\", \"sticker_b\": \"14016959\"}','{\"parking_cards\": {\"sticker_a\": \"10087\"}, \"parking_spaces\": [13, \"primer nivel\", 12, \"segundo nivel\"]}','Ingrid Johana Romero Escriba','5318-1736','Ingrid Johana Romero Escriba','5318-1736',2,1),(3,'1-4','Manuel Alexander Ortiz Moralez',1,'{\"sticker_a\": \"14021251\", \"sticker_b\": \"14010805\"}','{\"parking_cards\": {\"sticker_a\": \"18774\", \"sticker_b\": \"null\"}, \"parking_spaces\": [25, 26]}','Manuel Alexander Ortiz Moralez','5412-3338','Manuel Alexander Ortiz Moralez','5412-3338',3,1),(4,'1-5','Josue Miguel Ramirez Lemuz',1,'{\"sticker_a\": \"14011641\", \"sticker_b\": \"14012343\"}','{\"parking_cards\": {\"sticker_a\": \"21606\", \"sticker_b\": \"null\"}, \"parking_spaces\": [23, 24]}','Josue Miguel Ramirez Lemuz','5202-4692','Josue Miguel Ramirez Lemuz','5202-4692',3,1),(5,'1-7','Diego Armando Maldonado Contreras',1,'{\"sticker_a\": \"14025408\", \"sticker_b\": \"14024782\"}','{\"parking_cards\": {\"sticker_a\": \"21608\", \"sticker_b\": \"null\"}, \"parking_spaces\": [27, 28]}','Diego Armando Maldonado Contreras','4749-0349','Diego Armando Maldonado Contreras','4749-0349',1,1),(6,'2-1','Cesar Sanchez',2,'{\"sticker_a\": \"14007243\", \"sticker_b\": \"14035020\"}','{\"parking_cards\": {\"sticker_a\": \"10071\", \"sticker_b\": \"null\"}, \"parking_spaces\": [2]}','Cesar Sanchez','4392-5432','Cesar Sanchez','4392-5432',4,1),(7,'2-2','Evelyn Marisol TelloHerrera',2,'{\"sticker_a\": \"14021236\", \"sticker_b\": \"14036364\"}','{\"parking_cards\": {\"sticker_a\": \"47807\", \"sticker_b\": \"21610\"}, \"parking_spaces\": [19, 20]}','Evelyn Marisol TelloHerrera','5697-0812','Evelyn Marisol TelloHerrera','5697-0812',1,1),(8,'2-3','Karin A. Cano',2,'{\"sticker_a\": \"14016132\", \"sticker_b\": \"null\"}','{\"parking_cards\": {\"sticker_a\": \"10088\", \"sticker_b\": \"10089\"}, \"parking_spaces\": [1]}','Karin A. Cano','4038-1232','Karin A. Cano','4038-1232',2,1),(9,'2-4','Gustavo García Cortez',2,'{\"sticker_a\": \"14031311\", \"sticker_b\": \"14021201\"}','{\"parking_cards\": {\"sticker_a\": \"21613\", \"sticker_b\": \"21614\"}, \"parking_spaces\": [23, 24, \"Tercer nivel\"]}','Gustavo GarcíaCortez','4212-9878','Gustavo GarcíaCortez','4212-9878',3,1),(10,'2-5','Luis Alfredo corado Garcia; Nidia Mirela Aquino Donis de Corado',2,'{\"sticker_a\": \"14012534\", \"sticker_b\": \"14012356\"}','{\"parking_cards\": {\"sticker_a\": \"47809\", \"sticker_b\": \"47803\"}, \"parking_spaces\": [21, 22, \"Tercer nivel\"]}','Luis Alfredo corado Garcia; Nidia Mirela Aquino Donis de Corado','5630-5371','Luis Alfredo corado Garcia; Nidia Mirela Aquino Donis de Corado','5630-5371',3,1),(11,'2-6','Olga Hidalgo Motta; Monica Floridalma Hidalgo Motta',2,'{\"sticker_a\": \"14036544\", \"sticker_b\": \"14026898\"}','{\"parking_cards\": {\"sticker_a\": \"10067\", \"sticker_b\": \"47803\"}, \"parking_spaces\": [21, 22, \"Tercer nivel\"]}','Olga Hidalgo Motta; Monica Floridalma Hidalgo Motta','5030-3051','Olga Hidalgo Motta; Monica Floridalma Hidalgo Motta','5030-3051',2,1),(12,'2-7','Adiel Estuardo Orozco Lopez',2,'{\"sticker_a\": \"14021566\", \"sticker_b\": \"14022231\"}','{\"parking_cards\": {\"sticker_a\": \"21619\", \"sticker_b\": \"21618\"}, \"parking_spaces\": [17, 18, \"Tercer nivel\"]}','Adiel Estuardo Orozco Lopez','5018-1677','Adiel Estuardo Orozco Lopez','5018-1677',1,1);
/*!40000 ALTER TABLE `apartament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_accounts` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `bank` char(50) NOT NULL,
  `account_number` int NOT NULL,
  `type_account` char(50) NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_accounts`
--

LOCK TABLES `bank_accounts` WRITE;
/*!40000 ALTER TABLE `bank_accounts` DISABLE KEYS */;
INSERT INTO `bank_accounts` VALUES (1,'Banco industrial',232,'Monetaria'),(2,'Banco industrial',2345,'Monetaria');
/*!40000 ALTER TABLE `bank_accounts` ENABLE KEYS */;
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
-- Table structure for table `maintenance_record`
--

DROP TABLE IF EXISTS `maintenance_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance_record` (
  `record_id` int NOT NULL,
  `current_year` year NOT NULL,
  `january` json DEFAULT NULL,
  `february` json DEFAULT NULL,
  `march` json DEFAULT NULL,
  `april` json DEFAULT NULL,
  `may` json DEFAULT NULL,
  `june` json DEFAULT NULL,
  `juli` json DEFAULT NULL,
  `august` json DEFAULT NULL,
  `september` json DEFAULT NULL,
  `october` json DEFAULT NULL,
  `november` json DEFAULT NULL,
  `december` json DEFAULT NULL,
  `id_apartament_maintenance` int NOT NULL,
  PRIMARY KEY (`record_id`),
  UNIQUE KEY `record_id_UNIQUE` (`record_id`),
  KEY `id_apartament_maintenance` (`id_apartament_maintenance`),
  CONSTRAINT `id_apartament_maintenance` FOREIGN KEY (`id_apartament_maintenance`) REFERENCES `apartament` (`apartament_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance_record`
--

LOCK TABLES `maintenance_record` WRITE;
/*!40000 ALTER TABLE `maintenance_record` DISABLE KEYS */;
INSERT INTO `maintenance_record` VALUES (1,2023,'{\"date_paid\": \"2023-10-15\", \"paid_status\": \"1\"}','{\"date_paid\": \"2023-02-07\", \"paid_status\": 2}','{\"date_paid\": \"2023-10-15\", \"paid_status\": \"1\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `maintenance_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `provider_id` int NOT NULL AUTO_INCREMENT,
  `provider_name` char(75) NOT NULL,
  `phone_number` char(14) NOT NULL,
  `bank_account` int NOT NULL,
  `bank_name` char(50) NOT NULL,
  `type_account` char(25) NOT NULL,
  `payment_methods` char(50) NOT NULL,
  `service_description` char(150) NOT NULL,
  PRIMARY KEY (`provider_id`),
  UNIQUE KEY `provider_id_UNIQUE` (`provider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'Javier Alejandro','3333-2222',61123,'Banco rural','Ahorros','Contado o deposito','descripción'),(2,'Rodolfo cruz','1234-1235',1234355,'Banco industrial','Monetaria','Contado','descripción'),(3,'prueba','1234-4567',1234,'Banrural','Monetaria','efectivo','asdads'),(4,'Alejandro','3334-4443',1234,'ban rural','Monetaria','efectivo','sin descripcion'),(5,'Probando','3333-3333',123,'bi','ahorros','efectivo','no hay descripcion'),(6,'javier','1111-1111',123,'Banco industrial','monetaria','efectivo','no tiene'),(7,'Diego','3333-4444',1445,'banco industrial','monetaria','efectivo','no tiene'),(8,'kathy','2222-2222',1244,'banco industrial','monetaria','efectivo','asasdsd'),(9,'servicios','5555-5555',124,'bi','monetaria','efectivo','asdd'),(10,'alvaro','1112-1112',1234,'Banco agromercantil','ahorro','Depósito','no tiene'),(11,'Servicios de camara','4442-4442',413,'banco rural','monetaria','efectivo','afnasd'),(12,'camaras','1115-5551',3332,'banco industrial','monetaria','efectivo','qweqe'),(13,'servicio','3333-1111',124421,'Banco industrial','Monetaria','efectivo','qwewe'),(14,'servicioa','1112-2221',14532,'banco industrial','monetaria','efectivo','prueba de edicion  sisi'),(15,'Diego','1234-1234',1234567,'GYT','Monetaria','cheque','DDDDD');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (29,'2023-12-01','08:30:00','13:00:00','Javier Mendoza','1234-1234',1,2,1),(30,'2023-12-01','08:30:00','13:00:00','Javier Mendoza','1234-1234',1,2,2),(31,'2023-12-01','13:30:00','16:00:00','Javier Mendoza','1234-1234',1,2,1);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
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

--
-- Dumping routines for database 'mvp_habitat_connect'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-11 18:36:48
