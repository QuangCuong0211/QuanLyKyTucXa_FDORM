import { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent } from "../../services/student.service";
import { getRooms } from "../../services/room.service";

export default function StudentPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [gender, setGender] = useState("NAM");
  const [roomId, setRoomId] = useState("");

  const fetchData = async () => {
    setStudents(await getStudents());
    setRooms(await getRooms());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await createStudent({ name, code, gender, roomId });
    fetchData();
  };

  return (
    <div className="p-4">
      <h3>Quản lý sinh viên</h3>

      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Mã SV" onChange={(e) => setCode(e.target.value)} />
        <input className="form-control" placeholder="Tên SV" onChange={(e) => setName(e.target.value)} />

        <select className="form-select" onChange={(e) => setGender(e.target.value)}>
          <option value="NAM">Nam</option>
          <option value="NU">Nữ</option>
        </select>

        <select className="form-select" onChange={(e) => setRoomId(e.target.value)}>
          <option value="">Chọn phòng</option>
          {rooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={handleAdd}>
          Thêm
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Phòng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.code}</td>
              <td>{s.name}</td>
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
