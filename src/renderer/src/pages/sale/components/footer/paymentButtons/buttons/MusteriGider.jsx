import React, { useState } from 'react'
import { FcManager } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import SelectOutgoingDialog from '../../../../../../components/dialogs/outgoing/SelectOutgoingDialog'
import { useNewOutgoing } from '../../../../../../utils/hooks/useSaleRepository'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import SaleHelper from '../../../../../../utils/helpers/saleHelper'

const MusteriGider = () => {
  const [dialog, setDialog] = useState(false)

  const { mutate: newSale, isLoading } = useNewOutgoing(() => {
    SaleHelper.succesSale(null)

    setDialog(false)
  })

  const handleConfirm = async (outgoing) => {
    const personal = await window.api.getStoreValue('personal')

    newSale({
      description: outgoing.description,
      outgoingId: outgoing.id,
      price: outgoing.price,
      transfer: false,
      receiver: '',
      shiftId: personal.shiftId,
      submitter: ''
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
