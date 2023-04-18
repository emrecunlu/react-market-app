import React, { useState } from 'react'
import { FcAssistant } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import PageLoader from '../../../../../../components/common/PageLoader'
import { useNewSale } from '../../../../../../utils/hooks/useSaleRepository'
import { useBasket } from '../../../../../../store/features/basket'
import { PaymentType } from '../../../../../../config/constants'
import { toast } from 'react-hot-toast'
import { clearAll } from '../../../../../../store/features/basket'
import store from '../../../../../../store'
import SelectEmployeeDialog from '../../../../../../components/dialogs/employee/SelectEmployeeDialog'

const PersonelGiderButton = () => {
  const [dialog, setDialog] = useState(false)

  const { data: basketItems } = useBasket()

  const onSuccess = async (response) => {
    const { data: result } = response.data

    store.dispatch(clearAll())
    toast.success('Sipariş başarılı!')
  }

  const { isLoading, mutate: newSale } = useNewSale(onSuccess)

  const handleSelected = async (employee) => {
    setDialog(false)

    const personal = await window.api.getStoreValue('personal')

    const requestBody = {
      shiftId: 1,
      isVATIncluded: true,
      paymentType: PaymentType.Personel,
      userId: personal.userId,
      employeeId: employee.id
    }

    const sales = basketItems.map((item) => ({
      stockCode: item.stokKodu,
      stockName: item.stokAdi,
      amount: item.miktar,
      price: item.satisFiat1,
      transfer: false,
      vatGroup: item.kdvOrani.toString()
    }))

    newSale({ ...requestBody, sales })
  }

  return (
    <PageLoader isLoading={isLoading}>
      {dialog && (
        <SelectEmployeeDialog
          onSelected={handleSelected}
          isOpen={dialog}
          onClose={() => setDialog(false)}
        />
      )}
      <PaymetButton onClick={() => setDialog(true)} icon={<FcAssistant />}>
        PERSONEL
      </PaymetButton>
    </PageLoader>
  )
}

export default PersonelGiderButton
