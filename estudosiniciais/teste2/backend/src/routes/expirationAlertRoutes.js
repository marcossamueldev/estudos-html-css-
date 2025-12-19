const express = require("express");
const ExpirationAlertController = require("../controllers/ExpirationAlertController");

const router = express.Router();

router.get("/expiration", ExpirationAlertController.getExpirationAlerts);

module.exports = router;
