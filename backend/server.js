import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import areaRoutes from "./src/routes/area.route.js";
import roomRoutes from "./src/routes/room.route.js";
import studentRoutes from "./src/routes/student.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/areas", areaRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/students", studentRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/registerktx", registerKTXRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/ktx")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
