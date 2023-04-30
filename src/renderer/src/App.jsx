import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
import SaleLayout from './pages/layouts/sale/SaleLayout'
import SalePage from './pages/sale/SalePage'
import LoginPage from './pages/auth/LoginPage'
import PrinterPage from './pages/print/PrinterPage'
import { useSettings } from './store/features/settings'
import SettingsHelper from './utils/helpers/settingsHelper'
import { useMediaQuery } from 'react-responsive'

const App = () => {
  const { settings } = useSettings()

  useEffect(() => {
    SettingsHelper.initSettings(settings)
  }, [])

  const isLargeDevice = useMediaQuery({ query: '(min-width: 1366px)' })

  !isLargeDevice
    ? window.electron.webFrame.setZoomFactor(0.85)
    : window.electron.webFrame.setZoomFactor(1)

  return (
    <Routes>
      <Route path="/" element={<SaleLayout />}>
        <Route index element={<SalePage />} />
      </Route>
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="/printer" element={<PrinterPage />} />
    </Routes>
  )
}

export default App
