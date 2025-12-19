-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: portfolio_db
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `middle_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobile_number` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Bob',NULL,'Johnson','bob.j@testdb.com',NULL,NULL,'2025-12-16 12:30:03','2025-12-16 12:30:03'),(2,'Charlie',NULL,'Brown','charlie.b@testdb.com',NULL,NULL,'2025-12-16 12:30:24','2025-12-16 12:30:24');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_address`
--

DROP TABLE IF EXISTS `account_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_address` (
  `account_id` int NOT NULL,
  `address_id` int NOT NULL,
  PRIMARY KEY (`account_id`,`address_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `account_address_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `account_address_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_address`
--

LOCK TABLES `account_address` WRITE;
/*!40000 ALTER TABLE `account_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_assignment`
--

DROP TABLE IF EXISTS `account_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_assignment` (
  `account_id` int NOT NULL,
  `department_id` int NOT NULL,
  `position_id` int NOT NULL,
  PRIMARY KEY (`account_id`,`department_id`,`position_id`),
  KEY `department_id` (`department_id`),
  KEY `position_id` (`position_id`),
  CONSTRAINT `account_assignment_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `account_assignment_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  CONSTRAINT `account_assignment_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_assignment`
--

LOCK TABLES `account_assignment` WRITE;
/*!40000 ALTER TABLE `account_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_role`
--

DROP TABLE IF EXISTS `account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_role` (
  `account_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`account_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `account_role_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `account_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_role`
--

LOCK TABLES `account_role` WRITE;
/*!40000 ALTER TABLE `account_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zip_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `region` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `barangay` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `building_number` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_profile`
--

DROP TABLE IF EXISTS `admin_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_profile` (
  `account_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `position_id` int DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `department_id` (`department_id`),
  KEY `position_id` (`position_id`),
  CONSTRAINT `admin_profile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_profile_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_profile_ibfk_4` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_profile`
--

LOCK TABLES `admin_profile` WRITE;
/*!40000 ALTER TABLE `admin_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `purpose` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('pending','confirmed','rejected','expired') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment_participant`
--

DROP TABLE IF EXISTS `appointment_participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_participant` (
  `appointment_id` int NOT NULL,
  `account_id` int NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`appointment_id`,`account_id`),
  KEY `account_id` (`account_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `appointment_participant_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointment_participant_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointment_participant_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_participant`
--

LOCK TABLES `appointment_participant` WRITE;
/*!40000 ALTER TABLE `appointment_participant` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment_participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `certificate_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `account_id` int DEFAULT NULL,
  `certificate_subtype_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `certificate_subtype_id` (`certificate_subtype_id`),
  CONSTRAINT `certificate_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `certificate_ibfk_2` FOREIGN KEY (`certificate_subtype_id`) REFERENCES `certificate_subtype` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate_subtype`
--

DROP TABLE IF EXISTS `certificate_subtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate_subtype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `certificate_subtype_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `certificate_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certificate_type_id` (`certificate_type_id`),
  CONSTRAINT `certificate_subtype_ibfk_1` FOREIGN KEY (`certificate_type_id`) REFERENCES `certificate_type` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_subtype`
--

LOCK TABLES `certificate_subtype` WRITE;
/*!40000 ALTER TABLE `certificate_subtype` DISABLE KEYS */;
INSERT INTO `certificate_subtype` VALUES (1,'HEALTH CHECK',1),(2,'VACCINATION',1),(3,'MEDICAL CERTIFICATE',1),(4,'PRE-EMPLOYMENT MEDICAL EXAMINATION',1),(5,'FITNESS FOR SEA SERVICE',1),(6,'HEALTH INSURANCE',1),(7,'WORKSHOP',2),(8,'CERTIFICATION',2),(9,'SEAMAN TRAINING I',2),(10,'LEADERSHIP TRAINING I',2),(11,'SEAMAN TRAINING II',2),(12,'LEADERSHIP TRAINING II',2),(13,'LEADERSHIP TRAINING III',2),(14,'SAFETY CERTIFECATES / BASIC SAFETY TRAINING & CROWD MANAGEMENT',2),(15,'DECK CADET',2),(16,' ENGINE CADET TRAINING',2),(17,'BRM (BRIDGE RESOURCE MANAGEMENT)',2),(18,'ERM (ENGINE ROOM RESOURCE MANAGEMENT)',2),(19,'RADAR / ARPA / ECDIS',2),(20,'LNG CARRIER OPERATIONS',2),(21,'OIL TANKER FAMILIARIZATION',2),(22,'LEADERSHIP & TEAMWORK',2),(23,'CULTURAL BRIEFING',3),(24,'FINANCIAL LITERACY',3),(25,'SEAFARER SAFETY AWARENESS',3),(26,'SHIPBOARD EMERGENCY PROCEDURES',3),(27,'SEXUAL HARASSMENT AWARENESS',3),(28,'COVID PROTOCOL PROTECTION',3),(29,'PASSPORT',4),(30,'ID CARD',4),(31,'CONTRACT',4),(32,'PRE-EMPLOYMENT ORIENTATION SEMINAR (PEOS)',4),(33,'SEAMAN BOOK',4),(34,'CONTRACT OF EMPLOYMENT',4),(35,'CREW ID-CARD',4),(36,'C1/D VISA',4),(37,'CRIMINAL RECORD CERTIFICATE',4),(38,'SEA SERVICE RECORD',4),(39,'INTERNATIONAL SHIP SAFETY EQUIPMENT CERTIFICATE',5),(40,'MINIMUM SAFE MANNING CERTIFICATE',5),(41,'INTERNATIONAL SHIP CONSTRUCTION CERTIFICATE',5),(42,'PASSENGER SHIP SAFETY CERTIFICATE',5),(43,'CARGO SHIP SAFETY CERTIFICATE',5),(44,'CARGO SHIP SAFETY CONSTRUCTION CERTIFICATE',5),(45,'CARGO SHIP SAFETY EQUIPMENT CERTIFICATE',5),(46,'CARGO SHIP SAFETY RADIO CERTIFICATE',5),(47,'INTERNATIONAL TONNAGE CERTIFICATE',5),(48,'INTERNATIONAL LOAD LINE CERTIFICATE',5),(49,'SAFETY MANAGEMENT CERTIFICATE',5),(50,'SHIP SECURITY CERTIFICATE',5),(51,'INTERNATIONAL OIL POLLUTION PREVENTION CERTIFICATE',5),(52,'INTERNATIONAL SEWAGE POLLUTION PREVENTION CERTIFICATE',5),(53,'INTERNATIONAL AIR POLLUTION PREVENTION CERTIFICATE',5),(54,'PST (PERSONAL SURVIVAL TECHNIQUES)',5),(55,'FPFF (FIRE PREVENTION AND FIRE FIGHTING)',5),(56,'EFA (ELEMENTARY FIRST AID)',5),(57,'PSSR (PERSONAL SAFETY AND SOCIAL RESPONSIBILITY)',5),(58,'SECURITY AWARENESS',5),(59,'ADVANCED FIRE FIGHTING',5),(60,'PSCRB (RESCUE BOATS)',5),(61,'ENCLOSED SPACE RESCUE',5),(62,'HUET (HELICOPTER ESCAPE)',5),(63,'STCW BASIC SAFETY TRAINING',6),(64,'STCW PROFICIENCY IN SURVIVAL CRAFT AND RESCUE BOATS',6),(65,'STCW PROFICIENCY IN FAST RESCUE BOATS',6),(66,'STCW PROFICIENCY IN DESIGNATED SECURITY DUTIES',6),(67,'STCW PROFICIENCY IN SECURITY AWARENESS',6),(68,'STCW PROFICIENCY IN CRISIS MANAGEMENT AND HUMAN BEHAVIOR',6),(69,'STCW PROFICIENCY IN ADVANCED FIRE FIGHTING',6),(70,'STCW PROFICIENCY IN MEDICAL FIRST AID',6),(71,'ABLE SEAMAN — UNLIMITED',7),(72,'ABLE SEAMAN — LIMITED',7),(73,'ABLE SEAMAN',7),(74,'STCW BASIC SAFETY (PST, FPFF, EFA, PSSR)',7),(75,'WATCHKEEPING CERTIFICATE',7),(76,'CROWD MANAGEMENT & CRISIS CONTROL',7),(77,'RADAR NAVIGATION & COLLISION AVOIDANCE',7),(78,'SHIP SECURITY AWARENESS',7),(79,'OTHERS',7);
/*!40000 ALTER TABLE `certificate_subtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate_type`
--

DROP TABLE IF EXISTS `certificate_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `certificate_type_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_type`
--

LOCK TABLES `certificate_type` WRITE;
/*!40000 ALTER TABLE `certificate_type` DISABLE KEYS */;
INSERT INTO `certificate_type` VALUES (1,'MEDICAL'),(2,'TRAINING'),(3,'PDOS'),(4,'EMPLOYMENT DOCUMENT'),(5,'SOLAS'),(6,'STCW CERTIFICATION'),(7,'SEAMAN PASSPORT');
/*!40000 ALTER TABLE `certificate_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'RECRUITMENT'),(2,'CREWING (MDM FLEET)'),(3,'CREWING (MTM FLEET)'),(4,'CREWING (MGM FLEET)'),(5,'ADMINISTRATION'),(6,'TRAINING'),(7,'MEDICAL'),(8,'SUPPORT'),(9,'ACCOUNTING'),(10,'AUDITOR');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_12_13_062800_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_position_department` (`department_id`),
  CONSTRAINT `fk_position_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'SENIOR RECRUITMENT OFFICER',1),(2,'RECRUITMENT OFFICER',1),(3,'RECRUITMENT ASSISTANT',1),(4,'FLEET CREW MANAGER',2),(5,'CREW OPERATOR',2),(6,'FLEET CREW MANAGER',3),(7,'SENIOR CREW OPERATOR',3),(8,'CREW OPERATOR',3),(9,'FLEET CREW MANAGER',4),(10,'SENIOR CREW OPERATOR',4),(11,'CREW OPERATOR',4),(12,'ADMINISTRATIVE MANAGER',5),(13,'ADMINISTRATIVE OFFICER',5),(14,'LIASON OFFICER',5),(15,'CREW OPERATOR',5),(16,'TRAINING MANAGER',6),(17,'TRAINING AND CAREER DEVELOPMENT OFFIVER',6),(18,'TRAINING OFFICER',6),(19,'FLEET MEDICAL ADVISOR',7),(20,'MEDICAL COORDINATOR',7),(21,'DEPUTY DPO',8),(22,'IT OFFICER',8),(23,'CHIEF ACCOUNTING OFFICER',9),(24,'AUDIT ASSISTANT',9),(25,'ALLOTMENT OFFICER',9),(26,'DISTRIBUTEMENT OFFICER',9),(27,'BILLING OFFICER',9),(28,'PAYROLL OFFICER',9),(29,'GENERAL ACCOUNTANT',9),(30,'INTERNAL AUDITOR',10);
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'admin'),(3,'superadmin'),(1,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('5P61sj72NQaDKn4Jvgp6nHCOmCMKOlJsoE8yzDG7',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFFicXM0OE1GVzQ2NTBJZ0lMNHhRZXV2R29zMEYya2ZaRFluOWlCUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765885727),('8a6LV3lymP9mFpPwmPnNJvnmZl5VKmo5iL3MhkXv',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUVTSjh6UER4T3JxVm5tOGRmT09RejJHZkJBMGxmeXRzcFhFWld3eiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765888325),('8t9wchWxCK45lAfP7qxHtEkGtwFzszLchh8MXCX0',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTko3UHdLblpvaEtUWW9pUnF6Nm9jc3lHc0c0SDZsVHc2b1d0TkZIYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765886511),('aWhhVixQ0fmOn2fhSIBGWC0v3cxmtoSPl8pFzH6l',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ3d3WkJhUnVvTGN4TUFONEN5aFdJczVpa0V2ZTdMb3VQYmRTVEdnbiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765886130),('C6j6S12ZRMZj7o7FjNfxOXkIbt5pxl2L8S388kCD',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWVwMDFEakdvVXZ4alI3SnRYeXVrZVZSU0xEbEhmY3dwcEtLQ0IyYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765888322),('cj5kmg1pybYd2vAYPkDN7wWAWpAgSgHtMIs9VFLV',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMU1XTGlzbngzV013ZWJMZjY0TW9ZTTNHZW8zcHV5Mkt2RmxUSkk3YSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765886359),('lej7SrmBhWXgJlIip8l2DD3fobgdgObkKxNkjB52',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1FSeUhuRGtmZkpBc3NkWFJNQTVSbDRlTjZkNzhMeTRHYm03SFlFbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765886342),('MeexgI3VHarQSeBdHL3Y8uAQw6oDYN95aQEkCvLq',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM3ZlbjdadzZVTVZ1bUJnWjRGcENHTmFlaXpJUlM1bUpLZ241NXJGNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765886005),('shLWQGq4DWn9SUOCyC0o5O15tlhJY2Eni4T9omzx',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiczNOZmdDNHAzT2h3RzRaRkUwOER1QlNTUjVHVkRnRDRWbVR6Q0dkeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYmNvbm4iO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1765886340);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `account_id` int NOT NULL,
  `gender` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `civil_status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-17  9:39:56
