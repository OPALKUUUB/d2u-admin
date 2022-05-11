const express = require("express");
const router = express.Router();

const adminsController = require("../controllers/overview/admins");
const usersController = require("../controllers/overview/users");

// users
router.get("/api/overview/users", usersController.getUsers);
router.get("/api/overview/users/count", usersController.countUsers);

// admins
router.get("/api/overview/admins", adminsController.getAdmins);
router.get("/api/overview/admins/count", adminsController.countAdmins);

module.exports = router;
