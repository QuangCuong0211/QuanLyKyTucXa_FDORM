import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-primary fw-bold">KÝ TÚC XÁ SINH VIÊN</h5>
            <p className="small text-secondary">
              Hệ thống đăng ký và quản lý ký túc xá trực tuyến.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Liên kết</h6>
            <ul className="list-unstyled">
              <li><Link className="text-secondary text-decoration-none" to="/">Trang chủ</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/register">Đăng ký KTX</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/guide">Hướng dẫn</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Liên hệ</h6>
            <p className="small mb-1">Email: kamitest2005@gmail.com</p>
            <p className="small mb-1">Hotline: 0854906810</p>
            <p className="small mb-0">Địa chỉ: Trịnh Văn Bô - Từ Liêm - Hà Nội</p>
          </div>
        </div>
      </div>

      <div className="bg-white text-center py-2 small">
        © {new Date().getFullYear()} Ký túc xá sinh viên
      </div>
    </footer>
  );
};

export default Footer;
