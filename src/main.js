const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './utils/preload.js'),
    },
  });
  // 加载 index.html
  win.loadFile(path.join(__dirname, 'index.html'));
};
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();
  // 在 macOS 系统内, 如果没有已开启的应用窗口
  // 点击托盘图标时通常会重新创建一个新窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  console.log('app quit');
  if (process.platform !== 'darwin') app.quit();
});
