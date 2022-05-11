const conn = require("../connection");
const jwt = require("jsonwebtoken");

function genToken(username, id) {
  console.log(username, id);
  return jwt.sign({ username: username, id: id }, "fakeauth", {
    expiresIn: "7d",
  });
}

exports.login = (req, res) => {
  const body = req.body;
  const login = [body.username];
  console.log(login);
  const sql = `
    SELECT password, id
    FROM user_admins
    WHERE username = ?;
    `;

  conn.query(sql, login, (err, result) => {
    if (err) {
      console.log("Login Failure (Cann't Query) 💥");
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: "Error: " + err.sqlMessage,
      });
    } else {
      if (!result.length) {
        console.log("Login Failure (No Data) 💥");
        res.status(400).json({
          status: "fail",
          message: "Password doesn't match with username!",
        });
      } else if (result[0].password === body.password) {
        console.log("Login successfully 👍");
        let token = genToken(body.username, result[0].id);
        res.status(200).json({
          status: "success",
          message: "Customer Login successfully 👍",
          token: token,
        });
      }
    }
  });
};
