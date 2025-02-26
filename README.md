##### 进程
- 应用的每个webview都在一个单独的进程(renderer渲染器)，作为开发者控制两种类型的进程：主进程和渲染进程

##### 事件
- 主应用进程: ready, active, window-all-closed
- webview进程: dom-ready, page-title-updated, closed, ready-to-show, did-navigate等

##### 架构
- 架构模型
    webview: web环境（可基于预加载脚本扩展能力）
        |
    预加载脚本: 与webview共享一个全局window接口，在webview加载网页前注入（webPreference选项），其上下文环境有限（沙盒化，polyfilled）包括：Electron、timers、url、Buffer, process, clearImmediate, setImmediate
        |
    应用主进程: 有完全系统访问权限的nodejs环境
        |
    操作系统

##### 通信（IPC模式）
- ipcMain、ipcRenderer模块进行进程间通信，通过预加载脚本来作为中介暴露api给网页js使用，如下介绍
- 模式1: ipcRenderer.invoke | ipcMain.handle （webview进程到主进程，双向， promise形式）
- 模式2: ipcRenderer.send | ipcMain.on （webview进程到主进程，单向）
- 模式3: ipcRenderer.on | win.webContents.send （主进程到webview进程, 需要指定是哪一个webview接收消息）
- 两个webview进程之间的直接通信
    - 主进程作为代理通道，将消息发送给主进程后由主进程代理转发到另一个webview进程
    - 在主进程通过MessageChannelMain建立一条通信通道，将其两个port分别发送给两个webview进程（类似nodejs原生MessageChannel的用法）即可

##### 上下文隔离
- 虽然预加载脚本与webview共享一个全局window接口（注入并扩展window），但要注意其是一个独立的上下文环境，若在预加载脚本访问window其不是网页所能访问的对象
- 预加载脚本通过contextBridge.exposeInMainWorld()方法暴露api能力到网页的window对象中是常见的使用方式

##### 调试与构建
- 开发调试：electron
- 打包与分发：electron forge（安装electron-forge/cli）

