import store from '../../store'
import { login as personalLogin } from '../../store/features/personal'

class PersonalHelper {
  static async login(data) {
    const storage = await window.api.setStoreValue({ key: 'personal', value: data })
    store.dispatch(personalLogin(storage))
  }

  static async getShiftId() {
    
  }
}

export default PersonalHelper
