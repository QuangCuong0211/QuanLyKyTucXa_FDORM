import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import type { Area } from "../../api/client";

export default function AdminAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Area | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const list = await api.areas.list();
      setAreas(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải danh sách");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setModalOpen(true);
    setError("");
  };

  const openEdit = (a: Area) => {
    setEditing(a);
    setName(a.name);
    setDescription(a.description || "");
    setModalOpen(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);
    try {
      if (editing) {
        await api.areas.update(editing.id, { name, description });
      } else {
        await api.areas.create({ name, description });
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
    if (!window.confirm("Bạn có chắc muốn xóa khu này?")) return;
    try {
      await api.areas.delete(id);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Lỗi xóa");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 mb-0 text-primary">Quản lý khu</h1>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          Thêm khu
        </button>
      </div>
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
                  <th>Tên khu</th>
                  <th>Mô tả</th>
                  <th width={120} className="text-end">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {areas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-muted py-4">
                      Chưa có khu nào.
                    </td>
                  </tr>
                ) : (
                  areas.map((a) => (
                    <tr key={a.id}>
                      <td className="fw-medium">{a.name}</td>
                      <td className="text-muted small">{a.description || "—"}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => openEdit(a)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(a.id)}
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
                <h5 className="modal-title">{editing ? "Sửa khu" : "Thêm khu"}</h5>
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
                  <div className="mb-3">
                    <label className="form-label">Tên khu *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="VD: Khu A"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tùy chọn"
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
