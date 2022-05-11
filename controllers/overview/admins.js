const conn = require("../connection");

function isEmpty(value) {
  return value === "";
}

function query(sql, data) {
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

exports.getAdmins = async (req, res) => {
  const data = [
    "%" + req.query.username.trim() + "%", // username
    isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset), // offset
    isEmpty(req.query.item) ? 10 : parseInt(req.query.item), // item
  ];
  const sql = `
  select *
  from user_admins
  where username like ?
  limit ?, ?;
  `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      message: "GET /api/overview/admins success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/overview/admins fail👎",
    });
  }
};

exports.countAdmins = (req, res) => {
  const sql = "select count(id) as count from user_admins;";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};
