# 网页内容总结器

[English Documentation](README_EN.md) | 中文文档

一个简单易用的浏览器插件，支持 Chrome 和 Edge，可以一键将当前网页发送到多个 AI 平台（百度 AI、ChatGPT、Gemini、Kimi、豆包）进行内容总结。

## 功能特性

- 🚀 一键总结：点击插件图标或使用快捷键即可触发
- 🖱️ 右键菜单：网页右键菜单可临时选择特定平台进行总结
- 🤖 多平台支持：支持百度 AI、ChatGPT、Gemini、Kimi、豆包、Grok 六大 AI 平台
- ⚙️ 自定义提示词：支持自定义提示词模板，可用变量 `${url}` 和 `${title}`
- 📋 自动复制：自动将页面链接和提示词复制到剪贴板
- 🔍 AI 总结：自动打开对应的 AI 平台页面进行智能总结
- 🌍 多语言支持：支持中英文界面自动切换
- ⌨️ 快捷键支持：默认快捷键 `Ctrl+Shift+H`（Mac: `Command+Shift+H`）
- 🎨 美观界面：简洁现代的渐变色设计

## 安装方法

### Chrome 浏览器

#### 方式一：从源码安装（推荐开发者）

1. 下载或克隆此项目到本地
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"开关
4. 点击"加载已解压的扩展程序"按钮
5. 选择项目文件夹 `web_summarizer`
6. 插件安装完成！

#### 方式二：打包安装

1. 在 `chrome://extensions/` 页面中点击"打包扩展程序"
2. 选择 `web_summarizer` 文件夹
3. 生成 `.crx` 文件后，拖拽到 Chrome 扩展页面进行安装

### Edge 浏览器

#### 方式一：从源码安装（推荐开发者）

1. 下载或克隆此项目到本地
2. 打开 Edge 浏览器，访问 `edge://extensions/`
3. 开启左下角的"开发人员模式"开关
4. 点击"加载解压缩的扩展"按钮
5. 选择项目文件夹 `web_summarizer`
6. 插件安装完成！

#### 方式二：打包安装

1. 在 `chrome://extensions/` 或 `edge://extensions/` 页面中点击"打包扩展程序"
2. 选择 `web_summarizer` 文件夹
3. 生成 `.crx` 文件后，拖拽到 Edge 扩展页面进行安装

## 使用方法

### 方式一：点击插件图标

1. 在任意网页上，点击浏览器工具栏中的"网页内容总结器"图标
2. 在弹出的界面中：
   - 选择 AI 平台（默认：百度 AI 搜索）
   - （可选）自定义提示词模板，支持 `${url}` 和 `${title}` 变量
   - 点击"总结当前页面"按钮
3. 插件会自动：
   - 保存当前设置
   - 复制当前页面链接和总结提示词到剪贴板
   - 在新标签页打开所选 AI 平台页面
   - 自动填充提示词并提交（除百度 AI 外）

### 方式二：使用快捷键

- **Windows/Linux**: `Ctrl + Shift + H`
- **Mac**: `Command + Shift + H`

快捷键将使用上次保存的设置进行总结。

### 方式三：右键菜单

1. 在任意网页上右键
2. 选择"总结到..."子菜单
3. 选择目标 AI 平台
4. 插件会自动使用所选平台进行总结（不影响默认设置）

### 自定义提示词

在插件弹窗中，您可以自定义提示词模板，支持以下变量：

- `${url}` - 当前网页的 URL
- `${title}` - 当前网页的标题

示例：
```
请详细总结这个网页的内容：${url}
网页标题：${title}
```

### 自定义快捷键

如果默认快捷键与其他应用冲突，可以自定义：

**Chrome 浏览器：**
1. 访问 `chrome://extensions/shortcuts`
2. 找到"网页内容总结器"
3. 点击铅笔图标修改快捷键

**Edge 浏览器：**
1. 访问 `edge://extensions/shortcuts`
2. 找到"网页内容总结器"
3. 点击铅笔图标修改快捷键

## 支持的 AI 平台

| 平台 | 说明 |
|------|------|
| 百度 AI 搜索 | 通过 URL 参数传递，无需额外操作 |
| ChatGPT | 使用 Storage Bridge 模式，自动填充并提交 |
| Google Gemini | 使用 Storage Bridge 模式，自动填充并提交 |
| Kimi (月之暗面) | 使用 Storage Bridge 模式，自动填充并提交 |
| 豆包 (Doubao) | 使用 Storage Bridge 模式，自动填充并提交 |
| Grok (xAI) | 使用 Storage Bridge 模式，自动填充并提交 |

