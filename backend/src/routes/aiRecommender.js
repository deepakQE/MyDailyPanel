const express = require("express");
const { getAiTools } = require("../controllers/aiRecommenderController");

const router = express.Router();

router.post("/", getAiTools);

module.exports = router;
