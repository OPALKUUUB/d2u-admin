const conn = require("../connection");
// const connectionRequest = require("../connectionRequest");

function isEmpty(value) {
  return value === "";
}

function query(sql, data) {
  // let conn = connectionRequest();
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

exports.getUsers = async (req, res) => {
  const data = [
    "%" + req.query.username.trim() + "%", // username
    isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset), // offset
    isEmpty(req.query.item) ? 10 : parseInt(req.query.item), // item
  ];
  const sql = `
  select *
  from user_customers
  where username like ?
  order by created_at ${req.query.sort}
  limit ?, ?;
  `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      message: "GET /api/overview/users success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/overview/users fail👎",
    });
  }
};

exports.countUsers = (req, res) => {
  const sql = "select count(id) as count from user_customers;";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};

exports.patchUser = async (req, res) => {
  req.body.point_old = req.body.point_old === "" ? 0 : req.body.point_old;
  req.body.point_new = req.body.point_new === "" ? 0 : req.body.point_new;
  let data = [req.body, req.params.id];
  const sql = `
    update user_customers
    set ?
    where
    id = ?;
    `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    console.log(result);
    res.status(200).json({
      status: true,
      message: "PATCH /api/overview/users success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/overview/users fail👎",
    });
    console.log(error);
  }
};

exports.getUsers_autocomplete = async (req, res) => {
  const data = [
    // "%" + req.query.username.trim() + "%",
    // isEmpty(req.query.item) ? 10 : parseInt(req.query.item),
  ];
  const sql = `
  select id, username
  from user_customers
  `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      message: "GET /api/overview/users success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/overview/users fail👎",
    });
  }
};
