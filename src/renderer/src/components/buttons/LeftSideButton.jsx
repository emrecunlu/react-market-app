import React from 'react'
import { Button, Stack, Typography } from '@mui/material'

const LeftSideButton = ({ icon, children, onClick, ...props }) => {
  return (
    <Button sx={{ flex: 1 }} onClick={onClick} variant="contained" color="inherit">
      <Stack alignItems="center" spacing={1}>
        {React.cloneElement(icon, { size: 18 })}
        <Typography variant="subtitle2">{children}</Typography>
      </Stack>
    </Button>
  )
}

export default LeftSideButton
