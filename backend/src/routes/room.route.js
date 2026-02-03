import express from "express";
import { rooms } from "../data/rooms.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(rooms);
});

router.post("/", (req, res) => {
  const newRoom = {
    id: Date.now(),
    ...req.body,
  };
  rooms.push(newRoom);
  res.json(newRoom);
});

export default router;
