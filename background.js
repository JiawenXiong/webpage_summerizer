// 平台URL配置
const PLATFORM_URLS = {
  baidu: (query) => `https://chat.baidu.com/search?word=${encodeURIComponent(query)}`,
  chatgpt: () => 'https://chatgpt.com/',
  gemini: () => 'https://gemini.google.com/app',
  kimi: () => 'https://www.kimi.com/',
  doubao: () => 'https://www.doubao.com/chat/?from_login=1'
};

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
        await summarizePage(tab, request.url, request.title);
      }
    });
  }
});

// 核心功能：总结页面
async function summarizePage(tab, url = null, title = null) {
  const targetUrl = url || tab.url || tab.pendingUrl;
  const pageTitle = title || tab.title;
  
  if (!targetUrl) {
    console.error("无法获取页面URL");
    return;
  }

  // 获取用户配置
  chrome.storage.local.get(['targetAI', 'customTemplate'], async (result) => {
    const targetAI = result.targetAI || 'baidu';
    const defaultPrompt = chrome.i18n.getMessage('defaultPrompt');
    const template = result.customTemplate || defaultPrompt;
    
    // 替换变量
    const fallbackTitle = chrome.i18n.getMessage('fallbackTitle');
    const finalPrompt = template
      .replace('${url}', targetUrl)
      .replace('${title}', pageTitle || fallbackTitle);
    
    // 复制到剪贴板
    try {
      await navigator.clipboard.writeText(finalPrompt);
      console.log("已复制到剪贴板:", finalPrompt);
    } catch (err) {
      console.error("复制失败:", err);
    }
    
    // 根据平台类型选择打开方式
    if (targetAI === 'baidu') {
      // 百度AI使用URL方式
      const baiduAISearchUrl = PLATFORM_URLS.baidu(finalPrompt);
      chrome.tabs.create({ url: baiduAISearchUrl });
    } else {
      // 其他平台使用Storage Bridge模式
      chrome.storage.local.set({ 'pendingSummarizeTask': finalPrompt }, () => {
        const platformUrl = PLATFORM_URLS[targetAI]();
        chrome.tabs.create({ url: platformUrl });
      });
    }
  });
}