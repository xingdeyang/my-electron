##### 进程
- 应用的每个webview都在一个单独的进程(renderer渲染器)

##### 事件
- 主应用进程: ready, active, window-all-closed

##### 架构
webview: web环境（可基于预加载脚本扩展能力）
    |
预加载脚本: 在webview加载网页前注入，其上下文环境有限（polyfilled）包括：Electron、timers、url、Buffer, process, clearImmediate, setImmediate
    |
应用主进程: 有完全系统访问权限的nodejs环境
    |
操作系统

##### 通信（IPC模式）
- ipcMain、ipcRenderer模块进行进程间通信，通过预加载脚本来作为中介暴露api(ipcRenderer.invoke | ipcMain.handle , ipcRenderer.on | win.webContents.send)

##### 调试与构建
- 开发调试：electron
- 打包与分发：electron forge（安装electron-forge/cli）

