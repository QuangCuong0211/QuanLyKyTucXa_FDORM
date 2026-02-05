import Room from "../models/room.model.js";
import Student from "../models/student.model.js";

/**
 * GET /api/rooms
 * lấy danh sách phòng + populate khu + sinh viên
 */
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("areaId", "name gender")
      .populate("students", "name studentCode gender");

    const result = rooms.map((r) => ({
      _id: r._id,
      name: r.name,
      area: r.areaId,
      capacity: r.capacity,
      currentStudents: r.students.length,
      remainingSlots: r.capacity - r.students.length,
      isFull: r.students.length >= r.capacity,
      students: r.students,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/rooms
 * tạo phòng mới
 */
export const createRoom = async (req, res) => {
  try {
    const { name, areaId, capacity } = req.body;

    if (!name || !areaId || !capacity) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    if (![6, 8].includes(capacity)) {
      return res.status(400).json({
        message: "Sức chứa phòng chỉ được là 6 hoặc 8",
      });
    }

    const room = await Room.create({
      name,
      areaId,
      capacity,
      students: [],
    });

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/rooms/:id
 * xóa phòng (chỉ khi chưa có sinh viên)
 */
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Không tìm thấy phòng" });
    }

    if (room.students.length > 0) {
      return res.status(400).json({
        message: "Không thể xóa phòng đã có sinh viên",
      });
    }

    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa phòng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/rooms/:roomId/add-student
 * thêm sinh viên vào phòng
 */
export const addStudentToRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { studentId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Không tìm thấy phòng" });
    }

    if (room.students.length >= room.capacity) {
      return res.status(400).json({ message: "Phòng đã đầy" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    room.students.push(studentId);
    await room.save();

    res.json({ message: "Thêm sinh viên vào phòng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
