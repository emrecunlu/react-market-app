import React, { useState } from 'react'
import { FcManager } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import SelectOutgoingDialog from '../../../../../../components/dialogs/outgoing/SelectOutgoingDialog'
import { useNewOutgoing } from '../../../../../../utils/hooks/useSaleRepository'
import moment from 'moment'

const MusteriGider = () => {
  const [dialog, setDialog] = useState(false)

  const { mutate: newSale, isLoading } = useNewOutgoing()

  const handleConfirm = (outgoing) => {
    newSale({
      description: outgoing.description,
      outgoingId: outgoing.id,
      price: outgoing.price,
      transfer: false,
      receiver: '',
      submitter: '',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }

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
