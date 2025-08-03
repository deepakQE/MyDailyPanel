const express = require("express");
const { sendDigest } = require("../controllers/emailController");

const router = express.Router();

router.post("/digest", sendDigest);

module.exports = router;
