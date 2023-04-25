import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcShop } from 'react-icons/fc'
import OutgoingListDialog from '../../../../../components/dialogs/outgoing/OutgoingListDialog'

const OutGoingButton = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <OutgoingListDialog onClose={() => setDialog(false)} isOpen={dialog} />}
      <LeftSideButton sx={{ flex: 1 }} icon={<FcShop />} onClick={() => setDialog(true)}>
        Gider
      </LeftSideButton>
    </>
  )
}

export default OutGoingButton
