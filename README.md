# 网页内容总结器

[English Documentation](README_EN.md) | 中文文档

一个简单易用的浏览器插件，支持 Chrome 和 Edge，可以一键将当前网页发送到百度 AI 搜索进行内容总结。

## 功能特性

- 🚀 一键总结：点击插件图标或使用快捷键即可触发
- 📋 自动复制：自动将页面链接和提示词复制到剪贴板
- 🔍 AI 总结：自动打开百度 AI 搜索页面进行智能总结
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
2. 插件会自动：
   - 复制当前页面链接和总结提示词到剪贴板
   - 在新标签页打开百度 AI 搜索页面

### 方式二：使用快捷键

- **Windows/Linux**: `Ctrl + Shift + H`
- **Mac**: `Command + Shift + H`

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

## 工作原理

1. 获取当前活动标签页的 URL
2. 构建总结请求：`请总结这个网页的内容：[页面URL]`
3. 将请求内容复制到剪贴板
4. 使用 UTF-8 编码后，打开百度 AI 搜索页面
5. 百度 AI 会自动对网页内容进行分析和总结

## 项目结构

```
web_summarizer/
├── manifest.json          # 插件配置文件
├── background.js          # 后台服务脚本
├── popup.html             # 弹窗界面
├── popup.js               # 弹窗交互逻辑
├── styles.css             # 样式文件
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

## 权限说明

插件需要以下权限：

- `activeTab` - 获取当前活动标签页信息
- `clipboardWrite` - 写入剪贴板权限

## 常见问题

**Q: 插件无法正常工作？**  
A: 请确保已在 `chrome://extensions/`（Chrome）或 `edge://extensions/`（Edge）中启用插件，并检查是否有错误提示。

**Q: 快捷键没有反应？**  
A: 请访问 `chrome://extensions/shortcuts`（Chrome）或 `edge://extensions/shortcuts`（Edge）检查快捷键设置，确认未被其他应用占用。

**Q: 百度 AI 搜索页面打不开？**  
A: 请检查网络连接，确保可以访问百度服务。

**Q: 可以在 Edge 中使用吗？**  
A: 可以！Edge 完全支持 Chrome 扩展，安装和使用方法与 Chrome 相同。

## 开发与贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 更新日志

### v1.0.0 (2026-02-08)

- 初始版本发布
- 支持点击图标和快捷键触发
- 自动复制链接到剪贴板
- 打开百度 AI 搜索进行总结