const request = require("request");
const htmlparser2 = require("htmlparser2");
const render = require("dom-serializer").default;
const CSSselect = require("css-select");
const url_line_notification = "https://notify-api.line.me/api/notify";
const query = require("../other/query");
const genDate = require("../other/genDate");
const isEmpty = require("../other/isEmpty");

exports.getAuctionImage = (req, res, next) => {
  // ref: https://stackoverflow.com/questions/31553682/regex-extract-img-src-javascript
  console.log(req.body);
  request(req.body.link, function (error, response, body) {
    if (error) {
      res.status(400).json({
        status: false,
        message: "Error: " + error,
      });
    } else {
      if (body === null) {
        res.status(400).json({
          status: false,
          message:
            "Cann't get image from this link! Please show message to admin!",
        });
      } else {
        // const sources = body
        //   .match(/<img [^>]*src="[^"]*"[^>]*>/gm)
        //   .map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
        // res.status(200).json({
        //   status: true,
        //   imgsrc: sources[2],
        // });
        const dom = htmlparser2.parseDocument(body);
        // Title
        const title = render(
          CSSselect.selectOne("div.l-contentsHead h1.ProductTitle__text", dom),
          {
            decodeEntities: false,
          }
        )
          .replace(/<h1 class="ProductTitle__text">/, "")
          .replace(/<\/h1>/, "");
        // console.log(title);
        //   IMAGE
        const image = CSSselect.selectAll(
          "div.ProductImage__inner img",
          dom
        ).map((img) => {
          return render(img, { decodeEntities: false }).replace(
            /.*src="([^"]*)".*/,
            "$1"
          );
        });
        // console.log(img);
        //   PRICE
        const temp = render(CSSselect.selectOne("dd.Price__value", dom), {
          decodeEntities: false,
        })
          .replace(/<span class="Price__tax u-fontSize14">/, "")
          .replace(/<\/span>/, "")
          .replace(/<dd class="Price__value">/, "")
          .replace(/<\/dd>/, "")
          .replace(/\n/, "");
        let price = "";
        for (let i = 0; i < temp.length; i++) {
          if (temp[i] === "円") {
            break;
          }
          price += temp[i];
        }
        // console.log(price);
        const details = CSSselect.selectAll(
          "li.ProductDetail__item dd.ProductDetail__description",
          dom
        ).map((detail) => {
          return render(detail, { decodeEntities: false })
            .replace(
              /<dd class="ProductDetail__description"><span class="ProductDetail__bullet">：<\/span>/,
              ""
            )
            .replace(/<\/dd>/, "");
        });
        // console.log(details);
        let detail_obj = {
          volumn: details[0],
          startDate: details[1],
          endDate: details[2],
        };
        //   console.log(detail_obj);
        res.status(200).json({
          status: "true",
          message: "Get data from this successfully 👍",
          imgsrc: image[0],
          data: {
            image: image,
            price: price,
            detail: detail_obj,
            title: title,
          },
        });
      }
    }
  });
};

exports.postOrder = async (req, res) => {
  let date = genDate();
  let offer = [
    req.body.username,
    req.body.link,
    req.body.imgsrc,
    req.body.maxbid,
    "Auction",
    req.body.remark,
    date,
    date,
  ];
  const sql =
    "INSERT INTO orders (username, link, imgsrc, maxbid, status, remark, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?);";
  let result;
  try {
    result = await query(sql, offer).then((res) => res);
    console.log(result);
    res.status(200).json({
      status: true,
      message: "Offer " + req.body.link + "is successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Error: " + err.sqlMessage,
    });
  }
};
