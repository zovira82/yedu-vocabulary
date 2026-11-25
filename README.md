# 页词 · 阅读生词本

手机/电脑背词网页：粘贴豆包整理的阅读词表，检查释义和原句，再按组学习。

- 先回忆，支持原句提示、发音、收藏、修改释义和助记。
- 每组最多 7 词，不熟的词穿插重现，连续两次无提示认出后才完成。
- 新词或本轮忘记的词次日复习，熟词逐步延长间隔；太简单可暂停。
- 词表、进度保存在当前浏览器，不自动同步到其他设备。请定期导出备份。
- GitHub 版通过浏览器直接连接 DeepSeek 官方 API，Key 和模型设置保存在当前浏览器，刷新后自动恢复，可在设置中清除 Key；不上传到 GitHub，也不写入词表备份。

## 访问

https://zovira82.github.io/yedu-vocabulary/

## 词表格式

每行一个词，后面三列可省略：

```text
单词 | 中文释义 | 原文例句 | 例句翻译 | 助记
scenario | n. 情景；情况 | Consider a different scenario. | 考虑另一种情况。
```

也支持 Markdown 表格及 `{"words":[{"word":"scenario","meaning":"情景"}]}`。自由格式可用 DeepSeek 整理，须核对 AI 补充内容。原文例句不自动编造。默认模型 `deepseek-flash`，可在设置中填写账户可用的模型名。

## 本地开发与部署

Node.js 20+，无需安装依赖：

```sh
npm run dev
npm run check
npm run build
```

本地地址 http://localhost:4317 。本地使用服务端转发，GitHub Pages 使用浏览器直连官方 API。GitHub Pages 发布源为 `main` 分支的 `/docs`，修改 `public/` 后运行构建并提交 `docs/`。

界面参考用户提供的扇贝考研截图；复习规则是本项目的实现，不等同于扇贝未公开算法。发音依赖浏览器和系统英语语音。未使用真实 API Key 验证计费请求。

原 Sites 网站中的浏览器数据不会自动迁移到新网址：先在旧网站导出备份，再在新网站恢复（手机在“DeepSeek 设置”中也提供备份入口）。
