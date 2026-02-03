import express from "express";
import cors from "cors";
import areaRouter from "./src/routes/area.route.js";
import roomRouter from "./src/routes/room.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/areas", areaRouter);
app.use("/api/rooms", roomRouter);

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
