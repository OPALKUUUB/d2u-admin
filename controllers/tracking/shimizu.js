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

exports.patchShimizu = async (req, res) => {
  let data = [req.body, req.query.id];
  //   console.log(data);
  const sql = `
    update trackings
    set ?
    where
    id = ?;
    `;
  let result;
  req.body.weight = req.body.weight === "" ? 0 : req.body.weight;
  try {
    result = await query(sql, data).then((res) => res);
    let oldPoint = req.body.point;
    let newPoint = 0;
    if (!isEmpty(req.body.weight)) {
      if (req.body.q === 0) {
        newPoint = parseFloat(req.body.weight);
      } else {
        newPoint = parseFloat(req.body.q * 100);
      }
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
