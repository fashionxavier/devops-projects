<?php
$host = "mysql-container";  // container name
$user = "testuser";
$password = "testpass";
$db = "testdb";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Database connection failed");
}
?>