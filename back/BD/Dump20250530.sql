CREATE DATABASE  IF NOT EXISTS `activeclassroom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `activeclassroom`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: activeclassroom
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `detalleparticipaciones`
--

DROP TABLE IF EXISTS `detalleparticipaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleparticipaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `iduser` int DEFAULT NULL,
  `idsala` int DEFAULT NULL,
  `calificacion` int DEFAULT NULL,
  `rutaresultados` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleparticipaciones`
--

LOCK TABLES `detalleparticipaciones` WRITE;
/*!40000 ALTER TABLE `detalleparticipaciones` DISABLE KEYS */;
INSERT INTO `detalleparticipaciones` VALUES (1,1,1111,7,'C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\resultados\\resultado_formulario_001_1111.json'),(2,2,1111,10,'C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\resultados\\resultado_formulario_002_1111.json'),(3,3,1111,0,'C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\resultados\\resultado_formulario_003_1111.json'),(4,1,123433,0,'C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\resultados\\resultado_formulario_001_123433.json');
/*!40000 ALTER TABLE `detalleparticipaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(60) DEFAULT NULL,
  `rutaform` varchar(255) DEFAULT NULL,
  `rutaformresult` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES (9,'Ejemplo','C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\formulario_123433_532.json',''),(10,'Ejemplo','C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\formulario_123433_813.json',''),(11,'Ejemplo','C:\\Users\\ruben\\Documents\\GitHub\\active-classroom\\back\\forms\\formulario_2312_294.json',''),(12,'A VER SI YA','C:\\Users\\JAVI_\\OneDrive\\Documentos\\GitHub\\active-classroom\\back\\forms\\formulario_2_980.json',''),(18,'PruebaCuestionario','C:\\Users\\JAVI_\\OneDrive\\Documentos\\GitHub\\active-classroom\\back\\forms\\formulario_2_219.json',''),(24,'Profes CETis','C:\\Users\\JAVI_\\OneDrive\\Documentos\\GitHub\\active-classroom\\back\\forms\\formulario_2_816.json',''),(25,'sdgds','C:\\Users\\JAVI_\\OneDrive\\Documentos\\GitHub\\active-classroom\\back\\forms\\formulario_2_954.json','');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `id` int NOT NULL,
  `idcreador` int DEFAULT NULL,
  `idformulario` int DEFAULT NULL,
  `fechacreacion` varchar(50) DEFAULT NULL,
  `fechacierre` varchar(20) DEFAULT NULL,
  `rankingruta` varchar(45) DEFAULT NULL,
  `cantparticipantes` int DEFAULT NULL,
  `activo` char(1) DEFAULT NULL,
  `clave` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clave` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (1111,2,11,'2025-04-16','','',1,'A',NULL),(17210,2,25,'2025-05-30','','',NULL,'A','EUHTOXVH'),(59003,2,24,'2025-05-30','','',NULL,'A','ACRW3HET'),(76556,2,18,'2025-05-29','','',NULL,'A',NULL),(96944,2,12,'2025-05-28','','',NULL,'A',NULL),(123433,3,9,'2025-04-15','','',0,'A',NULL);
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `tipousuario` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ruben','ruben@ruben','1234','1'),(2,'Manuel','manuel@manuel','1234','2'),(3,'Juan','Juan@manuel','1234','1'),(4,'Jose','jose@gmail.com','Jose_rafa2312','1'),(5,'Javier','javier@gmail.com','Javier123!','1'),(6,'Filiberto','fili@gmail.com','Fili_1234','1'),(7,'a','a@hotmail.com','Javier1234!','2'),(8,'prueba','prueba@hotmail.cm','Prueba1234!','1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_participantes`
--

DROP TABLE IF EXISTS `vista_participantes`;
/*!50001 DROP VIEW IF EXISTS `vista_participantes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_participantes` AS SELECT 
 1 AS `ID de sala`,
 1 AS `ID de formulario`,
 1 AS `ID participacion`,
 1 AS `Nombre participante`,
 1 AS `Calificacion`,
 1 AS `Ruta del resultado`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_salas`
--

DROP TABLE IF EXISTS `vista_salas`;
/*!50001 DROP VIEW IF EXISTS `vista_salas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_salas` AS SELECT 
 1 AS `Id de Sala`,
 1 AS `Id de creador`,
 1 AS `Nombre de creador`,
 1 AS `Id de formulario`,
 1 AS `Titulo de formulario`,
 1 AS `Ruta de formulario`,
 1 AS `Fecha de creacion`,
 1 AS `clave`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'activeclassroom'
--

--
-- Dumping routines for database 'activeclassroom'
--

--
-- Final view structure for view `vista_participantes`
--

/*!50001 DROP VIEW IF EXISTS `vista_participantes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_participantes` AS select `s`.`id` AS `ID de sala`,`s`.`idformulario` AS `ID de formulario`,`p`.`id` AS `ID participacion`,`u`.`username` AS `Nombre participante`,`p`.`calificacion` AS `Calificacion`,`p`.`rutaresultados` AS `Ruta del resultado` from ((`detalleparticipaciones` `p` join `sala` `s` on((`s`.`id` = `p`.`idsala`))) join `users` `u` on((`p`.`iduser` = `u`.`id`))) order by `s`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_salas`
--

/*!50001 DROP VIEW IF EXISTS `vista_salas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_salas` AS select `s`.`id` AS `Id de Sala`,`s`.`idcreador` AS `Id de creador`,`u`.`username` AS `Nombre de creador`,`f`.`id` AS `Id de formulario`,`f`.`titulo` AS `Titulo de formulario`,`f`.`rutaform` AS `Ruta de formulario`,`s`.`fechacreacion` AS `Fecha de creacion`,`s`.`clave` AS `clave` from ((`sala` `s` join `users` `u` on((`s`.`idcreador` = `u`.`id`))) join `formulario` `f` on((`s`.`idformulario` = `f`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30 12:53:46
