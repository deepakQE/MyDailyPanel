import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import QuotesWidget from "../components/QuotesWidget";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import CurrencyWidget from "../components/CurrencyWidget";
import AiSummaryWidget from "../components/AiSummaryWidget";

const Dashboard = () => {
  const { preferences } = useContext(PreferencesContext);
  const widgets = preferences.widgets;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {widgets.quotes?.enabled && <QuotesWidget />}
      {widgets.weather?.enabled && <WeatherWidget />}
      {widgets.news?.enabled && <NewsWidget />}
      {widgets.currency?.enabled && <CurrencyWidget />}
      {widgets.summary?.enabled && <AiSummaryWidget />}
    </div>
  );
};

export default Dashboard;
