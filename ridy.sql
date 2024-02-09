-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2024 at 10:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ridy`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `dr_id` int(11) NOT NULL,
  `dr_fname` text NOT NULL,
  `dr_lname` text NOT NULL,
  `dr_name` text NOT NULL,
  `dr_gender` enum('male','female','transgender') NOT NULL,
  `dr_pic` text NOT NULL,
  `dr_password` text NOT NULL,
  `dr_location` point NOT NULL,
  `dr_rating` float NOT NULL,
  `dr_lastlogin` datetime NOT NULL,
  `dr_carname` text NOT NULL,
  `dr_carmodel` varchar(200) NOT NULL,
  `dr_carcolour` varchar(50) NOT NULL,
  `dr_carregno` varchar(40) NOT NULL,
  `dr_cartype` int(11) NOT NULL,
  `dr_cnic` varchar(50) NOT NULL,
  `dr_status` enum('active','suspended','deleted') NOT NULL,
  `dr_ridestatus` enum('active','waiting','unavailable','inride') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rides`
--

CREATE TABLE `rides` (
  `r_id` int(11) NOT NULL,
  `r_cid` int(11) NOT NULL,
  `r_cloc` point NOT NULL,
  `r_spoint` point NOT NULL,
  `r_epoint` point NOT NULL,
  `r_distance` varchar(50) NOT NULL,
  `r_type` int(11) NOT NULL,
  `r_did` int(11) NOT NULL,
  `r_fare` varchar(50) NOT NULL,
  `r_crating` int(11) NOT NULL,
  `r_drating` int(11) NOT NULL,
  `r_status` enum('active','completed','cancelled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ride_type`
--

CREATE TABLE `ride_type` (
  `rt_id` int(11) NOT NULL,
  `rt_name` varchar(100) NOT NULL,
  `rt_companyshare` float NOT NULL,
  `rt_ridershare` float NOT NULL,
  `rt_petrolprice` varchar(10) NOT NULL,
  `rt_averagekmperliter` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(200) NOT NULL,
  `u_fname` varchar(200) NOT NULL,
  `u_lname` varchar(200) NOT NULL,
  `u_gender` enum('male','female','transgender') NOT NULL,
  `u_pic` text NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_password` varchar(500) NOT NULL,
  `u_loc` point NOT NULL,
  `u_status` enum('active','suspended','deleted','inride','calling') NOT NULL,
  `u_rating` float NOT NULL,
  `u_lastlogin` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_client_history`
--

CREATE TABLE `users_client_history` (
  `uch_id` int(11) NOT NULL,
  `uch_rideid` int(11) NOT NULL,
  `uch_cid` int(11) NOT NULL,
  `uch_ratingachieved` float NOT NULL,
  `uch_ratinggiven` float NOT NULL,
  `uch_spoint` point NOT NULL,
  `uch_epoint` point NOT NULL,
  `uch_slocation` text NOT NULL,
  `uch_elocation` text NOT NULL,
  `uch_rtype` varchar(50) NOT NULL,
  `uch_fare` varchar(50) NOT NULL,
  `uch_driver` int(11) NOT NULL,
  `uch_totaldistance` varchar(50) NOT NULL,
  `uch_ridestarttime` datetime NOT NULL DEFAULT current_timestamp(),
  `uch_rideendtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`dr_id`);

--
-- Indexes for table `rides`
--
ALTER TABLE `rides`
  ADD PRIMARY KEY (`r_id`);

--
-- Indexes for table `ride_type`
--
ALTER TABLE `ride_type`
  ADD PRIMARY KEY (`rt_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `users_client_history`
--
ALTER TABLE `users_client_history`
  ADD PRIMARY KEY (`uch_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rides`
--
ALTER TABLE `rides`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ride_type`
--
ALTER TABLE `ride_type`
  MODIFY `rt_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_client_history`
--
ALTER TABLE `users_client_history`
  MODIFY `uch_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
