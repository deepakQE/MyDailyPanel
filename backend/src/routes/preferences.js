const express = require("express");
const {
  savePreferences,
  getPreferences
} = require("../controllers/preferencesController");

const router = express.Router();

router.post("/save", savePreferences);
router.get("/:email", getPreferences);

module.exports = router;
