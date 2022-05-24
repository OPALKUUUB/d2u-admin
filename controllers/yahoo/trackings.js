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
  (track_id like ? ${req.query.track_id === "" && "or track_id is null"}) and
  (round_boat like ? ${req.query.round_boat === "" && "or round_boat is null"})
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
