import store from '../../store'
import { clearAll } from '../../store/features/basket';
import { login as personalLogin } from '../../store/features/personal'

class PersonalHelper {
  static async login(data) {
    console.log(data);

    const storage = await window.api.setStoreValue({ key: 'personal', value: data })
    store.dispatch(personalLogin(storage))
  }

  static async logout() {
    store.dispatch(clearAll());
    await window.api.deleteStoreValue('personal')
  }

  static async getShiftId() {}
}

export default PersonalHelper
