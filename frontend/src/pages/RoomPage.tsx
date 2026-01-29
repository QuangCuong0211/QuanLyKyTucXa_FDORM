import { useState } from "react";
import type { Room } from "../types/room";
import { getRooms, addRoom } from "../services/roomService";
import { getAreas } from "../services/areaService";

const RoomPage = () => {
  const areas = getAreas();
  const [rooms, setRooms] = useState<Room[]>(getRooms());

  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState(areas[0]?.id || 0);
  const [capacity, setCapacity] = useState(6);

  const handleAdd = () => {
    const newRoom = addRoom({
      name,
      areaId,
      capacity,
      occupied: 0,
    });
    setRooms([...rooms, newRoom]);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý phòng</h2>

      <input
        placeholder="Tên phòng"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select onChange={(e) => setAreaId(Number(e.target.value))}>
        {areas.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
      />

      <button onClick={handleAdd}>Thêm phòng</button>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Phòng</th>
            <th>Khu</th>
            <th>Sức chứa</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{areas.find((a) => a.id === r.areaId)?.name}</td>
              <td>{r.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomPage;
