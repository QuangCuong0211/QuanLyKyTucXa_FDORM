const rooms = require("../data/rooms");

exports.getAllRooms = (req, res) => {
  res.json(rooms);
};

exports.createRoom = (req, res) => {
  const newRoom = {
    id: Date.now(),
    ...req.body,
    current: 0,
  };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
};
