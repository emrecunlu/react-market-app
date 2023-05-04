import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcCancel } from 'react-icons/fc'
import ConfirmationDialog from '../../../../../components/dialogs/ConfirmationDialog'
import PersonalHelper from '../../../../../utils/helpers/personalHelper'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const [dialog, setDialog] = useState(false)

  const navigate = useNavigate()

  const handleConfirm = () => {
    window.api.addLog("Kullanıcı çıkış yaptı")
    PersonalHelper.logout()

    navigate('/auth/login')
  }

  return (
    <>
      <ConfirmationDialog
        title="Çıkış Yap"
        description="Çıkış yapmak istediğinizden emin misiniz?"
        onClose={() => setDialog(false)}
        isOpen={dialog}
        onConfirm={handleConfirm}
      />
      <LeftSideButton icon={<FcCancel />} onClick={() => setDialog(true)}>
        Çıkış Yap
      </LeftSideButton>
    </>
  )
}

export default LogoutButton
