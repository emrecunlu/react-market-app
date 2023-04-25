import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcList } from 'react-icons/fc'
import SaleListDialog from '../../../../../components/dialogs/sale/SaleListDialog'

const SaleListButton = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <SaleListDialog isOpen={dialog} onClose={() => setDialog(false)} />}
      <LeftSideButton icon={<FcList />} onClick={() => setDialog(true)}>
        SATIŞLAR
      </LeftSideButton>
    </>
  )
}

export default SaleListButton
