# 技术上下文

## 技术栈

- React 19、TypeScript 6、Vite 8、React Router 8.4。
- pnpm 11；Tailwind CSS 4 与 Vite 插件；shadcn/ui、Radix UI、Lucide 图标。
- Oxlint 用于 lint；Geist、Noto Sans SC、Lora 为本地字体依赖。
- 应用是浏览器端静态 Web 项目，没有服务端 API、数据库或登录流程。

版本依据 `package.json` 与 `pnpm-lock.yaml`；如版本发生变化，以仓库当前配置为准。

## 本地命令

```sh
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

项目脚本没有独立的 test 命令。修改后按任务要求选择构建、lint 或浏览器检查，并区分本次检查和历史记录。

## 数据与存储

- 进度存于浏览器 localStorage：`english-class:tenses-progress:v2`。
- v2 载荷含 `version: 2`、稳定 ID 数组 `solvedQuestionIds`，以及按问题 ID 索引的 `missedQuestions`；单条错题保存 `lastSelectedOptionId` 和 `attempts`。
- 首次未找到有效 v2 记录时读取 `...:v1` 并迁移到 v2。浏览器存储不可用时读取空进度，并忽略写入错误以保持课程可用。
- 本地字体、首页图片和语法图表位于 `src/assets/`、`public/` 与 `docs/tenses/`。

## 开发注意

- 用当前锁文件和 package scripts 判断依赖及命令，不要凭印象升级框架。
- 深链接依赖静态托管支持 history fallback；部署行为需按目标托管环境另行核实。
- 课程内容和混合练习是本地静态 TypeScript 数据。扩充练习时同时检查唯一 ID、选项反馈完整性和题目来源是否独立。
