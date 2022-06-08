// const conn = require("../connection");
const connectionRequest = require("../connectionRequest");

function isEmpty(value) {
  return value === "";
}

function query(sql, data) {
  let conn = connectionRequest();
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

exports.getHistory = async (req, res) => {
  const data = [
    isEmpty(req.query.status) ? "Auction" : req.query.status.trim(), // status
    "%" + req.query.date.trim() + "%",
    "%" + req.query.username.trim() + "%", // username
    isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset), // offset
    isEmpty(req.query.item) ? 10 : parseInt(req.query.item), // item
  ];
  const sql = `
    select *
    from orders
    where
    status ${req.query.status === "" ? "!=" : "="} ? and
    created_at like ? and
    username like ?
    order by
    created_at desc
    limit ?, ?;
    `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      message: "GET /api/yahoo/historys success👍",
    });
    // console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/yahoo/historys fail👎",
    });
  }
};

exports.getHistoryItem = async (req, res) => {
  const id = req.params.id;
  const sql = `
    select
    orders.*,
    payments.slip_image_filename as slip,
    payments.price
    from orders
    inner join payments on orders.payment_id = payments.id
    where orders.id = ?;
    `;
  let data = [id];
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    console.log(rows);
    res.status(200).json({
      status: true,
      data: rows[0],
      message: "GET /api/yahoo/historys/:id success👍",
    });
    // console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/yahoo/historys/:id fail👎",
    });
  }
};
