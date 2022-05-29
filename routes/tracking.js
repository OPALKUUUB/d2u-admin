const express = require("express");
const router = express.Router();

const allsController = require("../controllers/tracking/all");

router.get("/api/tracking/all", allsController.getTracking);
router.get("/api/tracking/all/:id", allsController.getTrackingId);
router.post("/api/tracking/add", allsController.postTracking);

module.exports = router;
