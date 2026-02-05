import Student from "../models/student.model.js";
import Room from "../models/room.model.js";

export const getStudents = async (req, res) => {
  const students = await Student.find().populate("roomId", "name");
  res.json(students);
};

export const createStudent = async (req, res) => {
  const { name, mssv, gender, roomId } = req.body;

  if (!name || !mssv || !gender || !roomId) {
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  }

  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ message: "Không tìm thấy phòng" });
  }

  if (room.students.length >= room.capacity) {
    return res.status(400).json({ message: "Phòng đã đầy" });
  }

  const student = await Student.create({
    name,
    mssv,
    gender,
    roomId,
  });

  room.students.push(student._id);
  await room.save();

  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Không tìm thấy sinh viên" });
  }

  const room = await Room.findById(student.roomId);
  if (room) {
    room.students = room.students.filter(
      (id) => id.toString() !== student._id.toString()
    );
    await room.save();
  }

  res.json({ message: "Xóa sinh viên thành công" });
};
