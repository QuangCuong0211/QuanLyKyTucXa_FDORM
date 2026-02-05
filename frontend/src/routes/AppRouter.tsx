import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AreaPage from "../pages/manager/AreaPage";
import RoomPage from "../pages/manager/RoomPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/areas" element={<AreaPage />} />
      <Route path="/rooms" element={<RoomPage />} />
    </Routes>
  );
}
