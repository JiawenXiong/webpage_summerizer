# Web Page Summarizer

[中文文档](README.md) | English Documentation

A simple and easy-to-use browser extension for Chrome and Edge that allows you to send the current webpage to multiple AI platforms (Baidu AI, ChatGPT, Gemini, Kimi, Doubao) for content summarization with just one click.

## Features

- 🚀 One-click summarization: Trigger by clicking the extension icon or using keyboard shortcuts
- 🤖 Multi-platform support: Supports Baidu AI, ChatGPT, Gemini, Kimi, Doubao five major AI platforms
- ⚙️ Custom prompts: Support custom prompt templates with variables `${url}` and `${title}`
- 📋 Auto-copy: Automatically copies the page URL and prompt to clipboard
- 🔍 AI-powered summarization: Automatically opens the corresponding AI platform page for intelligent summarization
- 🌍 Multi-language support: Automatic language switching between Chinese and English
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
2. In the popup interface:
   - Select AI platform (default: Baidu AI Search)
   - (Optional) Customize prompt template, supports `${url}` and `${title}` variables
   - Click "Summarize Current Page" button
3. The extension will automatically:
   - Save current settings
   - Copy the current page URL and summarization prompt to clipboard
   - Open the selected AI platform page in a new tab
   - Auto-fill the prompt and submit (except for Baidu AI)

### Method 2: Use Keyboard Shortcut

- **Windows/Linux**: `Ctrl + Shift + H`
- **Mac**: `Command + Shift + H`

The keyboard shortcut will use the last saved settings for summarization.

### Custom Prompts

In the extension popup, you can customize the prompt template with the following variables:

- `${url}` - The URL of the current webpage
- `${title}` - The title of the current webpage

Example:
```
Please summarize the content of this webpage in detail: ${url}
Webpage title: ${title}
```

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

## Supported AI Platforms

| Platform | Description |
|----------|-------------|
| Baidu AI Search | Uses URL parameter passing, no additional action needed |
| ChatGPT | Uses Storage Bridge mode, auto-fill and submit |
| Google Gemini | Uses Storage Bridge mode, auto-fill and submit |
| Kimi (Moonshot AI) | Uses Storage Bridge mode, auto-fill and submit |
| Doubao | Uses Storage Bridge mode, auto-fill and submit |

## How It Works

### Baidu AI Search (URL Mode)

1. Get the URL and title of the current active tab
2. Replace variables based on user-configured prompt template
3. Copy the request content to clipboard
4. Open Baidu AI Search page with UTF-8 encoding via URL parameters
5. Baidu AI automatically analyzes and summarizes the webpage content

### Other AI Platforms (Storage Bridge Mode)

1. Get the URL and title of the current active tab
2. Replace variables based on user-configured prompt template
3. Copy the request content to clipboard
4. Store the prompt in `chrome.storage.local`
5. Open the corresponding AI platform page
6. Content Script automatically reads the stored prompt
7. Fill in the input field and auto-submit

## Project Structure

```
web_summarizer/
├── manifest.json          # Extension configuration file
├── background.js          # Background service script
├── popup.html             # Popup interface
├── popup.js               # Popup interaction logic
├── styles.css             # Stylesheet file
├── content_chatgpt.js     # ChatGPT auto-fill script
├── content_gemini.js      # Gemini auto-fill script
├── content_kimi.js        # Kimi auto-fill script
├── content_doubao.js      # Doubao auto-fill script
├── _locales/              # Internationalization files
│   ├── zh_CN/
│   │   └── messages.json  # Chinese language pack
│   └── en/
│       └── messages.json  # English language pack
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
- **Chrome Storage API** - Configuration storage and data passing
- **Content Scripts** - Page injection scripts

## Permissions

The extension requires the following permissions:

- `activeTab` - Access to current active tab information
- `clipboardWrite` - Clipboard write permission
- `storage` - Store user configuration and pass data

## FAQ

**Q: The extension is not working properly?**  
A: Please make sure the extension is enabled in `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge), and check for any error messages.

**Q: Keyboard shortcut not responding?**  
A: Please visit `chrome://extensions/shortcuts` (Chrome) or `edge://extensions/shortcuts` (Edge) to check the shortcut settings and ensure it's not being used by another application.

**Q: AI platform page won't open?**  
A: Please check your network connection and ensure you can access the corresponding AI service.

**Q: Can I use it in Edge?**  
A: Yes! Edge fully supports Chrome extensions. The installation and usage methods are the same as Chrome.

**Q: Custom prompt not working?**  
A: Please make sure the prompt is displayed in the input field before clicking the "Summarize Current Page" button. Settings are automatically saved.

**Q: Why do some platforms require auto-fill?**  
A: ChatGPT, Gemini, Kimi, Doubao and other platforms do not support passing queries via URL parameters, so the extension uses Storage Bridge mode, auto-filling prompts through Content Scripts.

## Development & Contribution

Issues and Pull Requests are welcome!

## License

MIT License

## Changelog

### v2.0.0 (2026-02-10)

- Added support for ChatGPT, Gemini, Kimi, Doubao four major AI platforms
- Added user configuration interface, supporting platform selection and custom prompts
- Added multi-language support (Chinese and English)
- Added custom prompt variables `${url}` and `${title}`
- Added Storage Bridge mode to solve URL parameter passing limitations
- Added Content Scripts for auto-fill and submit functionality

### v1.0.0 (2026-02-08)

- Initial release
- Support for icon click and keyboard shortcut triggers
- Auto-copy URL to clipboard
- Open Baidu AI Search for summarization