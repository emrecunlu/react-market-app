import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { usePersonal } from '../../../store/features/personal'
import { Box } from '@mui/material'
import SaleLeftMenu from './left/SaleLeftMenu'
import { toast } from 'react-hot-toast'
import SocketProvider from '../../../context/SocketProvider'

const SaleLayout = () => {
  const { isLoggedIn } = usePersonal()

  if (!isLoggedIn) return <Navigate to="/auth/login" />

  useEffect(() => {
    window.electron.ipcRenderer.on('slip:status', (event, data) => {
      if (data?.ok) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    })
  }, [])

  return (
    <SocketProvider>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex'
        }}
      >
        <SaleLeftMenu />
        <Outlet />
      </Box>
    </SocketProvider>
  )
}

export default SaleLayout
