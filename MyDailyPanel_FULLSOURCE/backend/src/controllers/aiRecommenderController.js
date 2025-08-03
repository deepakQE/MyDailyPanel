const tools = require("../data/aiTools.json");

exports.getAiTools = (req, res) => {
  const { categories = [], freeOnly = false } = req.body;

  const filtered = tools.filter(tool => {
    const matchCategory = categories.some(cat => tool.categories.includes(cat));
    const matchFree = freeOnly ? tool.free : true;
    return matchCategory && matchFree;
  });

  res.json(filtered);
};
