const { app, BrowserWindow, ipcMain } = require('electron/main')
const cp = require('child_process')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            // 传入预加载脚本
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.webContents.send('message-from-main', 'hello world')
    console.log(cp.execSync('ls -ali').toString())
}

app.whenReady().then(() => {
    createWindow()
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
    ipcMain.handle('fsOperate', (event, data) => {
        return `hello${data}`
    })
})
