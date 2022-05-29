const express = require("express");
const router = express.Router();

const allsController = require("../controllers/tracking/all");
const shimizuController = require("../controllers/tracking/shimizu");

router.get("/api/tracking/all", allsController.getTracking);
router.get("/api/tracking/all/:id", allsController.getTrackingId);
router.post("/api/tracking/add", allsController.postTracking);
router.patch("/api/tracking/mer123fril", allsController.patchMer123Fril);

router.patch("/api/tracking/shimizu", shimizuController.patchShimizu);

module.exports = router;
