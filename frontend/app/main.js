// this index.js is for electron

const { app, BrowserWindow } = require("electron");
// reference to  window object
let win;

function createWindow() {
    win = new BrowserWindow({ width: 1920, height: 1090 });
    // load index.html
    win.loadURL(`file://${__dirname}/index.html`);
    // developer tool page
    // win.webContents.openDevTools();
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
