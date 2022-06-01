const express = require("express");
const router = express.Router();

const adminsController = require("../controllers/overview/admins");
const usersController = require("../controllers/overview/users");

// users
router.get("/api/overview/users", usersController.getUsers);
router.patch("/api/overview/users/:id", usersController.patchUser);
router.get("/api/overview/users/count", usersController.countUsers);

// admins
router.get("/api/overview/admins", adminsController.getAdmins);
router.post("/api/overview/admins", adminsController.postAdmin);
router.patch("/api/overview/admins/:id", adminsController.patchAdmin);
router.get("/api/overview/admins/count", adminsController.countAdmins);

module.exports = router;
