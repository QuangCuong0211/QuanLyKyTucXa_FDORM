import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import AreaPage from "./pages/AreaPage";
import RoomPage from "./pages/RoomPage";
// import RoomDetailPage from "./pages/RoomDetailPage";
import StudentPage from "./pages/StudentPage";

function App() {
  const router = useRoutes([
    {path:'/',Component:ClientLayout,children:[
      {path:'/student/register',Component:RegisterKTX},
      {path:'/student/home',Component:HomeAdmin},


    ]},
    {path:'/admin',Component:LayoutAdmin,children:[
      {path:'',Component:HomeAdmin}
    ]}
  ])
  return router
}

export default App;
