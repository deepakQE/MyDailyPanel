import { useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const AiSummaryWidget = () => {
  const { preferences } = useContext(PreferencesContext);
  const source = preferences.widgets.summary?.source || "cohere";
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch(`/api/ai-tools/summary/${source}`);
      const data = await res.json();
      setSummary(data.summary || "No summary available.");
    };

    fetchSummary();
  }, [source]);

  return (
    <div className="p-4 rounded-xl border shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">AI Daily Summary</h3>
      <p className="text-sm leading-relaxed">{summary}</p>
    </div>
  );
};

export default AiSummaryWidget;
