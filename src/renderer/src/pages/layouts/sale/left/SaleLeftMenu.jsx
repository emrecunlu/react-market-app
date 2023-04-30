import { Stack } from '@mui/material'
import React from 'react'
import VardiyaBitirButton from './components/VardiyaBitirButton'
import EmployeeButton from './components/EmployeeButton'
import SettingsButton from './components/SettingsButton'
import OutGoingButton from './components/OutGoingButton'
import SaleListButton from './components/SaleListButton'
import LogoutButton from './components/LogoutButton'
import ReportButton from './components/ReportButton'
import HelpButton from './components/HelpButton'

const SaleLeftMenu = () => {
  return (
    <Stack sx={{ width: 100, height: '100%' }} direction="column">
      <EmployeeButton />
      <OutGoingButton />
      <SaleListButton />
      <ReportButton />
      {/* <SlipButton /> */}
      <SettingsButton />
      {/* <HelpButton /> */}
      <VardiyaBitirButton />
      <LogoutButton />
    </Stack>
  )
}

export default SaleLeftMenu
