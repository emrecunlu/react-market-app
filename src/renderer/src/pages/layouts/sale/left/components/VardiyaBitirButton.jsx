import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcHighPriority } from 'react-icons/fc'
import { useAddByShift } from '../../../../../utils/hooks/useSaleRepository'
import { Backdrop, Dialog } from '@mui/material'
import PageLoader from '../../../../../components/common/PageLoader'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { DocumentType, ReportType } from '../../../../../config/constants'
import { useSocket } from '../../../../../context/SocketProvider'
import ConfirmationDialog from '../../../../../components/dialogs/ConfirmationDialog'

const VardiyaBitirButton = () => {
  const [dialog, setDialog] = useState(false)

  const navigate = useNavigate()

  const { socket } = useSocket()

  const onSuccess = () => {
    toast.success('Z raporu alınıyor, lütfen bekleyiniz...')

    window.api.addLog('info', 'Vardiya bitiriliyor')

    const Data = {
      SlipCopy: false,
      ReportType: ReportType.ZReport,
      Data: []
    }

    socket.send(JSON.stringify({ ...Data }))
  }

  const { mutate: addByShift, isLoading } = useAddByShift(onSuccess)

  const handleConfirm = async () => {
    const personal = await window.api.getStoreValue('personal')
    addByShift({ shiftId: personal.userId, documentType: DocumentType.Fatura })
  }

  return (
    <>
      <Dialog open={isLoading}>
        <PageLoader isLoading={isLoading}></PageLoader>
      </Dialog>
      <ConfirmationDialog
        isOpen={dialog}
        title="Vardiya Bitir"
        description="Vardiya bitirmek üzersiniz, onaylıyor musunuz?"
        onClose={() => setDialog(false)}
        onConfirm={handleConfirm}
      />
      <LeftSideButton icon={<FcHighPriority />} onClick={() => setDialog(true)}>
        Vardiya Bitir
      </LeftSideButton>
    </>
  )
}

export default VardiyaBitirButton
