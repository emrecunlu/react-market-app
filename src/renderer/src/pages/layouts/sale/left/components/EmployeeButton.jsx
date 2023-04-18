import React, { useState } from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcBusinessman } from 'react-icons/fc'
import EmployeeListDialog from '../../../../../components/dialogs/employee/EmployeeListDialog'

const EmployeeButton = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <EmployeeListDialog isOpen={dialog} onClose={() => setDialog(false)} />}
      <LeftSideButton icon={<FcBusinessman />} onClick={() => setDialog(true)}>
        Personel
      </LeftSideButton>
    </>
  )
}

export default EmployeeButton
