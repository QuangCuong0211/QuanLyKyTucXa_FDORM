import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import AreaPage from "./pages/AreaPage";
import RoomPage from "./pages/RoomPage";
// import RoomDetailPage from "./pages/RoomDetailPage";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/areas" />} />

        <Route path="/areas" element={<AreaPage />} />
        <Route path="/rooms" element={<RoomPage />} />
        {/* <Route path="/rooms/:id" element={<RoomDetailPage />} /> */}
        <Route path="/students" element={<StudentPage />} />
      </Routes>
    </>
  );
}

export default App;
