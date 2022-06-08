const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/yahoo/orders");
const paymentsController = require("../controllers/yahoo/payments");
const historysController = require("../controllers/yahoo/historys");
const trackingsController = require("../controllers/yahoo/trackings");
const slipController = require("../controllers/yahoo/slip");
const addController = require("../controllers/yahoo/add");

router.get("/api/yahoo/orders", ordersController.getOrders);
router.patch("/api/yahoo/orders", ordersController.patchOrder);
router.delete("/api/yahoo/orders", ordersController.deleteOrder);

router.get("/api/yahoo/payments", paymentsController.getPayment);
router.patch("/api/yahoo/payments", paymentsController.patchPayment);

router.get("/api/yahoo/historys", historysController.getHistory);
router.get("/api/yahoo/historys/:id", historysController.getHistoryItem);

router.get("/api/yahoo/trackings", trackingsController.getTracking);
router.patch("/api/yahoo/trackings", trackingsController.patchTracking);

router.post("/api/yahoo/image", addController.getAuctionImage);
router.post("/api/yahoo/add", addController.postOrder);

router.get("/api/yahoo/slip/:id", slipController.getSlip);
router.post("/api/yahoo/slip", slipController.postSlip);
router.patch("/api/yahoo/slip/:id", slipController.patchSlip);

module.exports = router;
