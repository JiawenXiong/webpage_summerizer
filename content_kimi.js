(function() {
    function trySubmitKimi() {
        console.log('Kimi任务执行中');
        chrome.storage.local.get(['pendingSummarizeTask'], (result) => {
            const prompt = result.pendingSummarizeTask;
            if (!prompt) return;

            // Kimi 的输入框选择器
            const textarea = document.querySelector('.chat-input-editor');

            console.log('Kimi: 查找输入框...');

            if (textarea) {
                chrome.storage.local.remove('pendingSummarizeTask');
                
                // 聚焦输入框
                textarea.focus();
                console.log('Kimi: 输入框已聚焦，准备输入文本');

                // 使用 execCommand 输入文本
                setTimeout(() => {
                    document.execCommand('insertText', false, prompt);
                    console.log('Kimi: 文本已输入');

                    // 模拟按回车键发送
                    setTimeout(() => {
                        const enterEvent = new KeyboardEvent('keydown', {
                            key: 'Enter',
                            code: 'Enter',
                            keyCode: 13,
                            which: 13,
                            bubbles: true,
                            cancelable: true
                        });
                        textarea.dispatchEvent(enterEvent);
                        console.log('Kimi: 已模拟按回车键');
                    }, 300);
                }, 300);
            } else {
                console.log('Kimi: 未找到输入框，1秒后重试');
                setTimeout(trySubmitKimi, 1000);
            }
        });
    }

    trySubmitKimi();
    
    // 监听页面导航变化
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            setTimeout(trySubmitKimi, 500);
        }
    }).observe(document, { subtree: true, childList: true });
})();