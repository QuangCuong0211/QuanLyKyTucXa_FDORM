import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AreaPage from "./pages/AreaPage";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/areas" />} />
        <Route path="/areas" element={<AreaPage />} />
        <Route path="/rooms" element={<RoomPage />} />
      </Routes>
    </>
  );
}

export default App;
