const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

function createConn() {
  return mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
    multipleStatements: true,
  });
}
let conn = createConn();

conn.connect(function (err) {
  if (err) {
    conn = createConn();
    console.log("Reconnected 😎😎😎");
  } else {
    console.log("Connected 😎😎😎");
  }
});

module.exports = conn;
