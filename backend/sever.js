const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test API
app.get("/", (req, res) => {
  res.send("Backend KTX đang chạy...");
});

// routes
// app.use("/api/rooms", roomRoutes);
// app.use("/api/areas", areaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
