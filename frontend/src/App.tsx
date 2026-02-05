import { useRoutes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import ClientLayout from "./layouts/ClientLayout";
import HomeAdmin from "./pages/admin/HomeAdmin";
import RegisterKTX from "./pages/student/RegisterKTX";
import RoomPage from "./pages/manager/RoomPage";
import ManegerLayout from "./layouts/ManegerLayout/ManegerLayout";
import AreaPage from "./pages/manager/AreaPage";
import StudentPage from "./pages/manager/StudentPage";

function App() {
  return useRoutes([
    { path: "/", Component: ClientLayout, children: [
      { path: "student/register", Component: RegisterKTX }
    ] },
    { path: "/admin", Component: LayoutAdmin, children: [{ 
      index: true, Component: HomeAdmin }
    ] },
    { path: "/manager", Component: ManegerLayout, children: [
        { path: "areas", Component: AreaPage },
        { path: "rooms", Component: RoomPage },
        { path: "students", Component: StudentPage }
      ] }
  ]);
}

export default App;