## 工作原理

### 百度 AI 搜索（URL 模式）

1. 获取当前活动标签页的 URL 和标题
2. 根据用户配置的提示词模板，替换变量
3. 将请求内容复制到剪贴板
4. 使用 UTF-8 编码后，通过 URL 参数打开百度 AI 搜索页面
5. 百度 AI 会自动对网页内容进行分析和总结

### 其他 AI 平台（Storage Bridge 模式）

1. 获取当前活动标签页的 URL 和标题
2. 根据用户配置的提示词模板，替换变量
3. 将请求内容复制到剪贴板
4. 将提示词存储到 `chrome.storage.local`
5. 打开对应的 AI 平台页面
6. Content Script 自动读取存储中的提示词
7. 填充到输入框并自动提交

## 项目结构

```
web_summarizer/
├── manifest.json          # 插件配置文件
├── background.js          # 后台服务脚本
├── popup.html             # 弹窗界面
├── popup.js               # 弹窗交互逻辑
├── styles.css             # 样式文件
├── content_chatgpt.js     # ChatGPT 自动填充脚本
├── content_gemini.js      # Gemini 自动填充脚本
├── content_kimi.js        # Kimi 自动填充脚本
├── content_doubao.js      # 豆包自动填充脚本
├── content_grok.js        # Grok 自动填充脚本
├── _locales/              # 国际化文件
│   ├── zh_CN/
│   │   └── messages.json  # 中文语言包
│   └── en/
│       └── messages.json  # 英文语言包
├── icons/                 # 图标目录
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
├── README.md              # 中文文档
└── README_EN.md           # 英文文档
```

## 技术栈

- **Chrome Extension Manifest V3** - Chrome 扩展最新标准
- **JavaScript (ES6+)** - 核心逻辑实现
- **CSS3** - 界面样式设计
- **SVG** - 矢量图标
- **Chrome Storage API** - 配置存储和数据传递
- **Content Scripts** - 页面注入脚本

## 权限说明

插件需要以下权限：

- `activeTab` - 获取当前活动标签页信息
- `clipboardWrite` - 写入剪贴板权限
- `storage` - 存储用户配置和传递数据
- `contextMenus` - 创建右键菜单

## 常见问题

**Q: 插件无法正常工作？**  
A: 请确保已在 `chrome://extensions/`（Chrome）或 `edge://extensions/`（Edge）中启用插件，并检查是否有错误提示。

**Q: 快捷键没有反应？**  
A: 请访问 `chrome://extensions/shortcuts`（Chrome）或 `edge://extensions/shortcuts`（Edge）检查快捷键设置，确认未被其他应用占用。

**Q: AI 平台页面打不开？**  
A: 请检查网络连接，确保可以访问相应的 AI 服务。

**Q: 可以在 Edge 中使用吗？**  
A: 可以！Edge 完全支持 Chrome 扩展，安装和使用方法与 Chrome 相同。

**Q: 自定义提示词不生效？**  
A: 请确保点击"总结当前页面"按钮之前，提示词已经显示在输入框中。设置会自动保存。

**Q: 为什么某些平台需要自动填充？**  
A: ChatGPT、Gemini、Kimi、豆包等平台不支持通过 URL 参数传递查询，因此插件使用 Storage Bridge 模式，通过 Content Script 自动填充提示词。

## 开发与贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 更新日志

### v2.2.0 (2026-03-01)

- 新增右键菜单功能，可临时选择特定平台进行总结

### v2.1.0 (2026-03-01)

- 新增支持 Grok (xAI) AI 平台

### v2.0.0 (2026-02-10)

- 新增支持 ChatGPT、Gemini、Kimi、豆包 四大 AI 平台
- 新增用户配置界面，支持平台选择和自定义提示词
- 新增多语言支持（中英文）
- 新增自定义提示词变量 `${url}` 和 `${title}`
- 新增 Storage Bridge 模式，解决 URL 传参限制
- 新增 Content Scripts，实现自动填充和提交功能

### v1.0.0 (2026-02-08)

- 初始版本发布
- 支持点击图标和快捷键触发
- 自动复制链接到剪贴板
- 打开百度 AI 搜索进行总结