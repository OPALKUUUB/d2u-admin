const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getTracking = async (req, res) => {
  let data;
  let sql;
  if (req.query.channel === "all") {
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
    let check1 = req.query.check1.trim();
    let check2 = req.query.check2.trim();
    let sort = req.query.sort.trim();
    sql = `
      select *
      from trackings
      where
      created_at like ? and
      username like ? and
      track_id like ? and
      round_boat like ? and
      channel like ?
      ${
        check1 === "all"
          ? ""
          : check1 === "1"
          ? " and check1 = 1 "
          : " and (check1 is null or check1 = 0) "
      }
      ${
        check2 === "all"
          ? ""
          : check2 === "1"
          ? " and check2 = 1 "
          : " and (check2 is null or check2 = 0) "
      }
      ${
        sort === "1"
          ? " order by created_at desc "
          : sort === "2"
          ? " order by created_at asc "
          : sort === "3"
          ? " order by round_boat desc "
          : " and (round_boat is not null or round_boat not like '') order by round_boat asc "
      }
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
  let newPoint = 0;
  if (req.body.weight > 0 || req.body.price > 0) {
    let base = 1000.0;
    if (req.body.channel === "123") {
      base = 2000.0;
    }
    let point_price = parseFloat(req.body.price) / base;
    let point_weight = 0;
    let weight = parseFloat(req.body.weight);
    if (weight >= 1) {
      if (req.body.channel === "123") {
        point_weight = weight;
      } else {
        point_weight = weight - 1;
      }
    }
    newPoint = point_price + point_weight;
  }
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
    req.body.price,
    newPoint,
  ];
  const sql = `
  insert into trackings 
  (channel, username, date, box_id, url, track_id, weight, round_boat, pic1_filename, pic2_filename, remark, created_at, updated_at, price, point)
  values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;
  let result;
  try {
    result = await query(sql, data).then((res) => res);
    let sql_user = `select point_new, id, username from user_customers where username like ?;`;
    let rows = await query(sql_user, [req.body.username]).then((res) => res);
    let user = rows[0];
    let point = 0;
    point = user.point_new + newPoint;
    console.log(`${user.username} newPoint: ${newPoint}, point: ${point}`);
    let sql_update_user_point = `update user_customers set point_new = ?, updated_at = ? where id = ?`;
    await query(sql_update_user_point, [point, date, user.id]);
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
  let date = genDate();
  const sql = `
    update trackings
    set ?
    where
    id = ?;
    `;
  let result;
  req.body.price = req.body.price === "" ? 0 : parseFloat(req.body.price);
  req.body.weight = req.body.weight === "" ? 0 : parseFloat(req.body.weight);
  try {
    result = await query(sql, data).then((res) => res);
    let oldPoint = isEmpty(req.body.point) ? 0 : parseFloat(req.body.point);
    let newPoint = 0;
    let base_point = 1000.0;
    if (req.body.channel === "123") {
      base_point = 2000.0;
    }
    let point_price = parseFloat(req.body.price) / base_point;
    console.log("Point Price: " + point_price);
    let point_weight = 0;
    if (req.body.q === 0) {
      let weight = parseFloat(req.body.weight);
      if (weight >= 1) {
        if (req.body.channel === "123") {
          point_weight = weight;
        } else {
          point_weight = weight - 1;
        }
      }
    } else {
      point_weight = parseFloat(req.body.q * 100);
    }
    console.log("Point Weight: " + point_weight);
    newPoint = point_price + point_weight;
    let sql_update_point = `update trackings set point = ?, addPoint = 1, updated_at = ? where id = ?;`;
    result = await query(sql_update_point, [newPoint, date, req.body.id]).then(
      (res) => res
    );
    let sql_user = `select point_new, id, username from user_customers where username like ?;`;
    let rows = await query(sql_user, [req.body.username]).then((res) => res);
    let user = rows[0];
    let point = 0;
    point = user.point_new - oldPoint + newPoint;
    console.log(`${user.username} have point: ${point}`);
    let sql_update_user_point = `update user_customers set point_new = ?, updated_at = ? where id = ?`;
    await query(sql_update_user_point, [point, date, user.id]);
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
  console.log("Delete Tracking Id: " + req.params.id);
  const data = [req.params.id];
  const sql = `
  delete from trackings
  where id = ?;
  `;
  let result;
  try {
    let sql_tracking = "select * from trackings where id = ?;";
    let trackings = await query(sql_tracking, data).then((res) => res);
    let tracking = trackings[0];
    if (
      tracking.point !== null &&
      tracking.point !== undefined &&
      tracking.point > 0
    ) {
      let point = tracking.point;
      let sql_user = "select * from user_customers where username like ?;";
      let users = await query(sql_user, [tracking.username.trim()]).then(
        (res) => res
      );
      let user = users[0];
      console.log(user);
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
      message: "DELETE /api/trackings success👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "DELETE /api/trackings fail👎",
    });
    console.log(error);
  }
};
