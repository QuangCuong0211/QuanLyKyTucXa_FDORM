import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import type { Registration } from "../../api/client";

export default function AdminRegistrations() {
  const [list, setList] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.registrations.list();
      setList(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải danh sách");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.registrations.updateStatus(id, status);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Lỗi cập nhật");
    }
  };

  const statusLabel: Record<string, string> = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
  };

  return (
    <div>
      <h1 className="h4 mb-4 text-primary">Đơn đăng ký ở KTX</h1>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Đang tải...</div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Họ tên</th>
                  <th>Mã SV</th>
                  <th>Trường</th>
                  <th>Ngày đăng ký</th>
                  <th>Trạng thái</th>
                  <th width={180} className="text-end">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      Chưa có đơn nào.
                    </td>
                  </tr>
                ) : (
                  list.map((r) => (
                    <tr key={r.id}>
                      <td className="fw-medium">{r.fullName}</td>
                      <td>{r.studentId}</td>
                      <td className="small">{r.school}</td>
                      <td className="small">
                        {r.createdAt
                          ? new Date(r.createdAt).toLocaleDateString("vi-VN")
                          : "—"}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            r.status === "approved"
                              ? "bg-success"
                              : r.status === "rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                          }`}
                        >
                          {statusLabel[r.status] || r.status}
                        </span>
                      </td>
                      <td className="text-end">
                        {r.status === "pending" && (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success me-1"
                              onClick={() => updateStatus(r.id, "approved")}
                            >
                              Duyệt
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => updateStatus(r.id, "rejected")}
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
