import React from 'react'

import { Route, Routes } from 'react-router-dom'
import SaleLayout from './pages/layouts/sale/SaleLayout'
import SalePage from './pages/sale/SalePage'
import LoginPage from './pages/auth/LoginPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SaleLayout />}>
        <Route index element={<SalePage />} />
      </Route>
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
