const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard/configs");

router.get("/api/config", dashboardController.getConfig);
router.patch("/api/config", dashboardController.patchConfig);

module.exports = router;
