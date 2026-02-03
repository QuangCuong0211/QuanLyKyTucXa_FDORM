import express from "express";
import { areas } from "../data/areas.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(areas);
});

export default router;
