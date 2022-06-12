const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getAdmins = async (req, res) => {
  console.log("GET::/api/overview/users");
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
    const sql_role =
      "select username, role from user_admins where username = ?;";
    role = await query(sql_role, [res.locals.username]).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      role: role[0].role,
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
  console.log("GET::/api/overview/users/count");
  const sql = "select count(id) as count from user_admins;";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};

exports.patchAdmin = async (req, res) => {
  let data = [req.body, req.params.id];
  const sql = `
    update user_admins
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
      message: "PATCH /api/overview/admins success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/overview/admins fail👎",
    });
    console.log(error);
  }
};

exports.postAdmin = async (req, res) => {
  const data = [req.body.username, req.body.name, req.body.role];
  const sql = `
  insert into user_admins 
  (username, name, role)
  values (?,?,?);
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "POST /api/overview/admins success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "POST /api/overview/admins fail👎",
    });
  }
};
