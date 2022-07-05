const express = require("express");
const router = express.Router();

const daisoController = require("../controllers/mart/daiso");

router.get("/daiso", daisoController.getDaiso);

module.exports = router;
