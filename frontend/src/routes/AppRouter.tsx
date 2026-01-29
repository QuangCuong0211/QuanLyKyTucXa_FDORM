import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AreaPage from "../pages/AreaPage";
import RoomPage from "../pages/RoomPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/areas" element={<AreaPage />} />
      <Route path="/rooms" element={<RoomPage />} />
    </Routes>
  );
}
