import { useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

const NewsWidget = () => {
  const { preferences } = useContext(PreferencesContext);
  const source = preferences.widgets.news?.source || "newsapi";
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`/api/news/${source}`);
      const data = await res.json();
      setNews(
        source === "newsapi" ? data.articles.slice(0, 3) : data.news.slice(0, 3)
      );
    };
    fetchNews();
  }, [source]);

  return (
    <div className="p-4 rounded-xl border shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Top Headlines</h3>
      <ul className="space-y-2 text-sm">
        {news.map((item, idx) => (
          <li key={idx}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsWidget;
