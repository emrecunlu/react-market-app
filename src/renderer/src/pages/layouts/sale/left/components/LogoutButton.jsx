import React from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcCancel } from 'react-icons/fc'
import { useAddByShift } from '../../../../../utils/hooks/useSaleRepository'
import { Backdrop, Dialog } from '@mui/material'
import PageLoader from '../../../../../components/common/PageLoader'
import { toast } from 'react-hot-toast'
import PersonalHelper from '../../../../../utils/helpers/personalHelper'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const onSuccess = () => {
    toast.success('Vardiya başarıyla sonlandırıldı.')

    PersonalHelper.logout()

    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  const { mutate: addByShift, isLoading } = useAddByShift(onSuccess)

  const handleClick = () => {
    addByShift(1)
  }

  return (
    <>
      <Dialog open={isLoading}>
        <PageLoader isLoading={isLoading}></PageLoader>
      </Dialog>
      <LeftSideButton icon={<FcCancel />} onClick={handleClick}>
        Vardiya Bitir
      </LeftSideButton>
    </>
  )
}

export default LogoutButton
