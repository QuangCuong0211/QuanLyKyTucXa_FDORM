import { useEffect, useState } from "react";
import { getRooms } from "../../services/room.service";
import {
  createStudent,
  deleteStudent,
  getStudents,
} from "../../services/student.service";
import type { Room } from "../../types/room";
import type { Student } from "../../types/students";

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [name, setName] = useState("");
  const [mssv, setMssv] = useState("");
  const [gender, setGender] = useState<"NAM" | "NU">("NAM");
  const [roomId, setRoomId] = useState("");

  const fetchData = async () => {
    setStudents(await getStudents());
    setRooms(await getRooms());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!name || !mssv || !roomId) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const room = rooms.find((r) => r._id === roomId);
    if (!room || room.remaining === 0) {
      alert("Phòng đã đầy");
      return;
    }

    await createStudent({ name, mssv, gender, roomId });
    alert("Thêm sinh viên thành công");

    setName("");
    setMssv("");
    setRoomId("");
    fetchData();
  };

  return (
    <div className="p-4">
      <h3 className="mb-3">Quản lý sinh viên</h3>

      {/* FORM */}
      <div className="row g-2 mb-4">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Tên sinh viên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="MSSV"
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value as "NAM" | "NU")}
          >
            <option value="NAM">Nam</option>
            <option value="NU">Nữ</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">-- Chọn phòng --</option>
            {rooms.map((r) => (
              <option key={r._id} value={r._id} disabled={r.remaining === 0}>
                {r.name} ({r.remaining}/{r.capacity}){" "}
                {r.remaining === 0 ? "- Đã đầy" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Tên</th>
            <th>MSSV</th>
            <th>Giới tính</th>
            <th>Phòng</th>
            <th width="100">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.mssv}</td>
              <td>{s.gender}</td>
              <td>{s.roomId?.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(s._id).then(fetchData)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
