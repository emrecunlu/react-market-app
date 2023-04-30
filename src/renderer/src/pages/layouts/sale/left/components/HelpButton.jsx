import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcVoicePresentation } from 'react-icons/fc'
import SendMailDialog from '../../../../../components/dialogs/help/SendMailDialog'

const HelpButton = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <SendMailDialog onClose={() => setDialog(false)} isOpen={dialog} />}
      <LeftSideButton icon={<FcVoicePresentation />} onClick={() => setDialog(true)}>
        İletişim
      </LeftSideButton>
    </>
  )
}

export default HelpButton
