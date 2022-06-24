const express = require("express");
const router = express.Router();

const shipBillingController = require("../controllers/shipbilling/shipbilling");

router.get("/group/round_boat", shipBillingController.getRoundboat);
router.get("/billing/voyage", shipBillingController.getVoyageBilling);

router.get("/shipbilling", shipBillingController.getShipBilling);
router.post("/update/cod", shipBillingController.updateCod);
router.post("/update/cost/voyage", shipBillingController.updateCostVoyage);

router.patch(
  "/ship/billing/update/:id",
  shipBillingController.UpdateShipBilling
);

module.exports = router;
