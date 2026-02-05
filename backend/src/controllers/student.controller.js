import Student from "../models/student.js";

export const getStudents = async (req, res) => {
  const data = await Student.find().populate("roomId", "name");
  res.json(data);
};

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Xóa sinh viên thành công" });
};
