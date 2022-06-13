const { conn, createConn } = require("../connection");

module.exports = function (sql, data) {
  conn.connect(function (err) {
    if (err) {
      conn = createConn();
      console.log("Reconnected 😎😎😎");
    } else {
      console.log("Connected 😎😎😎");
    }
  });

  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
};
