import React from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'

const TotalPriceBox = () => {
  return (
    <Box component={Paper}>
      <Stack direction="column" justifyContent="flex-start" sx={{ py: 1, px: 2 }}>
        <Typography variant="subtitle2" textAlign="right">
          Toplam Miktar:
        </Typography>
        <Typography variant="h5" color="error" fontWeight={500} textAlign="right">
          35,42
        </Typography>
      </Stack>
    </Box>
  )
}

export default TotalPriceBox
