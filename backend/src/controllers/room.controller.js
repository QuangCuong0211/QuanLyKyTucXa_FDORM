import Room from "../models/room.js";

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("areaId", "name");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { name, capacity, areaId } = req.body;

    if (!name || !areaId) {
      return res.status(400).json({ message: "Thiếu name hoặc areaId" });
    }

    const room = await Room.create({ name, capacity, areaId });
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa phòng thành công" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
