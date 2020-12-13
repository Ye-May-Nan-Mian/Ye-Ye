// this index.js is for electron

const { app, BrowserWindow, Menu, ipcMain } = require("electron");
// reference to  window object
let win;

function createWindow() {
    // display menu
    Menu.setApplicationMenu(null);
    win = new BrowserWindow({
        frame: false,
        fullscreen: true,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + "/preload.js"
        }
    });
    // load index.html
    win.loadURL("http://localhost:3000");
    console.log(__dirname);
    // developer tool page
    win.webContents.openDevTools();
    // callback when window closed
    win.on("closed", () => {
        // dereference
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on("window-min", () => {
    win.minimize();
});

ipcMain.on("window-max", () => {
    if (win.isMaximized()) {
        win.restore();
    } else {
        win.maximize();
    }
});

ipcMain.on("window-full", () => {
    if (win.isFullScreen()) {
        win.setFullScreen(false);
    } else {
        win.setFullScreen(true);
    }
});

ipcMain.on("window-close", () => {
    win.close();
});
