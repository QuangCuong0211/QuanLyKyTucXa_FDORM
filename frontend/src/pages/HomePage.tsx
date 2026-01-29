import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Hệ thống quản lý ký túc xá</h1>

      <ul>
        <li>
          <Link to="/areas">Quản lý khu</Link>
        </li>
        <li>
          <Link to="/rooms">Quản lý phòng</Link>
        </li>
      </ul>
    </div>
  );
}
