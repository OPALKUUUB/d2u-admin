const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getConfig = async (req, res) => {
  console.log("GET::/api/configs");
  const sql = "select * from config;";
  try {
    let configs = await query(sql).then((res) => res);
    res.status(200).json({
      status: true,
      data: configs[0],
      message: "GET /api/config success 👍",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "GET /api/config fail👎",
    });
  }
};

exports.patchConfig = async (req, res) => {
  let data = [req.body]
  const sql = "update config set ? where id = 1;";
  try {
    result = await query(sql, data).then(res => res);
    console.log(result)
    res.status(200).json({
      status: true,
      mesage: "PATCH /api/config success 👍"
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
      message: "PATCH /api/config fail 👎"
    })
  }
}