const fetch = require("node-fetch");

exports.getQuote = async (req, res) => {
  const { source } = req.params;

  try {
    let url;

    if (source === "zenquotes") {
      url = "https://zenquotes.io/api/today";
    } else if (source === "typefit") {
      url = "https://type.fit/api/quotes";
    } else {
      return res.status(400).json({ error: "Invalid quote source" });
    }

    const response = await fetch(url);
    const data = await response.json();

    const quote = Array.isArray(data) ? data[0] : data;
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};
