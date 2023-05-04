import React, { useState } from 'react'
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import ScanBarcode from './ScanBarcode'
import { FcSearch } from 'react-icons/fc'
import ProductDialog from '../../../../components/dialogs/ProductDialog'
import { usePersonal } from '../../../../store/features/personal'
import { TbPlugConnected } from 'react-icons/tb'
import { useSocket } from '../../../../context/SocketProvider'
import { ReportType } from '../../../../config/constants'

const SaleMainHeader = () => {
  const [dialog, setDialog] = useState(false)
  const { credentials: personal } = usePersonal()

  const { setError, loading, socket } = useSocket()

  const handleClick = () => {
    setError(true)

    const Data = {
      SlipCopy: false,
      ReportType: ReportType.Connect,
      Data: []
    }

    socket?.send(JSON.stringify(Data))
  } 

  return (
    <>
      {dialog && <ProductDialog isOpen={dialog} onClose={() => setDialog(false)} />}
      <Stack direction="row" justifyContent="space-between" alignContent="center">
        <Typography color="primary" variant="h5">
          {personal.name} {personal.surname}
        </Typography>
        <Typography color="primary" variant="h5">
          {personal.shiftName}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" spacing={8}>
        <Stack sx={{ flex: 1 }} direction="row" spacing={2}>
          <ScanBarcode />
          <Button
            onClick={() => setDialog(true)}
            sx={{ px: 6 }}
            variant="contained"
            startIcon={<FcSearch size={26} />}
          >
            Ara
          </Button>
          <Button
            disabled={loading}
            onClick={handleClick}
            variant="contained"
            color="secondary"
            startIcon={<TbPlugConnected />}
          >
            Bağlan
          </Button>
        </Stack>
        {/*  <TotalPriceBox /> */}
      </Stack>
    </>
  )
}

export default SaleMainHeader
