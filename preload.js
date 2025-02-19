const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    sendToMain: (channel, data) => {
         return ipcRenderer.invoke(channel, data)
    },
    receiveFromMain: callback => {
        ipcRenderer.on('message-from-main', (event, data) => {
            callback(data)
        })
    }
})