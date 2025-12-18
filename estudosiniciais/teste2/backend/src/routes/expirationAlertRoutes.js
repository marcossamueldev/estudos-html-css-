const express = require("express");
const router = express.Router();
const ExpirationAlertController = require("../controllers/ExpirationAlertController");

router.get("/expiration", ExpirationAlertController.index);

module.exports = router;
