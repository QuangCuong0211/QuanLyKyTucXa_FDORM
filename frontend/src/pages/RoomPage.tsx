import { useEffect, useState } from "react";
import { getRooms, createRoom, deleteRoom } from "../services/room.service";
import { getAreas } from "../services/area.service";

interface Room {
  id: number;
  name: string;
  areaId: number;
  capacity: number;
  occupied: number;
  price: number;
}

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState<number>(0);
  const [capacity, setCapacity] = useState(6);
  const [price, setPrice] = useState(800000);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [roomData, areaData] = await Promise.all([
      getRooms(),
      getAreas()
    ]);
    setRooms(roomData);
    setAreas(areaData);
    setAreaId(areaData[0]?.id || 0);
  };

  const handleAdd = async () => {
    if (!name) return alert("Nhập tên phòng");

    const newRoom = await createRoom({
      name,
      areaId,
      capacity,
      price
    });

    setRooms([...rooms, newRoom]);
    setName("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa phòng này?")) return;
    await deleteRoom(id);
    setRooms(rooms.filter(r => r.id !== id));
  };

  const renderStatus = (r: Room) =>
    r.occupied < r.capacity
      ? <span className="badge bg-success">Còn chỗ</span>
      : <span className="badge bg-danger">Đầy</span>;

  return (
    <div className="container mt-4">
      <h3>Quản lý phòng</h3>

      {/* FORM */}
      <div className="row g-2 mb-3">
        <div className="col">
          <input className="form-control"
            placeholder="Tên phòng"
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>

        <div className="col">
          <select className="form-select"
            value={areaId}
            onChange={e => setAreaId(Number(e.target.value))}>
            {areas.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="col">
          <input type="number" className="form-control"
            value={capacity}
            onChange={e => setCapacity(Number(e.target.value))} />
        </div>

        <div className="col">
          <input type="number" className="form-control"
            value={price}
            onChange={e => setPrice(Number(e.target.value))} />
        </div>

        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Phòng</th>
            <th>Khu</th>
            <th>Sức chứa</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th width="120">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{areas.find(a => a.id === r.areaId)?.name}</td>
              <td>{r.occupied}/{r.capacity}</td>
              <td>{r.price.toLocaleString()} đ</td>
              <td>{renderStatus(r)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(r.id)}>
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
