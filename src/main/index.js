import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { join } from 'path'
import { networkInterfaces } from 'os'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import nodemailer from 'nodemailer'
import { execFile, spawn } from 'child_process'
import Store from 'electron-store'
import icon from '../../resources/icon.png?asset'
import log from 'electron-log'

Store.initRenderer()

const store = new Store({ name: 'config' })

let child = null
let mainWindow = null

function runHuginApp() {
  const huginAppDirr = join(app.getPath('userData'), 'hugin/HuginSocketApp.exe')

  child = spawn(huginAppDirr)

  child.on('close', (code) => {
    log.error('Hugin socket uygulaması hata sonucu kapatıldı, Hata Kodu: ' + code)
    child = null
  })
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize()

    log.info('Uygulama başlatıldı')

    setInterval(() => {
      if (child === null) {
        runHuginApp()
      }
    }, 1000)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('getStoreValue', (event, key) => {
  return store.get(key)
})

ipcMain.handle('setStoreValue', (event, data) => {
  const { key, value } = data
  store.set(key, value)

  return store.get(key)
})

ipcMain.handle('deleteStoreValue', (event, key) => {
  store.delete(key)

  return true
})
ipcMain.handle('getLocalAddress', () => {
  const interfaces = networkInterfaces()
  let ipAddress

  Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((interfaceInfo) => {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        ipAddress = interfaceInfo.address
      }
    })
  })

  return ipAddress
})

ipcMain.on('print:slip', async () => {
  const printerWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  const settings = await store.get('settings')

  printerWindow.on('ready-to-show', () => {
    printerWindow.webContents.openDevTools()
  })

  printerWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      printerWindow.webContents.print(
        {
          margins: {
            marginType: 'none'
          },
          silent: true,
          printBackground: true,
          deviceName: settings?.printerName ?? ''
        },
        (success, failureReason) => {
          if (success) {
            log.info('Fiş başarıyla basıldı')
            mainWindow.webContents.send('slip:status', {
              ok: true,
              message: 'Fiş başarıyla basıldı!'
            })
          } else {
            log.error('Yazıcı hatası: ' + failureReason)
            mainWindow.webContents.send('slip:status', {
              ok: false,
              message: failureReason
            })
          }

          printerWindow.close()
        }
      )
    }, 500)
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    printerWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/printer')
  } else {
    printerWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: '#/printer' })
  }
})

ipcMain.on('add:log', (event, data) => {
  const { status, data: logdata } = data

  switch (status) {
    case 'info':
      return log.info(JSON.stringify(logdata))
    case 'error':
      return log.error(JSON.stringify(logdata))
    case 'warn':
      return log.warn(JSON.stringify(logdata))
    case 'verbose':
      return log.verbose(JSON.stringify(logdata))
    default:
      return log.error(JSON.stringify(logdata))
  }
})

ipcMain.on('send:mail', async (event, data) => {
  const { title, description } = data

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
      user: 'trn.petrol2@yandex.com',
      pass: 'Lvb2q9RxLqQaSe2'
    }
  })

  // E-posta seçenekleri
  const mailOptions = {
    from: 'trn.petrol@yandex.com',
    to: 'unlcemre0@gmail.com',
    subject: title,
    text: description
  }

  // E-posta gönderme işlemi
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log(info)
    })
    .catch((error) => {
      console.log(error)
    })
})
