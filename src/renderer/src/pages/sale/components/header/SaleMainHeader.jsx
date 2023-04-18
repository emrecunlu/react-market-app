import React, { useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import ScanBarcode from './ScanBarcode'
import { FcSearch } from 'react-icons/fc'
import TotalPriceBox from './TotalPriceBox'
import ProductDialog from '../../../../components/dialogs/ProductDialog'

const SaleMainHeader = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <ProductDialog isOpen={dialog} onClose={() => setDialog(false)} />}
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
        </Stack>
        {/*  <TotalPriceBox /> */}
      </Stack>
    </>
  )
}

export default SaleMainHeader
