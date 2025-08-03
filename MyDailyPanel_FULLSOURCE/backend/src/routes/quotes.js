const express = require("express");
const { getQuote } = require("../controllers/quotesController");

const router = express.Router();

router.get("/:source", getQuote);

module.exports = router;
