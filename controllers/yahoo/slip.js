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

exports.getSlip = async (req, res) => {
  console.log(res.locals);
  const data = [req.params.id];
  const sql = `
    select *
    from payments
    where id = ?;
    `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows[0],
      message: "GET /api/yahoo/slip/:id success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/yahoo/slip/:id fail👎",
    });
  }
};

exports.patchSlip = async (req, res) => {
  let data = [req.body, req.params.id];
  const sql = `
  update payments
  set ?
  where id = ?;
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "PATCH /api/yahoo/slip/:id success👍",
    });
    console.log(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/yahoo/slip/:id fail👎",
    });
    console.log(error);
  }
};
