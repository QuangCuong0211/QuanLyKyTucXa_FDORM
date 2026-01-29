import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="h4 mb-4 text-primary">Tổng quan</h1>
      <div className="row g-3">
        <div className="col-md-4">
          <Link to="/admin/khu" className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Quản lý khu</h5>
                <p className="card-text text-muted small mb-0">
                  Thêm, sửa, xóa các khu trong ký túc xá.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/phong" className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Quản lý phòng</h5>
                <p className="card-text text-muted small mb-0">
                  Quản lý danh sách phòng theo từng khu.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/dang-ky-ktx" className="text-decoration-none">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Đơn đăng ký KTX</h5>
                <p className="card-text text-muted small mb-0">
                  Xem và duyệt đơn đăng ký ở của sinh viên.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
