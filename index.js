const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const overviewRoutes = require("./routes/overview");
const yahooRoutes = require("./routes/yahoo");
const trackingRoutes = require("./routes/tracking");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client/build")));

app.use(authRoutes);

app.use("/api", async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    res.status(400).json({
      status: false,
      message: "Your login session is expired,\nPlease Sign In Again!",
      error: "jwt",
    });
  } else {
    // console.log(req.headers.authorization);
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(400).json({
          status: false,
          message: "Your login session is expired,\nPlease Sign In Again!",
          error: "jwt",
        });
      } else {
        res.locals = { username: decoded.username };
        next();
      }
    });
  }
});

app.use(overviewRoutes);
app.use(yahooRoutes);
app.use(trackingRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listen on port " + port + " 😎😎😎"));
