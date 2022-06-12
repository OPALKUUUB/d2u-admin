const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getTracking = async (req, res) => {
  console.log(res.locals);
  const data = [
    "%" + req.query.date.trim() + "%",
    "%" + req.query.username.trim() + "%", // username
    "%" + req.query.track_id.trim() + "%", // tracking id
    "%" + req.query.round_boat.trim() + "%", // date round boat
    isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset), // offset
    isEmpty(req.query.item) ? 10 : parseInt(req.query.item), // item
  ];
  const sql = `
  select *
  from orders
  where
  status like 'win' and
  payment_status = 'paid' and
  done = 0 and
  created_at like ? and
  username like ? and
  (track_id like ? ${
    req.query.track_id === "" ? "or track_id is null" : ""
  }) and
  (round_boat like ? ${
    req.query.round_boat === "" ? "or round_boat is null" : ""
  })
  order by created_at desc
  limit ?, ?;
  `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows,
      message: "GET /api/yahoo/trackings success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/yahoo/trackings fail👎",
    });
  }
};

exports.patchTracking = async (req, res) => {
  let data = [req.body, req.query.id];
  const sql = `
  update orders
  set ?
  where id = ?;
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    let oldPoint = req.body.point;
    let newPoint = 0;
    if (!isEmpty(req.body.weight) && !isEmpty(req.body.bid)) {
      let weight = parseFloat(req.body.weight);
      let bid = parseFloat(req.body.bid);
      newPoint = Math.round((bid / 2000 + weight) * 100) / 100;
      const sql_update_point = `
      update orders
      set point = ?, addPoint = 1
      where id = ?;
      `;
      let result_update_point = await query(sql_update_point, [
        newPoint,
        req.query.id,
      ]).then((res) => res);
      let sql_user = `select point_new, id, username from user_customers where username like ?;`;
      let rows = await query(sql_user, [req.body.username]).then((res) => res);
      let user = rows[0];
      let point = 0;
      if (req.body.addPoint === 1) {
        point = user.point_new - oldPoint + newPoint;
      } else {
        point = user.point_new + newPoint;
      }
      console.log(`${user.username} have point: ${point}`);
      let sql_update_user_point = `update user_customers set point_new = ? where id = ?`;
      await query(sql_update_user_point, [point, user.id]);
      res.status(200).json({
        status: true,
        message: "PATCH /api/yahoo/trackings success👍",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/yahoo/trackings fail👎",
    });
    console.log(error);
  }
};
