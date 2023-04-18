import React from 'react'
import { Button } from '@mui/material'

const PaymetButton = ({ children, icon, onClick, ...props }) => {
  return (
    <Button
      {...props}
      fullWidth
      sx={{ height: 75, flex: 1 }}
      variant="contained"
      color="inherit"
      onClick={onClick}
      startIcon={React.cloneElement(icon, { size: 24 })}
    >
      {children}
    </Button>
  )
}

export default PaymetButton
