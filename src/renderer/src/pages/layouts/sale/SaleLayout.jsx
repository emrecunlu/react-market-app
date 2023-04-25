import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { usePersonal } from '../../../store/features/personal'
import { Box, Button, CssBaseline } from '@mui/material'
import SaleLeftMenu from './left/SaleLeftMenu'
import { useSettings } from '../../../store/features/settings'
import SettingsHelper from '../../../utils/helpers/settingsHelper.js'

const SaleLayout = () => {
  const { isLoggedIn } = usePersonal()
  const { settings } = useSettings()

  if (!isLoggedIn) return <Navigate to="/auth/login" />

  useEffect(() => {
    SettingsHelper.initSettings(settings)
  }, [])

  return (
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
  )
}

export default SaleLayout
