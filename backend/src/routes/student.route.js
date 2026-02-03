import express from "express";
import { students } from "../data/students.js";
import { rooms } from "../data/rooms.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(students);
});


router.post("/", (req, res) => {
  const { name, mssv, roomId } = req.body;
  const room = rooms.find(r => r.id === roomId);

  if (!room) return res.status(400).json({ message: "Phòng không tồn tại" });
  if (room.occupied >= room.capacity)
    return res.status(400).json({ message: "Phòng đã đầy" });

  const newStudent = {
    id: Date.now(),
    name,
    mssv,
    roomId
  };

  students.push(newStudent);
  room.occupied++;

  res.status(201).json(newStudent);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.sendStatus(404);

  const student = students[index];
  const room = rooms.find(r => r.id === student.roomId);
  if (room) room.occupied--;

  students.splice(index, 1);
  res.sendStatus(204);
});

export default router;
