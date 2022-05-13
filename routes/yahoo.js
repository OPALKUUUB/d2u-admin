const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/yahoo/orders");
const paymentsController = require("../controllers/yahoo/payments");
const historysController = require("../controllers/yahoo/historys");

router.get("/api/yahoo/orders", ordersController.getOrders);
router.patch("/api/yahoo/orders", ordersController.patchOrder);
router.delete("/api/yahoo/orders", ordersController.deleteOrder);

router.get("/api/yahoo/payments", paymentsController.getPayment);
router.patch("/api/yahoo/payments", paymentsController.patchPayment);

router.get("/api/yahoo/historys", historysController.getHistory);

module.exports = router;
