-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 26-Nov-2019 às 16:30
-- Versão do servidor: 5.7.28-0ubuntu0.16.04.2
-- PHP Version: 7.0.33-0ubuntu0.16.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `annelenersolar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `geracao_distribuida`
--

CREATE TABLE `geracao_distribuida` (
  `id` int(110) NOT NULL,
  `distribuidora` varchar(200) NOT NULL,
  `codigo` varchar(35) NOT NULL,
  `titular` varchar(100) NOT NULL,
  `classe` varchar(20) NOT NULL,
  `subgrupo` varchar(10) NOT NULL,
  `modalidade` varchar(25) NOT NULL,
  `credito` int(3) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cep` varchar(11) NOT NULL,
  `data` date NOT NULL,
  `fonte` varchar(20) NOT NULL,
  `potencia` double(8,2) DEFAULT NULL,
  `modulos` int(4) NOT NULL,
  `inversores` int(3) NOT NULL,
  `arranjo` double(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `geracao_distribuida`
--
ALTER TABLE `geracao_distribuida`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `geracao_distribuida`
--
ALTER TABLE `geracao_distribuida`
  MODIFY `id` int(110) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
