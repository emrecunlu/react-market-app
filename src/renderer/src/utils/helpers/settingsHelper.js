import store from '../../store'
import { set as setSettingsData } from '../../store/features/settings'

class SettingsHelper {
  static async getSettings() {
    const settings = window.api.getStoreValue('settings')

    return settings ?? null
  }

  static async setSettings(data) {
    console.log('Settings', data)
    store.dispatch(setSettingsData(data))
    await window.api.setStoreValue({ key: 'settings', value: data })
  }

  static async initSettings(data) {
    const settings = await this.getSettings()

    if (!settings) {
      this.setSettings(data)

      return
    }

    store.dispatch(setSettingsData(settings))
  }
}

export default SettingsHelper
