# LzChat

<div align="center">

![LzChat](public/logo.png)

**一款基于 Electron + Vue 3 构建的现代化 AI 聊天桌面应用**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-37.1.0-47848F?style=flat-square&logo=electron)](https://www.electronjs.org/)
[![Vue](https://img.shields.io/badge/Vue-3.5.17-42b883?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Lizheng487/lz--chat-green?style=flat-square&logo=github)](https://github.com/Lizheng487/lz-chat)

[![GitHub stars](https://img.shields.io/github/stars/Lizheng487/lz-chat?style=flat-square)](https://github.com/Lizheng487/lz-chat/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Lizheng487/lz-chat?style=flat-square)](https://github.com/Lizheng487/lz-chat/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Lizheng487/lz-chat?style=flat-square)](https://github.com/Lizheng487/lz-chat/issues)

[English](./README.md) · [中文](./README_zh.md)

</div>

---

## ✨ 功能特性

### 🤖 AI 对话

- **多 AI 提供商支持** - 兼容 OpenAI API 格式的任意服务提供商
  - 智谱 AI (GLM 大模型)
  - DeepSeek
  - OpenAI (GPT 系列)
  - Anthropic (Claude 系列)
  - 等其他 OpenAI 兼容 API

- **流式输出** - 实时流式显示 AI 回复，即时响应
- **Markdown 渲染** - 支持代码高亮、代码块复制
- **对话管理**
  - 创建新对话
  - 编辑对话标题
  - 删除对话（支持批量操作）
  - 置顶重要对话
  - 对话搜索过滤

### 🎨 界面体验

- **主题系统**
  - 深色模式 / 浅色模式 / 跟随系统
  - 自定义主题颜色
- **多语言支持** - 中文 / English
- **可调节布局** - 拖拽调整对话列表高度
- **原生桌面体验** - 精致的窗口管理、系统托盘

### 💾 数据安全

- **本地存储** - 所有对话数据存储在本地
- **IndexedDB** - 使用 Dexie.js 进行数据持久化
- **隐私优先** - API Key 仅本地存储，不上传任何服务器

---

## 🛠 技术栈

### 核心框架

| 技术       | 版本   | 用途                  |
| ---------- | ------ | --------------------- |
| Electron   | 37.1.0 | 跨平台桌面应用框架    |
| Vue        | 3.5.17 | 渐进式前端框架        |
| TypeScript | 5.8.3  | 类型安全的 JavaScript |
| Vite       | 6.0.0  | 下一代前端构建工具    |

### UI 与样式

| 技术        | 用途            |
| ----------- | --------------- |
| Naive UI    | Vue 3 组件库    |
| TailwindCSS | 原子化 CSS 框架 |
| PostCSS     | CSS 转换工具    |

### 状态管理与构建

| 技术           | 用途                  |
| -------------- | --------------------- |
| Pinia          | Vue 3 状态管理        |
| Vue Router     | Vue 官方路由          |
| electron-forge | Electron 应用打包发布 |

### 核心依赖

| 技术         | 用途          |
| ------------ | ------------- |
| Dexie        | IndexedDB ORM |
| OpenAI SDK   | AI API 调用   |
| vue-i18n     | 国际化        |
| electron-log | 日志记录      |
| markdown-it  | Markdown 解析 |
| highlight.js | 代码高亮      |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run start
```

### 构建打包

```bash
# 打包应用
npm run package

# 创建可分发安装包
npm run make
```

---

## 📦 下载

### 最新版本

[![Download Setup](https://img.shields.io/badge/Download-Setup%20v1.0.0-blue?style=for-the-badge&logo=windows)](https://github.com/Lizheng487/lz-chat/releases)

### 历史版本

查看 [Releases](https://github.com/Lizheng487/lz-chat/releases) 页面获取所有版本。

---

## 📁 项目结构

```
lz-chat/
├── main/                    # Electron 主进程
│   ├── providers/          # AI 提供商实现
│   ├── service/            # 服务层（窗口、配置、日志、托盘等）
│   ├── wins/                # 窗口管理
│   └── index.ts             # 主进程入口
├── renderer/                # Electron 渲染进程
│   ├── components/          # Vue 组件
│   │   ├── ConversationList/  # 对话列表组件
│   │   ├── MessageInput.vue   # 消息输入框
│   │   ├── MessageList.vue    # 消息列表
│   │   ├── MessageRender.vue  # 消息渲染
│   │   ├── TitleBar.vue       # 自定义标题栏
│   │   └── ...
│   ├── hooks/               # Vue Composition API hooks
│   ├── stores/               # Pinia 状态管理
│   ├── views/               # 页面视图
│   │   ├── conversation.vue   # 主对话页面
│   │   ├── setting/           # 设置页面
│   │   └── dialog/           # 对话框页面
│   ├── styles/              # 全局样式
│   ├── types/               # TypeScript 类型定义
│   └── utils/               # 工具函数
├── locales/                 # 国际化语言包
│   ├── zh.json              # 中文
│   └── en.json              # 英文
├── common/                  # 共享类型和常量
├── public/                  # 静态资源
├── forge.config.ts          # Electron Forge 配置
├── vite.main.config.ts      # Vite 主进程配置
├── vite.renderer.config.ts  # Vite 渲染进程配置
└── package.json
```

---

## ⚙️ 配置 AI 提供商

1. 打开设置页面
2. 进入「模型配置」标签页
3. 选择要配置的 AI 提供商
4. 填写 API Key 和 API 地址
5. 启用提供商开关
6. 设置默认模型（可选）

### API Key 获取链接

| 提供商    | 地址                           |
| --------- | ------------------------------ |
| 智谱 AI   | https://bigmodel.cn/           |
| DeepSeek  | https://platform.deepseek.com/ |
| OpenAI    | https://platform.openai.com    |
| Anthropic | https://console.anthropic.com  |

---

## ⌨️ 快捷操作

| 操作     | 快捷键        |
| -------- | ------------- |
| 新建对话 | Ctrl + N      |
| 搜索对话 | Ctrl + F      |
| 发送消息 | Enter         |
| 换行     | Shift + Enter |
| 停止生成 | Esc           |

---

## 📝 开源协议

本项目基于 [MIT](./LICENSE) 开源协议。

---

## 👨‍💻 作者

**LiZheng**

- GitHub: [Lizheng487](https://github.com/Lizheng487)
- Email: lizheng1230487@gmail.com

---

<p align="center">

**如果这个项目对你有帮助，请给一个 ⭐**

[![Star this repo](https://img.shields.io/github/stars/Lizheng487/lz-chat?style=social)](https://github.com/Lizheng487/lz-chat)

</p>
