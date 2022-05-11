const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/yahoo/orders");

router.get("/api/yahoo/orders", ordersController.getOrders);

module.exports = router;
