const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'Music Player',
    width: 450,
    height: 600,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  },
  })

  win.loadFile('index.html')

  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })