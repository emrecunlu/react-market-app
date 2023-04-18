import { Backdrop, CircularProgress, Box } from '@mui/material'
import React from 'react'

const PageLoader = ({ children, isLoading, ...props }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </Box>
  )
}

export default PageLoader
