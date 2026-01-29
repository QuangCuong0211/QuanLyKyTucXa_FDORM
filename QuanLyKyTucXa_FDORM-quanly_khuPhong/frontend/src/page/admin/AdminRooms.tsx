import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import type { Area, Room } from "../../api/client";

export default function AdminRooms() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [areaId, setAreaId] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(6);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [areasList, roomsList] = await Promise.all([
        api.areas.list(),
        api.rooms.list(),
      ]);
      setAreas(areasList);
      setRooms(roomsList);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getAreaName = (id: string) => areas.find((a) => a.id === id)?.name || id;

  const openCreate = () => {
    setEditing(null);
    setAreaId(areas[0]?.id || "");
    setName("");
    setCapacity(6);
    setModalOpen(true);
    setError("");
  };

  const openEdit = (r: Room) => {
    setEditing(r);
    setAreaId(r.areaId);
    setName(r.name);
    setCapacity(r.capacity);
    setModalOpen(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);
    try {
      if (editing) {
        await api.rooms.update(editing.id, { name, capacity });
      } else {
        await api.rooms.create({ areaId, name, capacity });
      }
      setModalOpen(false);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi lưu");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng này?")) return;
    try {
      await api.rooms.delete(id);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Lỗi xóa");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 mb-0 text-primary">Quản lý phòng</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openCreate}
          disabled={areas.length === 0}
        >
          Thêm phòng
        </button>
      </div>
      {areas.length === 0 && !loading && (
        <div className="alert alert-warning">
          Cần tạo ít nhất một khu trước khi thêm phòng.
        </div>
      )}
      {error && !modalOpen && (
        <div className="alert alert-danger py-2">{error}</div>
      )}
      {loading ? (
        <div className="text-center py-5">Đang tải...</div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Khu</th>
                  <th>Tên phòng</th>
                  <th>Sức chứa</th>
                  <th>Đã ở</th>
                  <th>Trạng thái</th>
                  <th width={120} className="text-end">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      Chưa có phòng nào.
                    </td>
                  </tr>
                ) : (
                  rooms.map((r) => (
                    <tr key={r.id}>
                      <td>{getAreaName(r.areaId)}</td>
                      <td className="fw-medium">{r.name}</td>
                      <td>{r.capacity}</td>
                      <td>{r.currentOccupancy}</td>
                      <td>
                        <span
                          className={`badge ${
                            r.status === "available" ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {r.status === "available" ? "Trống" : r.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => openEdit(r)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(r.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? "Sửa phòng" : "Thêm phòng"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Đóng"
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger py-2">{error}</div>}
                  {!editing && (
                    <div className="mb-3">
                      <label className="form-label">Khu *</label>
                      <select
                        className="form-select"
                        value={areaId}
                        onChange={(e) => setAreaId(e.target.value)}
                        required
                      >
                        <option value="">Chọn khu</option>
                        {areas.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Tên phòng *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="VD: A101"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sức chứa (người) *</label>
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitLoading}
                  >
                    {submitLoading ? "Đang lưu..." : "Lưu"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
