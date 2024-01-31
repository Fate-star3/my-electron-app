const information = document.getElementById('info');
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;
// 将发送器与接收器设置完成之后，现在你可以将信息通过刚刚定义的 'ping' 通道从渲染器发送至主进程当中
const func = async () => {
  const response = await window.versions.ping();
  console.log(response, 'render'); // 打印 'pong'
};

func();
