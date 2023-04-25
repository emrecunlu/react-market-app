import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
import SaleLayout from './pages/layouts/sale/SaleLayout'
import SalePage from './pages/sale/SalePage'
import LoginPage from './pages/auth/LoginPage'
import PrinterPage from './pages/print/PrinterPage'

const App = () => {
  /* const connectSocket = async () => {
    const ipAddress = await window.api.getLocalAddress()

    const socket = new WebSocket(`ws://${ipAddress}:1235`)

    socket.addEventListener('open', () => {
      const Data = {
        Payment: -1,
        SlipCopy: true,
        // ReportType :0,
        Data: [
          {
            DeptId: 4,
            Amount: 3,
            Price: 0.05,
            Name: 'Samsung Universe 9'
          },
          {
            DeptId: 3,
            Amount: 2,
            Price: 0.04,
            Name: 'MacBook Pro'
          },
          {
            DeptId: 2,
            Amount: 1,
            Price: 0.03,
            Name: 'HP Pavilion 15-DK1056WM'
          },
          {
            DeptId: 2,
            Amount: 6,
            Price: 0.02,
            Name: 'Fog Scent Xprssessio Perfume"'
          }
        ]
      }

      socket.send(
        JSON.stringify({
          ...Data
        })
      )
    })

    socket.addEventListener('message', (data) => {
      console.log('Veri: ' + JSON.stringify(data))
    })
  }

  useEffect(() => {
    connectSocket()
  }, []) */

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
