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

exports.getUsernames = async (req, res) => {
  console.log("in get username that round boat _> " + req.query.round_boat);
  const sql_trackings =
    "SELECT COUNT(*) as count_order, username FROM trackings WHERE round_boat LIKE ? GROUP BY username;";
  const sql_orders =
    "SELECT COUNT(*) as count_order, username FROM orders WHERE round_boat LIKE ? GROUP BY username;";
  try {
    let trackings = await query(sql_trackings, [
      req.query.round_boat.trim(),
    ]).then((res) => res);
    let orders = await query(sql_orders, [req.query.round_boat.trim()]).then(
      (res) => res
    );
    for (let i = 0; i < trackings.length; i++) {
      for (let j = 0; j < orders.length; j++) {
        if (trackings[i].username === orders[j].username) {
          trackings[i].count += orders[j].count;
          orders.splice(j, 1);
        }
      }
    }
    let usernames = [...trackings, ...orders];
    res.status(200).json({
      status: true,
      data: usernames,
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
