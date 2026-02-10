(function() {
    function trySubmitGemini() {
        chrome.storage.local.get(['pendingSummarizeTask'], (result) => {
            const prompt = result.pendingSummarizeTask;
            if (!prompt) return;

            // Gemini 的输入框选择器
            const textarea = document.querySelector('div[role="textbox"]') || 
                           document.querySelector('.ql-editor');
            
            if (textarea) {
                chrome.storage.local.remove('pendingSummarizeTask');
                
                textarea.focus();
                // 模拟输入
                document.execCommand('insertText', false, prompt);

                // 尝试点击发送按钮
                setTimeout(() => {
                    // Gemini 的发送按钮通常带有一个特殊的 aria-label
                    const sendBtn = document.querySelector('button[aria-label*="发送"] span') || 
                                    document.querySelector('button[aria-label*="Send"]');
                    if (sendBtn) {
                        sendBtn.click();
                    }
                }, 800);
            } else {
                setTimeout(trySubmitGemini, 1000);
            }
        });
    }
    
    trySubmitGemini();
    
    // 监听页面导航变化
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            setTimeout(trySubmitGemini, 500);
        }
    }).observe(document, { subtree: true, childList: true });
})();