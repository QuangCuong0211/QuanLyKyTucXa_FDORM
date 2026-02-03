import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand">QL KTX</span>
      <div className="navbar-nav">
        <Link className="nav-link" to="/areas">Khu</Link>
        <Link className="nav-link" to="/rooms">Phòng</Link>
      </div>
    </nav>
  );
}
