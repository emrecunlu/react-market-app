import React, { useState } from 'react'
import { FcBarChart } from 'react-icons/fc'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import ReportListDialog from '../../../../../components/dialogs/report/ReportListDialog'

const ReportButton = () => {
  const [dialog, setDialog] = useState(false)

  return (
    <>
      {dialog && <ReportListDialog isOpen={dialog} onClose={() => setDialog(false)} />}
      <LeftSideButton icon={<FcBarChart />} onClick={() => setDialog(true)}>
        Rapor
      </LeftSideButton>
    </>
  )
}

export default ReportButton
