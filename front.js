versions.sendToMain('fsOperate', 123456).then(data => alert(data))
versions.receiveFromMain(data => {
    alert(`接收到来自主进程的消息${data}`)
})