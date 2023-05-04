import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getStoreValue: async (key) => await ipcRenderer.invoke('getStoreValue', key),
  setStoreValue: async ({ key, value }) =>
    await ipcRenderer.invoke('setStoreValue', { key, value }),
  deleteStoreValue: async (key) => await ipcRenderer.invoke('deleteStoreValue', key),
  getLocalAddress: async () => await ipcRenderer.invoke('getLocalAddress'),
  setStoreSlipValue: async ({ key, value }) =>
    ipcRenderer.send('setStoreValue:slip', { key, value }),
  getLastSlip: async () => await ipcRenderer.invoke('getLastSlip'),
  addLog: (type, data) => ipcRenderer.send('add:log', { status: type, data })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
