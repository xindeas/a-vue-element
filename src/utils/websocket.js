var websocket = null

var host = document.location.host

var username = 'aaa' // 获得当前登录人员的userName

// alert(username)

// 判断当前浏览器是否支持WebSocket

if ('WebSocket' in window) {
  console.log('浏览器支持Websocket')

  websocket = new WebSocket('ws://localhost:8099/imserver/1')
} else {
  console.log('当前浏览器 Not support websocket')
}

// 连接发生错误的回调方法

websocket.onerror = function () {
  console.log('WebSocket连接发生错误')

  setMessageInnerHTML('WebSocket连接发生错误')
}

// 连接成功建立的回调方法

websocket.onopen = function () {
  console.log('WebSocket连接成功')

  setMessageInnerHTML('WebSocket连接成功')
}

// 接收到消息的回调方法

websocket.onmessage = function (event) {
  console.log('接收到消息的回调方法')

  console.log('这是后台推送的消息：' + event.data)

  websocket.close()

  console.log('webSocket已关闭！')
}

// 连接关闭的回调方法

websocket.onclose = function () {
  setMessageInnerHTML('WebSocket连接关闭')
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。

window.onbeforeunload = function () {
  closeWebSocket()
}

// 关闭WebSocket连接

function closeWebSocket () {
  websocket.close()
}

// 将消息显示在网页上

function setMessageInnerHTML (innerHTML) {
  console.log(innerHTML)
}
