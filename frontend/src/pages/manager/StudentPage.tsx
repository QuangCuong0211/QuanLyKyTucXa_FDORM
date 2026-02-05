import { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent } from "../../services/student.service";
import { getRooms } from "../../services/room.service";

export default function StudentPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    mssv: "",
    roomId: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [studentData, roomData] = await Promise.all([
      getStudents(),
      getRooms()
    ]);
    setStudents(studentData);
    setRooms(roomData);
    setForm(f => ({ ...f, roomId: roomData[0]?.id || 0 }));
  };

  const handleAdd = async () => {
    try {
      const newStudent = await createStudent(form);
      setStudents([...students, newStudent]);
      alert("Thêm sinh viên thành công");
    } catch (error) {
      alert("Phòng đã đầy");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa sinh viên?")) return;
    await deleteStudent(id);
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý sinh viên</h3>

      {/* FORM */}
      <div className="row g-2 mb-3">
        <div className="col">
          <input className="form-control"
            placeholder="Họ tên"
            onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="col">
          <input className="form-control"
            placeholder="MSSV"
            onChange={e => setForm({ ...form, mssv: e.target.value })} />
        </div>

        <div className="col">
          <select className="form-select"
            onChange={e => setForm({ ...form, roomId: Number(e.target.value) })}>
            {rooms.map(r => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.occupied}/{r.capacity})
              </option>
            ))}
          </select>
        </div>

        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>MSSV</th>
            <th>Phòng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.mssv}</td>
              <td>{rooms.find(r => r.id === s.roomId)?.name}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}>
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
