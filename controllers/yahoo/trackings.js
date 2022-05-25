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
  console.log("first");
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "PATCH /api/yahoo/trackings success👍",
    });
    if (req.body.done) {
      const sql_item = `
      select id, bid, weight
      from orders
      where id = ?;
     `;
      let result_item = await query(sql_item, [req.query.id]).then(
        (res) => res
      );
      let row = result_item[0];
      let weight = parseFloat(row.weight);
      let bid = parseFloat(row.bid);
      let point = Math.round((bid / 2000 + weight) * 100) / 100;
      const sql_update_point = `
      update orders
      set point = ?, addPoint = 1
      where id = ?;
      `;
      let result_update_point = await query(sql_update_point, [
        point,
        req.query.id,
      ]).then((res) => res);
      console.log("add point: ", point);
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
