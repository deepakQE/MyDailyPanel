const express = require("express");
const { getRates } = require("../controllers/currencyController");

const router = express.Router();

router.get("/:source", getRates);

module.exports = router;
