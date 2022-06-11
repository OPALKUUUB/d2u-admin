const conn = require("../connection");
// const connectionRequest = require("../connectionRequest");
const fs = require("fs");
const csv = require("fast-csv");
const multer = require("multer");
function isEmpty(value) {
  return value === "" || value === undefined || value === null;
}

function query(sql, data) {
  // let conn = connectionRequest();
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
  console.log(data);
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

exports.uploadCsv = (req, res) => {
  let date = genDate();
  let rows = [];
  let check = true;
  let update_username = {};
  csv
    .parseFile(req.file.path)
    .on("data", function (data) {
      if (data[0] === "") {
        return;
      }
      if (check) {
        check = false;
        data.push("created_at");
        data.push("updated_at");
      } else {
        let t, m, d;
        if (data[5].split("/").length === 3) {
          t = data[5].split("/");
          m = "0" + t[1];
          d = "0" + t[0];
          data[5] = `${t[2]}-${m.slice(-2)}-${d.slice(-2)}`;
        }
        if (data[0].split("/").length === 3) {
          t = data[0].split("/");
          m = "0" + t[1];
          d = "0" + t[0];
          data[0] = `${t[2]}-${m.slice(-2)}-${d.slice(-2)}`;
        }
        let weight = 0;
        if (data[4] === "") {
          data[4] = 0;
        } else {
          weight = parseFloat(data[4]);
        }
        if (update_username[data[1]] === undefined) {
          update_username[data[1]] = 0;
        }
        update_username[data[1]] += weight;
        data.push("shimizu");
        data.push(date);
        data.push(date);
        data.push(weight);
        rows.push(data);
      }
    })
    .on("end", async function () {
      // console.log(rows);
      // this line for delete file
      fs.unlinkSync(req.file.path);
      const sql = `
      insert into
      trackings
      (date, username, track_id, box_id, weight, round_boat, remark, channel, created_at, updated_at, point)
      values ?;
      `;
      try {
        console.log(rows);
        result = await query(sql, [rows]).then((res) => res);
        const update_username_keys = Object.keys(update_username);
        const sql_user = `select id, point_new, username from user_customers where username like ?;`;
        for (let i = 0; i < update_username_keys.length; i++) {
          let user_row = await query(sql_user, [update_username_keys[i]]).then(
            (res) => res
          );
          update_username[update_username_keys[i]] += user_row[0].point_new;
        }
        console.log(update_username);
        let sql_update_user_point = "";
        for (let i = 0; i < update_username_keys.length; i++) {
          sql_update_user_point += `update user_customers set point_new = ${
            update_username[update_username_keys[i]]
          } where username like '${update_username_keys[i]}';`;
        }
        // console.log(sql_update_user_point);
        await query(sql_update_user_point, []).then((res) => res);
        res.status(200).json({
          status: true,
          message: "POST /api/tracking/shimizu/upload-csv success👍",
        });
      } catch (error) {
        res.status(400).json({
          status: false,
          error: error,
          message: "POST /api/tracking/shimizu/upload-csv fail👎",
        });
        console.log(error);
      }
    });
};
