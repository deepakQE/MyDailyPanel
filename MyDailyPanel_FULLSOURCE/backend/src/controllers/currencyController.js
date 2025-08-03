const fetch = require("node-fetch");

exports.getRates = async (req, res) => {
  const { source } = req.params;

  try {
    let url;

    if (source === "frankfurter") {
      url = "https://api.frankfurter.app/latest?from=USD&to=EUR";
    } else if (source === "exchangerate") {
      url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/USD`;
    } else {
      return res.status(400).json({ error: "Invalid currency source" });
    }

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch currency rates" });
  }
};
