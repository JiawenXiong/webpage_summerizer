// 默认配置
const DEFAULT_CONFIG = {
  targetAI: 'baidu',
  customTemplate: null
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  loadSettings();
  bindEvents();
});

// 应用国际化文本
function applyI18n() {
  document.getElementById('extensionTitle').textContent = chrome.i18n.getMessage('extensionName');
  document.getElementById('labelPlatform').textContent = chrome.i18n.getMessage('selectAIPlatform');
  document.getElementById('optionBaidu').textContent = chrome.i18n.getMessage('platformBaidu');
  document.getElementById('optionChatGPT').textContent = chrome.i18n.getMessage('platformChatGPT');
  document.getElementById('optionGemini').textContent = chrome.i18n.getMessage('platformGemini');
  document.getElementById('optionKimi').textContent = chrome.i18n.getMessage('platformKimi');
  document.getElementById('optionDoubao').textContent = chrome.i18n.getMessage('platformDoubao');
  document.getElementById('optionGrok').textContent = chrome.i18n.getMessage('platformGrok');
  document.getElementById('labelPrompt').textContent = chrome.i18n.getMessage('customPromptLabel');
  document.getElementById('labelVariables').textContent = chrome.i18n.getMessage('availableVariables');
  document.getElementById('summarizeBtn').textContent = chrome.i18n.getMessage('summarizeBtn');
  document.getElementById('labelShortcut').textContent = chrome.i18n.getMessage('shortcutInfo');
  document.getElementById('textShortcutWindows').textContent = chrome.i18n.getMessage('shortcutWindows');
  document.getElementById('textShortcutMac').textContent = chrome.i18n.getMessage('shortcutMac');
  document.getElementById('settingsBtn').textContent = chrome.i18n.getMessage('settingsShortcutBtn');
  document.getElementById('saveSettingsBtn').textContent = chrome.i18n.getMessage('saveSettings');
  document.getElementById('restoreDefaultsBtn').textContent = chrome.i18n.getMessage('restoreDefaults');
  document.getElementById('labelFeatures').textContent = chrome.i18n.getMessage('featureTitle');
  document.getElementById('feature1').textContent = chrome.i18n.getMessage('feature1');
  document.getElementById('feature2').textContent = chrome.i18n.getMessage('feature2');
  document.getElementById('feature3').textContent = chrome.i18n.getMessage('feature3');
  document.getElementById('feature4').textContent = chrome.i18n.getMessage('feature4');
  
  // 设置提示词默认值
  const defaultPrompt = chrome.i18n.getMessage('defaultPrompt');
  document.getElementById('promptInput').placeholder = defaultPrompt;
}

// 加载已保存的设置
function loadSettings() {
  chrome.storage.local.get(['targetAI', 'customTemplate'], (result) => {
    document.getElementById('targetAI').value = result.targetAI || DEFAULT_CONFIG.targetAI;
    
    // 如果有自定义模板，使用自定义模板；否则使用默认模板
    const defaultPrompt = chrome.i18n.getMessage('defaultPrompt');
    document.getElementById('promptInput').value = result.customTemplate || defaultPrompt;
  });
}

// 绑定事件监听器
function bindEvents() {
  // 总结按钮
  document.getElementById('summarizeBtn').addEventListener('click', handleSummarize);
  
  // 保存设置按钮
  document.getElementById('saveSettingsBtn').addEventListener('click', handleSaveSettings);
  
  // 恢复默认按钮
  document.getElementById('restoreDefaultsBtn').addEventListener('click', handleRestoreDefaults);
  
  // 设置快捷键按钮
  document.getElementById('settingsBtn').addEventListener('click', handleOpenShortcutSettings);
  
  // 监听来自background的消息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'closePopup') {
      window.close();
    }
  });
}

// 处理总结操作
async function handleSummarize() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) {
    alert('无法获取当前标签页');
    return;
  }
  
  // 保存当前设置
  const settings = {
    targetAI: document.getElementById('targetAI').value,
    customTemplate: document.getElementById('promptInput').value
  };
  
  chrome.storage.local.set(settings, () => {
    // 通知background script执行总结
    chrome.runtime.sendMessage({ 
      action: 'summarize', 
      tabId: tab.id,
      url: tab.url,
      title: tab.title
    });
    window.close();
  });
}

// 打开快捷键设置页面
function handleOpenShortcutSettings() {
  const isEdge = navigator.userAgent.includes('Edg/');
  const shortcutsUrl = isEdge ? 'edge://extensions/shortcuts' : 'chrome://extensions/shortcuts';
  chrome.tabs.create({ url: shortcutsUrl });
  window.close();
}

// 保存设置
function handleSaveSettings() {
  const settings = {
    targetAI: document.getElementById('targetAI').value,
    customTemplate: document.getElementById('promptInput').value
  };
  
  chrome.storage.local.set(settings, () => {
    alert(chrome.i18n.getMessage('settingsSaved'));
  });
}

// 恢复默认设置
function handleRestoreDefaults() {
  if (confirm(chrome.i18n.getMessage('confirmRestore'))) {
    const defaultPrompt = chrome.i18n.getMessage('defaultPrompt');
    document.getElementById('promptInput').value = defaultPrompt;
    
    chrome.storage.local.set({ customTemplate: defaultPrompt }, () => {
      alert(chrome.i18n.getMessage('settingsSaved'));
    });
  }
}