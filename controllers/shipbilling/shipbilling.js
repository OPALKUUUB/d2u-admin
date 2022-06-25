const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getRoundboat = async (req, res) => {
  try {
    const sql_trackings =
      "select count(id) as count, round_boat from trackings group by round_boat order by round_boat desc;";
    let trackings = await query(sql_trackings).then((res) => res);
    const sql_orders =
      "select count(id) as count, round_boat from orders group by round_boat order by round_boat desc;";
    let orders = await query(sql_orders).then((res) => res);
    for (let i = 0; i < trackings.length; i++) {
      for (let j = 0; j < orders.length; j++) {
        if (trackings[i].round_boat === orders[j].round_boat) {
          trackings[i].count += orders[j].count;
          orders.splice(j, 1);
        }
      }
    }
    let roundBoats = [...trackings, ...orders];
    res.status(200).json({
      status: true,
      data: roundBoats,
      message: "GET /group/round_boat success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /group/round_boat fail👎",
    });
  }
};

exports.getVoyageBilling = async (req, res) => {
  let round_boat = req.query.round_boat.trim();
  console.log(round_boat);
  const sql_ship_billings =
    "SELECT * FROM ship_billings WHERE round_boat like ?;";
  const sql_trackings =
    "SELECT username, sum(weight) as weight_sum FROM trackings WHERE round_boat LIKE ? GROUP BY username;";
  const sql_orders =
    "SELECT username, sum(weight) as weight_sum FROM orders WHERE round_boat LIKE ? GROUP BY username;";
  try {
    let ship_billings = await query(sql_ship_billings, [round_boat]).then(
      (res) => res
    );
    let trackings = await query(sql_trackings, [round_boat]).then((res) => res);
    let orders = await query(sql_orders, [round_boat]).then((res) => res);
    for (let i = 0; i < trackings.length; i++) {
      for (let j = 0; j < orders.length; j++) {
        if (trackings[i].username === orders[j].username) {
          trackings[i].weight_sum += orders[j].weight_sum;
          orders.splice(j, 1);
        }
      }
    }
    let usernames = [...trackings, ...orders];
    let data_ship_billing = [];
    for (let i = 0; i < usernames.length; i++) {
      let check = false;
      for (let j = 0; j < ship_billings.length; j++) {
        if (usernames[i].username === ship_billings[j].username) {
          usernames[i].billing_check = ship_billings[j].billing_check;
          check = true;
          break;
        }
      }
      if (!check) {
        data_ship_billing.push([usernames[i].username, round_boat]);
        usernames[i].billing_check = 0;
      }
    }
    if (data_ship_billing.length > 0) {
      const sql_insert_ship_billing =
        "INSERT INTO ship_billings (username, round_boat) VALUES ?;";
      await query(sql_insert_ship_billing, [data_ship_billing]);
    }
    ship_billings = await query(sql_ship_billings, [round_boat]).then(
      (res) => res
    );
    res.status(200).json({
      status: true,
      data: ship_billings,
      message: "GET /api/overview/users success👍",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/overview/users fail👎",
    });
  }
};

exports.getShipBilling = async (req, res) => {
  const username = req.query.username.trim();
  const round_boat = req.query.round_boat.trim();
  const data = [username, round_boat];
  try {
    const sql_trackings =
      "SELECT * FROM trackings WHERE username = ? and round_boat = ? ORDER BY date DESC;";
    const sql_orders =
      "SELECT * FROM orders WHERE username = ? and round_boat = ? ORDER BY created_at DESC;";
    const sql_cost_voyage =
      "SELECT * FROM ship_billings where username = ? and round_boat = ?;";
    const sql_user = "SELECT * FROM user_customers where username like ?;";
    let users = await query(sql_user, [username]).then((res) => res);
    let trackings = await query(sql_trackings, data).then((res) => res);
    let orders = await query(sql_orders, data).then((res) => res);
    let ship_billings = await query(sql_cost_voyage, data).then((res) => res);
    res.json({
      status: true,
      trackings: trackings,
      orders: orders,
      userInfo: users[0],
      ship_billing: ship_billings[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "get fail",
    });
  }
};
exports.updateCod = async (req, res) => {
  let sql = "update trackings set cod = ? where id = ?;";
  if (req.body.channel === "yahoo") {
    sql = "update orders set cod = ? where id = ?;";
  }
  try {
    let result = await query(sql, [req.body.cod, req.body.id]).then(
      (res) => res
    );
    console.log(result);
    res.json({
      status: true,
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "get fail",
    });
  }
};
exports.updateCostVoyage = async (req, res) => {
  let sql =
    "update ship_billings set cost_voyage1 = ?, cost_voyage2 = ?  where id = ?;";
  try {
    let result = await query(sql, [
      req.body.cost_voyage1,
      req.body.cost_voyage2,
      req.body.id,
    ]).then((res) => res);
    console.log(result);
    res.json({
      status: true,
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "get fail",
    });
  }
};

exports.UpdateShipBilling = async (req, res) => {
  console.log(req.body, req.params.id);
  try {
    const sql_update_ship_billing = "UPDATE ship_billings SET ? WHERE id = ?;";
    let result = await query(sql_update_ship_billing, [
      req.body,
      req.params.id,
    ]).then((res) => res);
    console.log(result);
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false });
  }
};
