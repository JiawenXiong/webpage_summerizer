(function() {
    function trySubmit() {
        chrome.storage.local.get(['pendingSummarizeTask'], (result) => {
            const prompt = result.pendingSummarizeTask;
            if (!prompt) return;

            // 寻找 ChatGPT 的输入框
            const textarea = document.querySelector('#prompt-textarea');
            
            if (textarea) {
                // 成功找到输入框，清除存储中的任务
                chrome.storage.local.remove('pendingSummarizeTask');

                // 聚焦并填入文字
                textarea.focus();
                // 使用 execCommand 以触发 React 的状态更新
                document.execCommand('insertText', false, prompt);

                // 稍作延迟后模拟点击发送按钮
                setTimeout(() => {
                    const sendBtn = document.querySelector('[data-testid="send-button"]') || 
                                    document.querySelector('button[aria-label="Send"]');
                    if (sendBtn) {
                        sendBtn.click();
                    }
                }, 600);
            } else {
                // 如果页面还没加载好，1秒后重试
                setTimeout(trySubmit, 1000);
            }
        });
    }

    // 初次加载时尝试
    trySubmit();
    
    // 监听页面导航变化
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            setTimeout(trySubmit, 500);
        }
    }).observe(document, { subtree: true, childList: true });
})();