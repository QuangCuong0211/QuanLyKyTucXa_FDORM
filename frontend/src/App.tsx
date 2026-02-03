import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AreasPage from "./pages/AreaPage";
import RoomsPage from "./pages/RoomPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/areas" />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
      </Routes>
    </>
  );
}
