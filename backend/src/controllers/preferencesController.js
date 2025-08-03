const User = require("../models/User");

exports.savePreferences = async (req, res) => {
  const { email, preferences } = req.body;
  if (!email || !preferences) return res.status(400).json({ error: "Missing fields" });

  try {
    const updated = await User.findOneAndUpdate(
      { email },
      { preferences },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to save preferences" });
  }
};

exports.getPreferences = async (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).json({ error: "Missing email" });

  try {
    const user = await User.findOne({ email });
    res.json(user?.preferences || {});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
};
