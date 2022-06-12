const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

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

exports.postSlip = async (req, res) => {
  let data = [req.body.price, req.body.slip];
  const sql = `
    insert into
    payments (price, slip_image_filename)
    values (?, ?);
    `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    const sql_orders = `
        update orders set payment_id = ? where id = ?;
        `;
    result2 = await query(sql_orders, [
      result.insertId,
      req.body.order_id,
    ]).then((res) => res);
    res.status(200).json({
      status: true,
      message: "POST /api/yahoo/slip success👍",
    });
    console.log(result);
    console.log(result2);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "POST /api/yahoo/slip fail👎",
    });
    console.log(error);
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
