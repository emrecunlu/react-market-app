import { Button, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { FcSimCard } from 'react-icons/fc'
import React from 'react'
import LogoutButton from './components/LogoutButton'
import PersonalButton from './components/PersonalButton'
import EmployeeButton from './components/EmployeeButton'

const SaleLeftMenu = () => {
  return (
    <Stack sx={{ width: 100, height: '100%' }} direction="column">
      <EmployeeButton />
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
    </Stack>
  )
}

export default SaleLeftMenu
