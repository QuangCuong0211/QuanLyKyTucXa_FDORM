import { useEffect, useState } from "react";
import { getRooms, createRoom, deleteRoom } from "../../services/room.service";
import { getAreas } from "../../services/area.service";
import type { Room } from "../../types/room";
import type { Area } from "../../types/area";

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [areaId, setAreaId] = useState("");

  const fetchData = async () => {
    const [roomData, areaData] = await Promise.all([
      getRooms(),
      getAreas(),
    ]);
    setRooms(roomData);
    setAreas(areaData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!name || !areaId) {
      alert("Nhập tên phòng và chọn khu");
      return;
    }

    await createRoom({ name, capacity, areaId });
    setName("");
    setCapacity(0);
    setAreaId("");
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteRoom(id);
    fetchData();
  };

  return (
    <div className="p-4">
      <h3>Quản lý phòng</h3>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Tên phòng"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="form-control"
          placeholder="Sức chứa"
          value={capacity}
          onChange={(e) => setCapacity(+e.target.value)}
        />

        <select
          className="form-select"
          value={areaId}
          onChange={(e) => setAreaId(e.target.value)}
        >
          <option value="">-- Chọn khu --</option>
          {areas.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
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
            <th>Tên phòng</th>
            <th>Khu</th>
            <th>Sức chứa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.areaId?.name}</td>
              <td>{r.capacity}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(r._id)}
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
