import { createContext, useEffect, useState } from "react";

export const PreferencesContext = createContext();

const defaultPrefs = {
  darkMode: false,
  widgets: {
    quotes: { enabled: true, source: "zenquotes" },
    weather: { enabled: true, source: "openweathermap" },
    news: { enabled: true, source: "newsapi" },
    currency: { enabled: true, source: "frankfurter" },
    summary: { enabled: true, source: "cohere" }
  }
};

const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("preferences");
    return saved ? JSON.parse(saved) : defaultPrefs;
  });

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    document.documentElement.classList.toggle("dark", preferences.darkMode);
  }, [preferences]);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
