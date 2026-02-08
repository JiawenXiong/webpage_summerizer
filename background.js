// 监听插件图标点击事件
chrome.action.onClicked.addListener(async (tab) => {
  await summarizePage(tab);
});

// 监听快捷键命令
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "summarize-page") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      await summarizePage(tab);
    }
  }
});

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    chrome.tabs.get(request.tabId, async (tab) => {
      if (tab) {
        await summarizePage(tab);
      }
    });
  }
});

// 核心功能：总结页面
async function summarizePage(tab) {
  // 即使页面未加载完成，tab对象也包含url属性
  const url = tab.url || tab.pendingUrl;
  
  if (!url) {
    console.error("无法获取页面URL");
    return;
  }

  // 构建提示词
  const prompt = "请总结这个网页的内容";
  const query = `${prompt}：${url}`;
  
  // UTF-8编码
  const encodedQuery = encodeURIComponent(query);
  
  // 复制到剪贴板
  try {
    await navigator.clipboard.writeText(query);
    console.log("已复制到剪贴板:", query);
  } catch (err) {
    console.error("复制失败:", err);
  }
  
  // 打开百度AI搜索
  const baiduAISearchUrl = `https://chat.baidu.com/search?word=${encodedQuery}`;
  chrome.tabs.create({ url: baiduAISearchUrl });
}