import { Routes, Route, Navigate } from 'react-router-dom'
import ClientLayout from './layout/ClientLayout'
import RegisterKTX from './page/RegisterKTX'
import Login from './page/Login'
import RegisterAccount from './page/RegisterAccount'
import Home from './page/Home'
import ProtectedRoute from './components/ProtectedRoute'
import LayoutAdmin from './layout/admin/LayoutAdmin'
import AdminDashboard from './page/admin/AdminDashboard'
import AdminAreas from './page/admin/AdminAreas'
import AdminRooms from './page/admin/AdminRooms'
import AdminRegistrations from './page/admin/AdminRegistrations'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="student/register" element={<ProtectedRoute><RegisterKTX /></ProtectedRoute>} />
      </Route>
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/dang-ky-tai-khoan" element={<RegisterAccount />} />
      <Route path="/admin" element={<ProtectedRoute roles={['admin', 'staff']} fallback="/"><LayoutAdmin /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="khu" element={<AdminAreas />} />
        <Route path="phong" element={<AdminRooms />} />
        <Route path="dang-ky-ktx" element={<AdminRegistrations />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
