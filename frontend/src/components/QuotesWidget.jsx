import { useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const QuotesWidget = () => {
  const { preferences } = useContext(PreferencesContext);
  const source = preferences.widgets.quotes?.source || "zenquotes";
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch(`/api/quotes/${source}`);
      const data = await res.json();
      setQuote(data.q ? data : data[0]); // Support both sources
    };
    fetchQuote();
  }, [source]);

  if (!quote) return <div className="p-4 border rounded">Loading quote...</div>;

  return (
    <div className="p-4 rounded-xl border shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Motivational Quote</h3>
      <p className="italic">"{quote.q || quote.text}"</p>
      <p className="mt-2 text-right">— {quote.a || "Anonymous"}</p>
    </div>
  );
};

export default QuotesWidget;
