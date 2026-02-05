import { useEffect, useState } from "react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
} from "../../services/room.service";
import { getAreas } from "../../services/area.service";

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
  const [filterArea, setFilterArea] = useState<number>(0);
  const [keyword, setKeyword] = useState("");

  const [form, setForm] = useState({
    id: 0,
    name: "",
    areaId: 0,
    capacity: 6,
    price: 800000
  });

  const [showModal, setShowModal] = useState(false);

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
    setForm(f => ({ ...f, areaId: areaData[0]?.id || 0 }));
  };

  /* ===== CRUD ===== */
  const handleSubmit = async () => {
    if (!form.name) return alert("Nhập tên phòng");

    if (form.id) {
      const updated = await updateRoom(form.id, form);
      setRooms(rooms.map(r => r.id === updated.id ? updated : r));
    } else {
      const created = await createRoom(form);
      setRooms([...rooms, created]);
    }

    closeModal();
  };

  const handleEdit = (room: Room) => {
    setForm(room);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa phòng này?")) return;
    await deleteRoom(id);
    setRooms(rooms.filter(r => r.id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({
      id: 0,
      name: "",
      areaId: areas[0]?.id || 0,
      capacity: 6,
      price: 800000
    });
  };

  /* ===== FILTER + SEARCH ===== */
  const filteredRooms = rooms.filter(r =>
    (filterArea === 0 || r.areaId === filterArea) &&
    r.name.toLowerCase().includes(keyword.toLowerCase())
  );

  /* ===== STATS ===== */
  const total = rooms.length;
  const available = rooms.filter(r => r.occupied < r.capacity).length;
  const full = total - available;

  return (
    <div className="container mt-4">
      <h3>Quản lý phòng</h3>

      {/* STATS */}
      <div className="row mb-3">
        <div className="col">Tổng phòng: <b>{total}</b></div>
        <div className="col text-success">Còn chỗ: <b>{available}</b></div>
        <div className="col text-danger">Đã đầy: <b>{full}</b></div>
      </div>

      {/* FILTER */}
      <div className="row g-2 mb-3">
        <div className="col">
          <input className="form-control"
            placeholder="Tìm phòng..."
            onChange={e => setKeyword(e.target.value)} />
        </div>

        <div className="col">
          <select className="form-select"
            onChange={e => setFilterArea(Number(e.target.value))}>
            <option value={0}>Tất cả khu</option>
            {areas.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="col-auto">
          <button className="btn btn-primary"
            onClick={() => setShowModal(true)}>
            + Thêm phòng
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Phòng</th>
            <th>Khu</th>
            <th>Sức chứa</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th width="150">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{areas.find(a => a.id === r.areaId)?.name}</td>
              <td>{r.occupied}/{r.capacity}</td>
              <td>{r.price.toLocaleString()} đ</td>
              <td>
                {r.occupied < r.capacity
                  ? <span className="badge bg-success">Còn chỗ</span>
                  : <span className="badge bg-danger">Đầy</span>}
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(r)}>
                  Sửa
                </button>
                <button className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(r.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {form.id ? "Sửa phòng" : "Thêm phòng"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <input className="form-control mb-2"
                  placeholder="Tên phòng"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />

                <select className="form-select mb-2"
                  value={form.areaId}
                  onChange={e => setForm({ ...form, areaId: Number(e.target.value) })}>
                  {areas.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>

                <input type="number" className="form-control mb-2"
                  value={form.capacity}
                  onChange={e => setForm({ ...form, capacity: Number(e.target.value) })} />

                <input type="number" className="form-control"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
