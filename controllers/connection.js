const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const conn = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected 😎😎😎");
});

module.exports = conn;
