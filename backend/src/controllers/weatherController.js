const fetch = require("node-fetch");

exports.getWeather = async (req, res) => {
  const { source } = req.params;

  try {
    let url;
    const city = "London"; // You can make this dynamic later

    if (source === "openweathermap") {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
    } else if (source === "weatherapi") {
      url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_API_KEY}&q=${city}`;
    } else {
      return res.status(400).json({ error: "Invalid weather source" });
    }

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};
