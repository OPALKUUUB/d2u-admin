const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const authRoutes = require("./routes/auth");
const overviewRoutes = require("./routes/overview");
const yahooRoutes = require("./routes/yahoo");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client/build")));

app.use(authRoutes);

// app.use("/api", (req, res, next) => {
//   console.log("in middleware");
//   next();
// });

app.use(overviewRoutes);
app.use(yahooRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listen on port " + port + " 😎😎😎"));
