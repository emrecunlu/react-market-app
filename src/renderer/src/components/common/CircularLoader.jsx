import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const CircularLoader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <CircularProgress />
    </Box>
  )
}

export default CircularLoader
