import express from "express";
import cors from "cors";

import areaRoutes from "./src/routes/area.route.js";
import roomRoutes from "./src/routes/room.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/areas", areaRoutes);
app.use("/api/rooms", roomRoutes);

app.listen(3000, () => {
  console.log("🔥 Backend running at http://localhost:3000");
});
