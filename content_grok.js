(function() {
    function trySubmitGrok() {
        chrome.storage.local.get(['pendingSummarizeTask'], (result) => {
            const prompt = result.pendingSummarizeTask;
            if (!prompt) return;

            // Grok 使用 TipTap (ProseMirror) 编辑器
            // 输入框选择器: div[contenteditable="true"].ProseMirror
            const textarea = document.querySelector('div[contenteditable="true"].ProseMirror') || 
                           document.querySelector('.ProseMirror[contenteditable="true"]');
            
            if (textarea) {
                chrome.storage.local.remove('pendingSummarizeTask');
                
                textarea.focus();
                // 模拟输入
                document.execCommand('insertText', false, prompt);

                // 尝试点击发送按钮
                setTimeout(() => {
                    // Grok 的发送按钮是一个 type="submit" 的 button
                    const sendBtn = document.querySelector('button[type="submit"][aria-label="Submit"]') ||
                                    document.querySelector('button[type="submit"]');
                    if (sendBtn && !sendBtn.disabled) {
                        sendBtn.click();
                    }
                }, 800);
            } else {
                setTimeout(trySubmitGrok, 1000);
            }
        });
    }
    
    trySubmitGrok();
    
    // 监听页面导航变化
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            setTimeout(trySubmitGrok, 500);
        }
    }).observe(document, { subtree: true, childList: true });
})();
