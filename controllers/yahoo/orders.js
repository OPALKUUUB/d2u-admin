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

exports.getOrders = async (req, res) => {
  console.log(res.locals);
  const data = [
    "%" + req.query.username.trim() + "%", // username
    isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset), // offset
    isEmpty(req.query.item) ? 10 : parseInt(req.query.item), // item
  ];
  const sql = `
  select *
  from orders
  where
  status like 'auction' and
  username like ?
  order by created_at desc
  limit ?, ?;
  `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      message: "GET /api/yahoo/orders success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/yahoo/orders fail👎",
    });
  }
};

exports.patchOrder = async (req, res) => {
  console.log(req.body);
  if (
    req.body.payment_status === "pending1" ||
    req.body.payment_status === "pending2"
  ) {
    req.body.bid = req.body.bid === null ? 0 : req.body.bid;
    req.body.tranfer_fee_injapan =
      req.body.tranfer_fee_injapan === null ? 0 : req.body.tranfer_fee_injapan;
    req.body.delivery_in_thai =
      req.body.delivery_in_thai === null ? 0 : req.body.delivery_in_thai;
  }
  if (req.query.ck === "true") {
    if (req.query.option === "0") {
      req.body.maxbid_work_by = res.locals.username;
    } else if (req.query.option === "1") {
      req.body.addbid1_work_by = res.locals.username;
    } else if (req.query.option === "2") {
      req.body.addbid2_work_by = res.locals.username;
    }
  } else if (req.query.ck === "false") {
    if (req.query.option === "0") {
      req.body.maxbid_work_by = "";
    } else if (req.query.option === "1") {
      req.body.addbid1_work_by = "";
    } else if (req.query.option === "2") {
      req.body.addbid2_work_by = "";
    }
  }
  if (req.query.win === "win") {
    req.body.status = "win";
    req.body.bid_by = res.locals.username;
  }
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
      message: "PATCH /api/yahoo/orders success👍",
    });
    console.log(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/yahoo/orders fail👎",
    });
    console.log(error);
  }
};

exports.deleteOrder = async (req, res) => {
  // console.log(res.locals, req.query.id);
  const data = [req.query.id];
  const sql = `
  delete from orders
  where id = ?;
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "DELETE /api/yahoo/orders success👍",
    });
    console.log(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "DELETE /api/yahoo/orders fail👎",
    });
    console.log(error);
  }
};
