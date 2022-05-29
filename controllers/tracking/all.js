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
function genDate() {
  let today = new Date();
  let date = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`;
  let month =
    today.getMonth() >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
  let hour = today.getHours() >= 10 ? today.getHours() : `0${today.getHours()}`;
  let minute =
    today.getMinutes() >= 10 ? today.getMinutes() : `0${today.getMinutes()}`;
  return `${today.getFullYear()}-${month}-${date}T${hour}:${minute}`;
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
      `%${isEmpty(req.query.roundBoat) ? "" : req.query.roundBoat.trim()}%`,
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
      round_boat like ? and
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

exports.postTracking = async (req, res) => {
  console.log(res.locals);
  let date = genDate();
  const data = [
    req.body.channel,
    req.body.username,
    req.body.date,
    req.body.box_id,
    req.body.url,
    req.body.track_id,
    req.body.weight,
    req.body.round_boat,
    req.body.pic1_filename,
    req.body.pic2_filename,
    req.body.remark,
    date,
    date,
  ];
  const sql = `
  insert into trackings 
  (channel, username, date, box_id, url, track_id, weight, round_boat, pic1_filename, pic2_filename, remark, created_at, updated_at)
  values (?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "POST /api/tracking/add success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "POST /api/tracking/add fail👎",
    });
  }
};
