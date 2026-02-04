import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AreaPage from "./pages/AreaPage";
import RoomPage from "./pages/RoomPage";
import StudentPage from "./pages/StudentPage";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import ClientLayout from "./layouts/ClientLayout";
import HomeAdmin from "./pages/admin/HomeAdmin";
import RegisterKTX from "./pages/student/RegisterKTX";
import RegistrationPeriod from "./layouts/admin/RegistrationPeriod";
import ApproveRegistration from "./layouts/admin/ApproveRegistration";

function App() {
  const router = useRoutes([
    {path:'/',Component:ClientLayout,children:[
      {path:'/student/register',Component:RegisterKTX},
      {path:'/student/home',Component:HomeAdmin},


    ]},
    {path:'/admin',Component:LayoutAdmin,children:[
      { path:'/admin/dang-ki-ktx/dot-dki-ktx', Component: RegistrationPeriod },
      { path:'/admin/dang-ki-ktx/duyet-don-ktx', Component: ApproveRegistration }
    ]}
  ])
  return router
}

export default App;
