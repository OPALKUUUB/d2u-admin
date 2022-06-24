const query = require("../other/query");
const excel = require("exceljs");
// ref form :
// https://ozenero.com/node-js-extract-mysql-data-to-excel-xlsx-file-using-exceljs?ref=morioh.com&utm_source=morioh.com
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
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Trackings");
    worksheet.columns = [
      { header: "id", key: "id" },
      { header: "date", key: "date" },
      { header: "username", key: "username" },
      { header: "track_id", key: "track_id" },
      { header: "weight", key: "weight" },
      { header: "round_boat", key: "round_boat" },
      { header: "remark", key: "remark" },
      { header: "pic1", key: "pic1_filename" },
      { header: "pic2", key: "pic2_filename" },
      { header: "channel", key: "channel" },
      { header: "box_id", key: "box_id" },
      { header: "url", key: "url" },
      { header: "รับของ", key: "check1" },
      { header: "done", key: "check2" },
      { header: "price", key: "price" },
      { header: "point", key: "point" },
      { header: "q", key: "q" },
      { header: "created_at", key: "created_at" },
      { header: "updated_at", key: "updated_at" },
    ];
    worksheet.addRows(jsonTrackings);
    workbook.xlsx
      .writeFile("./client/public/export/trackings.xlsx")
      .then(() => {
        console.log("file saved!");
        res.json({
          status: true,
          message: "export successful 👍",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
