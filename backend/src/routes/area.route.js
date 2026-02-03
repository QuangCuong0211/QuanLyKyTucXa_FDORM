import express from "express";
import { areas } from "../data/areas.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(areas);
});

router.post("/", (req, res) => {
  const newArea = {
    id: Date.now(),
    ...req.body
  };
  areas.push(newArea);
  res.json(newArea);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  areas = areas.filter(a => a.id !== id);
  res.json({ success: true });
});

export default router;
