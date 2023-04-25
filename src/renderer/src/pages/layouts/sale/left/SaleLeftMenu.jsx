import { Button, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { FcSimCard } from 'react-icons/fc'
import React from 'react'
import LogoutButton from './components/LogoutButton'
import EmployeeButton from './components/EmployeeButton'
import SettingsButton from './components/SettingsButton'
import OutGoingButton from './components/OutGoingButton'
import SaleListButton from './components/SaleListButton'
import SlipButton from './components/SlipButton'

const SaleLeftMenu = () => {
  return (
    <Stack sx={{ width: 100, height: '100%' }} direction="column">
      <EmployeeButton />
      <OutGoingButton />
      <SaleListButton />
      {/* <SlipButton /> */}
      <SettingsButton />
      <LogoutButton />
    </Stack>
  )
}

export default SaleLeftMenu
