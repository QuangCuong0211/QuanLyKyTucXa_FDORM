import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="ktx-main">
      <div className="container">
        <div className="ktx-hero">
          <h2>Hệ thống quản lý Ký túc xá</h2>
          <p>Đăng ký ở, tra cứu phòng và quản lý thông tin sinh viên một cách thuận tiện.</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/student/register" className="text-decoration-none">
              <div className="ktx-feature-card">
                <h3>Đăng ký ở KTX</h3>
                <p>Gửi đơn đăng ký ở ký túc xá trực tuyến. Cần đăng nhập tài khoản sinh viên.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <div className="ktx-feature-card">
              <h3>Tra cứu phòng</h3>
              <p>Xem thông tin các khu, phòng và tình trạng còn trống.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="ktx-feature-card">
              <h3>Hướng dẫn</h3>
              <p>Quy định, nội quy và hướng dẫn đăng ký ở ký túc xá.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
