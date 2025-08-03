import { useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const CurrencyWidget = () => {
  const { preferences } = useContext(PreferencesContext);
  const source = preferences.widgets.currency?.source || "frankfurter";
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      const res = await fetch(`/api/currency/${source}`);
      const data = await res.json();

      if (source === "frankfurter") {
        setRate(data.rates.EUR);
      } else {
        setRate(data.conversion_rates?.EUR);
      }
    };

    fetchRates();
  }, [source]);

  if (!rate) return <div className="p-4 border rounded">Loading currency...</div>;

  return (
    <div className="p-4 rounded-xl border shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">USD to EUR</h3>
      <p>💱 1 USD = {rate.toFixed(3)} EUR</p>
    </div>
  );
};

export default CurrencyWidget;
