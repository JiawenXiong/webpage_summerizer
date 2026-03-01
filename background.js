// 平台URL配置
const PLATFORM_URLS = {
  baidu: (query) => `https://chat.baidu.com/search?word=${encodeURIComponent(query)}`,
  chatgpt: () => 'https://chatgpt.com/',
  gemini: () => 'https://gemini.google.com/app',
  kimi: () => 'https://www.kimi.com/',
  doubao: () => 'https://www.doubao.com/chat/?from_login=1',
  grok: () => 'https://grok.com/'
};

// 平台ID列表
const PLATFORM_IDS = ['baidu', 'chatgpt', 'gemini', 'kimi', 'doubao', 'grok'];

// 创建右键菜单
function createContextMenus() {
  // 创建父菜单
  chrome.contextMenus.create({
    id: 'summarize-parent',
    title: chrome.i18n.getMessage('contextMenuSummarizeTo'),
    contexts: ['page']
  });

  // 创建各平台子菜单
  PLATFORM_IDS.forEach(platform => {
    const platformName = chrome.i18n.getMessage(`platform${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    chrome.contextMenus.create({
      id: `summarize-${platform}`,
      parentId: 'summarize-parent',
      title: platformName,
      contexts: ['page']
    });
  });
}

// 扩展安装或更新时创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
});

// 确保右键菜单存在（Service Worker 重启后）
chrome.runtime.onStartup.addListener(() => {
  createContextMenus();
});

// 监听右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('summarize-')) {
    const platform = info.menuItemId.replace('summarize-', '');
    if (PLATFORM_IDS.includes(platform)) {
      summarizePageWithPlatform(tab, platform);
    }
  }
});

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

// 使用指定平台总结页面（右键菜单调用）
async function summarizePageWithPlatform(tab, platform) {
  const targetUrl = tab.url || tab.pendingUrl;
  const pageTitle = tab.title;
  
  if (!targetUrl) {
    console.error("无法获取页面URL");
    return;
  }

  chrome.storage.local.get(['customTemplate'], async (result) => {
    const defaultPrompt = chrome.i18n.getMessage('defaultPrompt');
    const template = result.customTemplate || defaultPrompt;
    const fallbackTitle = chrome.i18n.getMessage('fallbackTitle');
    
    // 替换变量
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
    if (platform === 'baidu') {
      const baiduAISearchUrl = PLATFORM_URLS.baidu(finalPrompt);
      chrome.tabs.create({ url: baiduAISearchUrl });
    } else {
      chrome.storage.local.set({ 'pendingSummarizeTask': finalPrompt }, () => {
        const platformUrl = PLATFORM_URLS[platform]();
        chrome.tabs.create({ url: platformUrl });
      });
    }
  });
}

// 核心功能：总结页面（使用默认平台）
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