import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/areas" style={{ marginRight: 10 }}>
        Quản lý khu
      </Link>
      <Link to="/rooms">
        Quản lý phòng
      </Link>
    </nav>
  );
};

export default Navbar;
