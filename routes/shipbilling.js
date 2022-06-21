const express = require("express");
const router = express.Router();

const shipBillingController = require("../controllers/shipbilling/shipbilling");

router.get("/group/round_boat", shipBillingController.getRoundboat);
router.get("/username", shipBillingController.getUsernames);

module.exports = router;
