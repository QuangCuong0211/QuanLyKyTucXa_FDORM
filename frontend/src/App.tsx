import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import ClientLayout from './layout/ClientLayout'
import RegisterKTX from './page/RegisterKTX'
import LayoutAdmin from './layout/admin/LayoutAdmin'
import ApproveRegistration from './layout/admin/ApproveRegistration'
import RegistrationPeriod from './layout/admin/RegistrationPeriod'

function App() {
  const router = useRoutes([
    {
      path: '/',Component: LayoutAdmin,children: [
        { path: 'student/register', Component: RegisterKTX },
        { path: 'admin/dang-ki-ktx/dot-dki-ktx', Component: RegistrationPeriod },
        { path: 'admin/dang-ki-ktx/duyet-don-ktx', Component: ApproveRegistration }
      ]
    }
  ])
  return router
}

export default App
