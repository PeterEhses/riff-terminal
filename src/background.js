'use strict'

const unhandled = require('electron-unhandled');

unhandled();

import { app, protocol, BrowserWindow, screen, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import Logger from 'js-logger';
// const fs = require('graceful-fs')

const isDevelopment = process.env.NODE_ENV !== 'production'
app.commandLine.appendSwitch ("disable-http-cache");
// app.commandLine.appendSwitch('enable-experimental-web-platform-features');
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, stream: true } }
])

const Store = require('electron-store');

Store.initRenderer()

function findDisplays() {
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.filter((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  const portraitDisplays = displays.filter(display => display.bounds.width < display.bounds.height)
  // console.log(portraitDisplays || displays)
  return portraitDisplays || displays
}

async function createWindow() {
  const preferredDisplay = findDisplays()[0]
  console.log(preferredDisplay)
  // Create the browser window.
  const windowOptions = {
    width: preferredDisplay.bounds.width || 800,
    height: preferredDisplay.bounds.height || 1200,
    x: preferredDisplay.bounds.x || 0,
    y: preferredDisplay.bounds.y || 0,
    frame: false, // disable OS window frame
    skipTaskbar: true,
    show: false, // don't show yet, we want to maximize it first!
    paintWhenInitiallyHidden: true,
    minimizable: false, // uncomment from here for kiosk mode
    closable: false,
    movable: false,
    alwaysOnTop: true,
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      experimentalFeatures: true,
      // devTools: isDevelopment,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      webSecurity: false,
    }
  }
  const win = new BrowserWindow(windowOptions)

  // console.log(windowOptions, process.env)
  // win.maximize() // maximize window so it fills the entire screen
  win.show() // now we're good to show our window.

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerLocalVideoProtocol ()
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


/* get video files */
ipcMain.handle('getPublicFiles', function () {
  return getDirs(__static)

});
const dirTree = require("directory-tree");

function getDirs(rootDir) {
  return dirTree(rootDir)
}

/* quit */
ipcMain.on("quitApp", function () {
  console.log("got quitApp, exiting in 11s")
  setTimeout(() => { console.log("EXIT"); app.exit(0) }, 11000)
});

// video hacky thing

function registerLocalVideoProtocol () {
  protocol.registerFileProtocol('local-video', (request, callback) => {
    const url = request.url.replace(/^local-video:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      // eslint-disable-next-line no-undef
      return callback(path.join(__static, decodedUrl))
    } catch (error) {
      console.error(
        'ERROR: registerLocalVideoProtocol: Could not get file path:',
        error
      )
    }
  })
}