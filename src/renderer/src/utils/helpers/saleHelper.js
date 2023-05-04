import { toast } from 'react-hot-toast'
import store from '../../store'
import { clearAll } from '../../store/features/basket'

class SaleHelper {
  static toMoneyFormat(value) {
    return value.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    })
  }

  static async succesSale(slip) {
    store.dispatch(clearAll())
    toast.success('Sipariş Başarılı!')

    window.api.addLog('info', 'Yeni sipariş: ' + JSON.stringify(slip));

    if (slip) {
      await window.api.setStoreValue({ key: 'slip', value: slip })
      window.electron.ipcRenderer.send('print:slip')  
    }
  }

  static getDeptId(kdv) {
    let deptId = "";

    switch (kdv) {
      case 0:
        deptId = 1
        break
      case 1:
        deptId = 2
        break
      case 8:
        deptId = 3
        break
      case 18:
        deptId = 4
        break
      default:
        break
    }

    console.log(deptId);

    return deptId;
  }

}

export default SaleHelper
