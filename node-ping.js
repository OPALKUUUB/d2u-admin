const cron = require("node-cron");
const axios = require("axios");
// ...

// Schedule tasks to be run on the server.
cron.schedule("* * * * * *", function () {
  //   console.log("running a task every minute");
  axios
    .get("https://d8fa-171-96-38-177.ap.ngrok.io/test")
    .then((res) => console.log(res.data));
});

//   * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
//   second ( optional )
