const fetch = require("node-fetch");

exports.getNews = async (req, res) => {
  const { source } = req.params;

  try {
    let url;

    if (source === "newsapi") {
      url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_API_KEY}`;
    } else if (source === "currentsapi") {
      url = `https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.CURRENTSAPI_API_KEY}`;
    } else {
      return res.status(400).json({ error: "Invalid news source" });
    }

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
