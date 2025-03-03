const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

const path = require('path');
let mainWindow;

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();

  if (process.platform === 'win32') {
    app.setAppUserModelId(app.getName());
  }

  mainWindow = new BrowserWindow({
    width: 2100,
    height: 1080, 
    icon: path.resolve(__dirname, 'icon.ico'),
    fullscreenable: true, 
    autoHideMenuBar: false, 
    webPreferences: {
      nodeIntegration: true,
    },
  });


  mainWindow.maximize(); 

  mainWindow.loadURL('https://tetrapak.vercel.app'); 

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
