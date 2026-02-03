import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import registerKTXRouter from "./routes/registerktx.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/registerktx", registerKTXRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/ktx")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server chạy port 3000");
});
