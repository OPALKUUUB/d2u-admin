const query = require("../other/query");
const excel = require("exceljs");

exports.exportTracking = async (req, res) => {
  let from = req.body.from;
  let to = req.body.to;
  let data = [from, to];
  let sql = `select * from trackings where date between ? and ? `;
  if (req.body.username !== null) {
    sql += " and username like ? ";
    data.push(req.body.username);
  }
  if (req.body.voyage !== null) {
    sql += " and round_boat like ? ";
    data.push(req.body.voyage);
  }
  if (req.body.channel !== null) {
    sql += " and channel like ? ";
    data.push(req.body.channel);
  }
  sql += ";";
  try {
    let trackings = await query(sql, data).then((res) => res);
    const jsonTrackings = JSON.parse(JSON.stringify(trackings));
    // console.log(jsonTrackings);
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Trackings");
    worksheet.columns = [
      { header: "id", key: "id" },
      { header: "username", key: "username" },
      { header: "track_id", key: "track_id" },
      { header: "weight", key: "weight" },
      { header: "round_boat", key: "round_boat" },
      { header: "remark", key: "remark" },
      { header: "pic1_filename", key: "pic1_filename" },
      { header: "pic2_filename", key: "pic2_filename" },
      { header: "created_at", key: "created_at" },
      { header: "updated_at", key: "updated_at" },
      { header: "date", key: "date" },
      { header: "channel", key: "channel" },
      { header: "box_id", key: "box_id" },
      { header: "url", key: "url" },
      { header: "check1", key: "check1" },
      { header: "check2", key: "check2" },
      { header: "check2", key: "check2" },
      { header: "price", key: "price" },
      { header: "point", key: "point" },
      { header: "q", key: "q" },
    ];
    worksheet.addRows(jsonTrackings);
    workbook.xlsx
      .writeFile("./client/public/export/trackings.xlsx")
      .then(() => {
        console.log("file saved!");
      });
    res.json(trackings);
  } catch (error) {
    console.log(error);
  }
};

// exports.exportTracking = async (req, res) => {
//   const sql = "select * from user_admins;";
//   try {
//     let user_admins = await query(sql, []).then((res) => res);
//     const jsonUserAdmins = JSON.parse(JSON.stringify(user_admins));
//     let workbook = new excel.Workbook();
//     let worksheet = workbook.addWorksheet("User Admins");
//     worksheet.addRows(jsonUserAdmins);
//     workbook.xlsx.writeFile("user_admins.xlsx").then(() => {
//       console.log("file saved!");
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   res.send("test");
// };
