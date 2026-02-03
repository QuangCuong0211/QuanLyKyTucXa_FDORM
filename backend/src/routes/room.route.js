import express from "express";
import { rooms } from "../data/rooms.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(rooms);
});

router.post("/", (req, res) => {
  const newRoom = {
    id: Date.now(),
    occupied: 0,
    ...req.body
  };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  rooms[index] = { ...rooms[index], ...req.body };
  res.json(rooms[index]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  rooms.splice(index, 1);
  res.json({ success: true });
});

export default router;
