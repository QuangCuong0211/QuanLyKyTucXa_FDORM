import { useEffect, useState } from "react";
import { createRoom, deleteRoom, getRooms } from "../../services/room.service";
import type { Room } from "../../types/room";
import { getAreas } from "../../services/area.service";
import type { Area } from "../../types/area";

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState("");
  const [capacity, setCapacity] = useState<6 | 8>(6);
  const [areas, setAreas] = useState<Area[]>([]);

  const fetchRooms = async () => {
    const data = await getRooms();
    setRooms(data);
  };
  const fetchAreas = async () => {
  const data = await getAreas();
  setAreas(data);
};

  useEffect(() => {
    fetchRooms();
    fetchAreas()
  }, []);

  const handleAdd = async () => {
    if (!name || !areaId) {
      alert("Thiếu dữ liệu");
      return;
    }

    await createRoom({ name, areaId, capacity });
    setName("");
    setCapacity(6);
    fetchRooms();
    alert("Thêm phòng thành công");
  };

  return (
    <div>
      <h2 className="mb-3">Quản lý phòng</h2>

      {/* FORM */}
      <div className="row g-2 mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Tên phòng"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col">
          <select
            className="form-select"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
          >
            <option value="">-- Chọn khu --</option>
            {areas.map((area) => (
              <option key={area._id} value={area._id}>
                {area.name} ({area.gender === "NAM" ? "Nam" : "Nữ"})
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value) as 6 | 8)}
          >
            <option value={6}>6 người</option>
            <option value={8}>8 người</option>
          </select>
        </div>

        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Tên phòng</th>
            <th>Khu</th>
            <th>Sức chứa</th>
            <th>Trạng thái</th>
            <th>Còn trống</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                Chưa có phòng
              </td>
            </tr>
          )}

          {rooms.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.areaId?.name}</td>
              <td>{r.capacity}</td>
              <td>
                <span
                  className={
                    r.status === "Đã đầy"
                      ? "badge bg-danger"
                      : "badge bg-success"
                  }
                >
                  {r.status}
                </span>
              </td>
              <td>{r.remaining}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRoom(r._id).then(fetchRooms)}
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
