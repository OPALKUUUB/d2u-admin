const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getPayment = async (req, res) => {
  console.log(res.locals);
  const data = [
    "%" + req.query.date.trim() + "%",
    "%" + req.query.username.trim() + "%", // username
    isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset), // offset
    isEmpty(req.query.item) ? 10 : parseInt(req.query.item), // item
  ];
  const sql = `
  select *
  from orders
  where
  status like 'win' and
  (
  payment_status like 'pending1' or
  payment_status like 'pending2' or
  payment_status like 'pending3'
  ) and
  created_at like ? and
  username like ?
  order by created_at desc
  limit ?, ?;
  `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    const sql_yen_rate = "select yen from config;";
    yens = await query(sql_yen_rate).then((res) => res);
    let yen = yens[0].yen;
    res.status(200).json({
      status: true,
      data: rows,
      yen: yen,
      message: "GET /api/yahoo/payments success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/yahoo/payments fail👎",
    });
  }
};

exports.patchPayment = async (req, res) => {
  let data = [req.body, req.query.id];
  const sql = `
  update orders
  set ?
  where id = ?;
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "PATCH /api/yahoo/payments success👍",
    });
    console.log(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/yahoo/payments fail👎",
    });
    console.log(error);
  }
};
