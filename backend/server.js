import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import areaRoutes from "./src/routes/area.route.js";
import roomRoutes from "./src/routes/room.route.js";
import studentRoutes from "./src/routes/student.route.js";
import registerKTX from "./src/routes/registerktx.route.js";

const app = express();
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}
app.use(cors());
app.use(express.json());

app.use("/api/areas", areaRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/students", studentRoutes);
app.use("/src/uploads", express.static("uploads"));
app.use("/api/registerktx", registerKTX);

mongoose
  .connect("mongodb://127.0.0.1:27017/ktx")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
