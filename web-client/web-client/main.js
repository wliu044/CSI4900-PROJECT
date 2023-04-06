const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require('url');
let mainWindow = null;
const mode = process.argv[2]
const debug = /--debug/.test(mode);
function makeSingleInstance() {
  if (process.mas) return;
  app.requestSingleInstanceLock();
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  const windowOptions = {
    width: 600,
		height: 500,
		webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true,
  };
  mainWindow = new BrowserWindow(windowOptions);
  // and load the index.html of the app.
	// if(mode === 'dev') { 
    mainWindow.loadURL("http://localhost:8080/")
  // } else { 
  //   mainWindow.loadURL(url.format({
  //     pathname:path.join(__dirname, './build/index.html'), 
  //     protocol:'file:', 
  //     slashes:true 
  //   }))
  // }
  ipcMain.on("min", function () {
    mainWindow.minimize();
  });
  ipcMain.on("max", function () {
    mainWindow.maximize();
  });
  ipcMain.on("login", function () {
    mainWindow.maximize();
  });
  //如果是--debug 打开开发者工具，窗口最大化，
  if (debug) {
    mainWindow.webContents.openDevTools();
    require("devtron").install();
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

makeSingleInstance();

app.on("ready", () => {
	createWindow();
	app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

module.exports = mainWindow;
