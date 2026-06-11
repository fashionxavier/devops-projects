const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootpassword",
  database: process.env.DB_NAME || "appdb"
});


function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error("DB connection failed, retrying in 5 seconds:", err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL");
    }
  });
}

connectWithRetry();

// Create users table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`);

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (results.length > 0) {
        res.send("Login successful!");
      } else {
        res.send("Invalid credentials.");
      }
    }
  );
});

// Create default user
db.query(
  "INSERT IGNORE INTO users (id, username, password) VALUES (1, 'admin', 'admin123')"
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
