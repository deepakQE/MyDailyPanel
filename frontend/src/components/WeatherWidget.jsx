import { useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const WeatherWidget = () => {
  const { preferences } = useContext(PreferencesContext);
  const source = preferences.widgets.weather?.source || "openweathermap";
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(`/api/weather/${source}`);
      const data = await res.json();
      setWeather(data);
    };
    fetchWeather();
  }, [source]);

  if (!weather) return <div className="p-4 border rounded">Loading weather...</div>;

  return (
    <div className="p-4 rounded-xl border shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Current Weather</h3>
      {source === "openweathermap" ? (
        <>
          <p>🌡 Temp: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
          <p>☁ {weather.weather[0].description}</p>
        </>
      ) : (
        <>
          <p>🌡 Temp: {weather.current.temp_c}°C</p>
          <p>☁ {weather.current.condition.text}</p>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
