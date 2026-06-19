
const express = require("express");
const cors = require("cors");

const imageRoutes = require("./src/routes/imageRoutes");
const comparisonRoutes = require("./src/routes/comparisonRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");
const statsRoutes = require("./src/routes/statsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/images", imageRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/stats", statsRoutes);

app.use("/images",express.static("storage/images"));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server Started");
});