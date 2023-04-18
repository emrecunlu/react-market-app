import { Box, Stack } from '@mui/material'
import React from 'react'
import SaleMainHeader from './components/header/SaleMainHeader'
import BasketList from './components/products/BasketList'
import SaleMainFooter from './components/footer/SaleMainFooter'

const SalePage = () => {
  return (
    <Box sx={{ flex: 1, p: 3 }}>
      <Stack sx={{ height: '100%', flexDirection: 'column' }} spacing={2}>
        <SaleMainHeader />
        <BasketList />
        <SaleMainFooter />
      </Stack>
    </Box>
  )
}

export default SalePage
