import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcSettings } from 'react-icons/fc'
import SettingsDialog from '../../../../../components/dialogs/settings/SettingsDialog'

const SettingsButton = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <SettingsDialog isOpen={dialog} onClose={() => setDialog(false)} />}
      <LeftSideButton sx={{ flex: 1 }} onClick={() => setDialog(true)} icon={<FcSettings />}>
        Ayarlar
      </LeftSideButton>
    </>
  )
}

export default SettingsButton
