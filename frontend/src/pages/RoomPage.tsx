import { useState } from "react";
import type { Room } from "../types/room";
import { getRooms, addRoom } from "../services/room.service";
import { getAreas } from "../services/area.service";

const RoomPage = () => {
  const areas = getAreas(); // luôn là array
  const [rooms, setRooms] = useState<Room[]>(getRooms());

  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState<number>(areas[0]?.id || 0);
  const [capacity, setCapacity] = useState(6);

  const handleAdd = () => {
    if (!name.trim()) return alert("Nhập tên phòng");

    const newRoom = addRoom({
      name,
      areaId,
      capacity,
      occupied: 0,
    });

    setRooms([...rooms, newRoom]);
    setName("");
  };

  const getStatus = (r: Room) =>
    r.occupied < r.capacity ? (
      <span className="badge bg-success">Còn chỗ</span>
    ) : (
      <span className="badge bg-danger">Đầy</span>
    );

  return (
    <div className="container mt-4">
      <h3>Quản lý phòng</h3>

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
            onChange={(e) => setAreaId(Number(e.target.value))}
          >
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <input
            type="number"
            className="form-control"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </div>

        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Phòng</th>
            <th>Khu</th>
            <th>Sức chứa</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{areas.find((a) => a.id === r.areaId)?.name}</td>
              <td>
                {r.occupied}/{r.capacity}
              </td>
              <td>{getStatus(r)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomPage;
