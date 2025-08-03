const express = require("express");
const { getWeather } = require("../controllers/weatherController");

const router = express.Router();

router.get("/:source", getWeather);

module.exports = router;
