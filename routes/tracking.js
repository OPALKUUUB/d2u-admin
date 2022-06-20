const express = require("express");
const fs = require("fs");
const csv = require("fast-csv");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/csv/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + ".csv";
    cb(null, file.fieldname + "_" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

const allsController = require("../controllers/tracking/all");
const shimizuController = require("../controllers/tracking/shimizu");
const exportController = require("../controllers/tracking/export");

router.get("/api/tracking", allsController.getTracking);
router.get("/api/tracking/:id", allsController.getTrackingId);
router.delete("/api/tracking/:id", allsController.deleteTracking);
router.post("/api/tracking", allsController.postTracking);

router.patch("/api/tracking/mer123fril", allsController.patchMer123Fril);
router.patch("/api/tracking/shimizu", shimizuController.patchShimizu);

router.post(
  "/api/tracking/shimizu/upload-csv",
  upload.single("file"),
  shimizuController.uploadCsv
);

router.post("/export/tracking", exportController.exportTracking);

module.exports = router;
