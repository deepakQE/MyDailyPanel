import { useState } from "react";

const categoriesList = [
  "Productivity", "Education", "Video", "Design", "Coding", "Language"
];

const AiRecommender = () => {
  const [selected, setSelected] = useState([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [results, setResults] = useState([]);

  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/ai-tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories: selected, freeOnly })
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">AI Tool Recommender</h2>

      <div className="space-y-2 mb-6">
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <label key={cat} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <label className="block mt-2 text-sm">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={() => setFreeOnly((prev) => !prev)}
          />
          {" "}Free Only
        </label>

        <button
          onClick={handleSubmit}
          className="px-4 py-1 mt-2 bg-blue-600 text-white rounded text-sm"
        >
          Find Tools
        </button>
      </div>

      <ul className="space-y-4">
        {results.map((tool, i) => (
          <li key={i} className="p-3 border rounded bg-white dark:bg-gray-800 shadow">
            <h4 className="font-semibold text-lg">{tool.name}</h4>
            <p className="text-sm">{tool.description}</p>
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline">
              Visit
            </a>
            {tool.free && <span className="ml-2 px-2 py-0.5 bg-green-200 text-xs rounded">Free</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AiRecommender;
