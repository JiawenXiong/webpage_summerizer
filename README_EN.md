# Web Page Summarizer

[中文文档](README.md) | English Documentation

A simple and easy-to-use browser extension for Chrome and Edge that allows you to send the current webpage to Baidu AI Search for content summarization with just one click.

## Features

- 🚀 One-click summarization: Trigger by clicking the extension icon or using keyboard shortcuts
- 📋 Auto-copy: Automatically copies the page URL and prompt to clipboard
- 🔍 AI-powered summarization: Automatically opens Baidu AI Search for intelligent summarization
- ⌨️ Keyboard shortcut support: Default shortcut `Ctrl+Shift+H` (Mac: `Command+Shift+H`)
- 🎨 Beautiful interface: Clean and modern gradient design

## Installation

### Chrome Browser

#### Method 1: Install from source (Recommended for developers)

1. Download or clone this project to your local machine
2. Open Chrome browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" toggle in the top right corner
4. Click "Load unpacked" button
5. Select the project folder `web_summarizer`
6. Extension installation complete!

#### Method 2: Packaged installation

1. Click "Pack extension" in `chrome://extensions/` page
2. Select the `web_summarizer` folder
3. After generating the `.crx` file, drag and drop it onto the Chrome extensions page to install

### Edge Browser

#### Method 1: Install from source (Recommended for developers)

1. Download or clone this project to your local machine
2. Open Edge browser and navigate to `edge://extensions/`
3. Enable "Developer mode" toggle in the bottom left corner
4. Click "Load unpacked" button
5. Select the project folder `web_summarizer`
6. Extension installation complete!

#### Method 2: Packaged installation

1. Click "Pack extension" in `chrome://extensions/` or `edge://extensions/` page
2. Select the `web_summarizer` folder
3. After generating the `.crx` file, drag and drop it onto the Edge extensions page to install

## Usage

### Method 1: Click Extension Icon

1. On any webpage, click the "Web Page Summarizer" icon in the browser toolbar
2. The extension will automatically:
   - Copy the current page URL and summarization prompt to clipboard
   - Open Baidu AI Search in a new tab

### Method 2: Use Keyboard Shortcut

- **Windows/Linux**: `Ctrl + Shift + H`
- **Mac**: `Command + Shift + H`

### Customize Keyboard Shortcut

If the default shortcut conflicts with other applications, you can customize it:

**Chrome Browser:**
1. Visit `chrome://extensions/shortcuts`
2. Find "Web Page Summarizer"
3. Click the pencil icon to modify the shortcut

**Edge Browser:**
1. Visit `edge://extensions/shortcuts`
2. Find "Web Page Summarizer"
3. Click the pencil icon to modify the shortcut

## How It Works

1. Get the URL of the current active tab
2. Build the summarization request: `请总结这个网页的内容：[Page URL]`
3. Copy the request content to clipboard
4. Open Baidu AI Search page with UTF-8 encoding
5. Baidu AI automatically analyzes and summarizes the webpage content

## Project Structure

```
web_summarizer/
├── manifest.json          # Extension configuration file
├── background.js          # Background service script
├── popup.html             # Popup interface
├── popup.js               # Popup interaction logic
├── styles.css             # Stylesheet file
├── icons/                 # Icons directory
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
├── README.md              # Chinese documentation
└── README_EN.md           # English documentation
```

## Tech Stack

- **Chrome Extension Manifest V3** - Latest Chrome extension standard
- **JavaScript (ES6+)** - Core logic implementation
- **CSS3** - Interface styling
- **SVG** - Vector icons

## Permissions

The extension requires the following permissions:

- `activeTab` - Access to current active tab information
- `clipboardWrite` - Clipboard write permission

## FAQ

**Q: The extension is not working properly?**  
A: Please make sure the extension is enabled in `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge), and check for any error messages.

**Q: Keyboard shortcut not responding?**  
A: Please visit `chrome://extensions/shortcuts` (Chrome) or `edge://extensions/shortcuts` (Edge) to check the shortcut settings and ensure it's not being used by another application.

**Q: Baidu AI Search page won't open?**  
A: Please check your network connection and ensure you can access Baidu services.

**Q: Can I use it in Edge?**  
A: Yes! Edge fully supports Chrome extensions. The installation and usage methods are the same as Chrome.

## Development & Contribution

Issues and Pull Requests are welcome!

## License

MIT License

## Changelog

### v1.0.0 (2026-02-08)

- Initial release
- Support for icon click and keyboard shortcut triggers
- Auto-copy URL to clipboard
- Open Baidu AI Search for summarization