const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const quotesRoutes = require("./routes/quotes");
const weatherRoutes = require("./routes/weather");
const newsRoutes = require("./routes/news");
const currencyRoutes = require("./routes/currency");
const aiRoutes = require("./routes/aiRecommender");
const emailRoutes = require("./routes/email");
const authRoutes = require("./routes/auth");
const preferencesRoutes = require("./routes/preferences");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/quotes", quotesRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/currency", currencyRoutes);
app.use("/api/ai-tools", aiRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferencesRoutes);

app.get("/", (req, res) => res.send("MyDailyPanel API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
