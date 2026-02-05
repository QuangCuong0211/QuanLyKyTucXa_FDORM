import { useEffect, useState } from "react";
import { getAreas, createArea, deleteArea } from "../../services/area.service";
import type { Area } from "../../types/area";

export default function AreaPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"NAM" | "NU">("NAM");
  const [totalRooms, setTotalRooms] = useState(0);

  const fetchAreas = async () => {
    const data = await getAreas();
    setAreas(data);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleAdd = async () => {
    await createArea({ name, gender, totalRooms });
    setName("");
    setTotalRooms(0);
    fetchAreas();
  };

  const handleDelete = async (id: string) => {
    await deleteArea(id);
    fetchAreas();
  };

  return (
    <div className="p-4">
      <h3>Quản lý khu</h3>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Tên khu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-select"
          value={gender}
          onChange={(e) => setGender(e.target.value as "NAM" | "NU")}
        >
          <option value="NAM">Nam</option>
          <option value="NU">Nữ</option>
        </select>

        <input
          type="number"
          className="form-control"
          placeholder="Số phòng"
          value={totalRooms}
          onChange={(e) => setTotalRooms(+e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleAdd}>
          Thêm
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên khu</th>
            <th>Giới tính</th>
            <th>Số lượng phòng</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((a) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.gender}</td>
              <td>{a.totalRooms}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a._id)}
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
