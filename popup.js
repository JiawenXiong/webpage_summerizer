document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    // 通知background script执行总结
    chrome.runtime.sendMessage({ action: 'summarize', tabId: tab.id });
    window.close();
  }
});

// 设置快捷键按钮点击事件
document.getElementById('settingsBtn').addEventListener('click', async () => {
  // 检测当前浏览器环境
  const isEdge = navigator.userAgent.includes('Edg/');
  const shortcutsUrl = isEdge ? 'edge://extensions/shortcuts' : 'chrome://extensions/shortcuts';
  
  // 打开快捷键设置页面
  chrome.tabs.create({ url: shortcutsUrl });
  window.close();
});

// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'closePopup') {
    window.close();
  }
});