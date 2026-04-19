<?php
$content = file_get_contents('index.sql');

$parts = explode('-- Database: `shop_db`', $content);

$part1 = $parts[0];
$part2 = $parts[1];

// Remove categories from part2
$part2 = preg_replace('/-- Table structure for table `categories`.*?-- Dumping data for table `categories`.*?;/s', '', $part2);
$part2 = preg_replace('/INSERT INTO `categories`.*?;/s', '', $part2);

// Remove migrations from part2
$part2 = preg_replace('/-- Table structure for table `migrations`.*?-- Dumping data for table `migrations`.*?;/s', '', $part2);
$part2 = preg_replace('/INSERT INTO `migrations`.*?;/s', '', $part2);

// Remove products from part2
$part2 = preg_replace('/-- Table structure for table `products`.*?-- Dumping data for table `products`.*?;/s', '', $part2);
$part2 = preg_replace('/INSERT INTO `products`.*?;/s', '', $part2);

// Remove users from part2
$part2 = preg_replace('/-- Table structure for table `users`.*/s', 'COMMIT;', $part2);

// Convert MyISAM to InnoDB
$part2 = str_replace('ENGINE=MyISAM', 'ENGINE=InnoDB', $part2);

$newContent = "SET FOREIGN_KEY_CHECKS = 0;\n" . $part1 . "-- Additional tables from trihaongocbich\n" . $part2 . "\nSET FOREIGN_KEY_CHECKS = 1;\n";

file_put_contents('index.sql', $newContent);
echo "Fixed index.sql\n";
?>
