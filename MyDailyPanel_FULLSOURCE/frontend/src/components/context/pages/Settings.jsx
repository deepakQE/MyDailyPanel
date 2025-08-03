import { useContext, useState, useEffect } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const Settings = () => {
  const { preferences, setPreferences } = useContext(PreferencesContext);
  const widgets = preferences.widgets;

  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : { name: "", picture: "" };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(profile));
  }, [profile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleWidget = (name) => {
    setPreferences((prev) => ({
      ...prev,
      widgets: {
        ...prev.widgets,
        [name]: {
          ...prev.widgets[name],
          enabled: !prev.widgets[name].enabled
        }
      }
    }));
  };

  const setSource = (name, source) => {
    setPreferences((prev) => ({
      ...prev,
      widgets: {
        ...prev.widgets,
        [name]: {
          ...prev.widgets[name],
          source
        }
      }
    }));
  };

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-2">Widget Settings</h2>
        {Object.keys(widgets).map((key) => (
          <div key={key} className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={widgets[key].enabled}
                onChange={() => toggleWidget(key)}
              />
              <span className="capitalize">{key} Widget</span>
            </label>
            {widgets[key].enabled && (
              <select
                value={widgets[key].source}
                onChange={(e) => setSource(key, e.target.value)}
                className="mt-1 block p-1 border"
              >
                {key === "quotes" &&
                  ["zenquotes", "typefit"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                {key === "weather" &&
                  ["openweathermap", "weatherapi"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                {key === "news" &&
                  ["newsapi", "currentsapi"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                {key === "currency" &&
                  ["frankfurter", "exchangerate"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                {key === "summary" &&
                  ["cohere", "huggingface"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
              </select>
            )}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Avatar URL</label>
            <input
              type="text"
              name="picture"
              value={profile.picture}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
            />
            <div className="mt-3">
              <img
                src={profile.picture}
                alt="preview"
                className="w-16 h-16 rounded-full border"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
