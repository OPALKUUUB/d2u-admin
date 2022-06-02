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
      `%${isEmpty(req.query.roundBoat) ? "" : req.query.roundBoat.trim()}%`,
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
      round_boat like ?
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
    // console.log(result_count);
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

exports.patchMer123Fril = async (req, res) => {
  let data = [req.body, req.query.id];
  console.log(data);
  const sql = `
    update trackings
    set ?
    where
    id = ?;
    `;
  let result;
  req.body.price = req.body.price === "" ? 0 : req.body.price;
  req.body.weight = req.body.weight === "" ? 0 : req.body.weight;
  try {
    result = await query(sql, data).then((res) => res);
    let oldPoint = req.body.point;
    let newPoint = 0;
    let base_point = 1000.0;
    if (req.body.channel === "123") {
      base_point = 2000.0;
    }

    if (!isEmpty(req.body.weight) && !isEmpty(req.body.price)) {
      let point_price = req.body.price / base_point;
      let point_weight = 0;
      if (req.body.q === 0) {
        let weight = parseFloat(req.body.weight);
        if (weight > 1) {
          point_weight = weight - 1;
        }
      } else {
        point_weight = parseFloat(req.body.q * 100);
      }
      newPoint = point_price + point_weight;
      let sql_update_point = `update trackings set point = ?, addPoint = 1 where id = ?;`;
      result = await query(sql_update_point, [newPoint, req.body.id]).then(
        (res) => res
      );
      //   console.log(result);
      let sql_user = `select point_new, id, username from user_customers where username like ?;`;
      let rows = await query(sql_user, [req.body.username]).then((res) => res);
      let user = rows[0];
      let point = 0;
      if (req.body.addPoint === 1) {
        point = user.point_new - oldPoint + newPoint;
        // console.log(user.point_new, oldPoint, newPoint);
      } else {
        point = user.point_new + newPoint;
      }
      console.log(`${user.username} have point: ${point}`);
      let sql_update_user_point = `update user_customers set point_new = ? where id = ?`;
      await query(sql_update_user_point, [point, user.id]);
    }
    res.status(200).json({
      status: true,
      message: "PATCH /api/tracking/shimizu success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/tracking/shimizu fail👎",
    });
    console.log(error);
  }
};

exports.deleteTracking = async (req, res) => {
  const data = [req.params.id];
  const sql = `
  delete from trackings
  where id = ?;
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    res.status(200).json({
      status: true,
      message: "DELETE /api/trackings success👍",
    });
    console.log(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "DELETE /api/trackings fail👎",
    });
    console.log(error);
  }
};
