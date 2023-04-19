import React, { useState } from 'react'
import { FcManager } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import SelectOutgoingDialog from '../../../../../../components/dialogs/outgoing/SelectOutgoingDialog'

const MusteriGider = () => {
  const [dialog, setDialog] = useState(false)

  const handleConfirm = (outgoing) => {}

  return (
    <>
      {dialog && (
        <SelectOutgoingDialog
          onClose={() => setDialog(false)}
          isOpen={dialog}
          onConfirm={handleConfirm}
        />
      )}
      <PaymetButton icon={<FcManager />} onClick={() => setDialog(true)}>
        MÜŞTERİ
      </PaymetButton>
    </>
  )
}

export default MusteriGider
