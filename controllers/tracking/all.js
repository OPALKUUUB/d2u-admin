const conn = require("../connection");

function isEmpty(value) {
  return value === "" || value === undefined || value === null;
}

function query(sql, data) {
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

exports.getTracking = async (req, res) => {
  let data;
  let sql;
  if (isEmpty(req.query.channel)) {
    data = [
      `%${isEmpty(req.query.date) ? "" : req.query.date.trim()}%`,
      `%${isEmpty(req.query.username) ? "" : req.query.username.trim()}%`,
      `%${isEmpty(req.query.trackId) ? "" : req.query.trackId.trim()}%`,
      isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset),
      isEmpty(req.query.item) ? 10 : parseInt(req.query.item),
    ];
    sql = `
      select *
      from trackings
      where
      created_at like ? and
      username like ? and
      track_id like ?
      order by created_at desc
      limit ?,?;
    `;
  } else {
    data = [
      `%${isEmpty(req.query.date) ? "" : req.query.date.trim()}%`,
      `%${isEmpty(req.query.username) ? "" : req.query.username.trim()}%`,
      `%${isEmpty(req.query.trackId) ? "" : req.query.trackId.trim()}%`,
      req.query.channel.trim(),
      isEmpty(req.query.offset) ? 0 : parseInt(req.query.offset),
      isEmpty(req.query.item) ? 10 : parseInt(req.query.item),
    ];
    sql = `
      select *
      from trackings
      where
      created_at like ? and
      username like ? and
      track_id like ? and
      channel like ?
      order by created_at desc
      limit ?,?;
    `;
  }
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    result_count = await query(
      `select count(*) as count from trackings`,
      []
    ).then((res) => res);
    console.log(result_count);
    res.status(200).json({
      status: true,
      data: rows,
      count: result_count.count,
      message: "GET /api/tracking/all success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/tracking/all fail👎",
    });
  }
};
exports.getTrackingId = async (req, res) => {
  const data = [req.params.id];
  const sql = `
      select *
      from trackings
      where
      id = ?;
    `;
  let rows;
  try {
    rows = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      data: rows[0],
      message: "GET /api/tracking/all success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/tracking/all fail👎",
    });
  }
};
