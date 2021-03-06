const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");
exports.getOrders = async (req, res) => {
  // console.log(res.locals);
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
    let sql_order = "select * from orders where id = ?;";
    let orders = await query(sql_order, data).then((res) => res);
    let order = orders[0];
    let point = order.point;
    if (point !== null && point !== undefined && point > 0) {
      let sql_user = "select * from user_customers where username like ?;";
      let users = await query(sql_user, [order.username]).then((res) => res);
      let user = users[0];
      let user_point_update = user.point_new - point;
      let sql_remove_user_point =
        "update user_customers set point_new = ? where id = ?;";
      await query(sql_remove_user_point, [user_point_update, user.id]);
      console.log(
        "Update Point " +
          user.username +
          " from " +
          user.point_new +
          " to " +
          user_point_update
      );
    }
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "DELETE /api/yahoo/orders success👍",
    });
    // console.log(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "DELETE /api/yahoo/orders fail👎",
    });
    console.log(error);
  }
};
