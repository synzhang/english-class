# 系统模式

## 路由与应用状态

- `src/main.tsx` 以 `BrowserRouter` 包裹应用；`src/App.tsx` 声明首页、时态目录、课程、练习库、错题复习和 404 路由。
- `LearningRouteLayout` 提供平台共享外壳，并在 outlet context 中汇集当前课程、汇总进度和导航回调。新页面优先使用现有 route context / shell 模式。
- 旧 `?view=` 链接由首页和 404 路由重定向；复习路由通过 location state 保存返回位置和当前课程。

## 学习内容数据

- `src/features/tenses/lesson-data.ts` 定义组、课程结构、说明、句型、例句和迁移题，并从 `practice-sets.ts` 组装每课的导学题、三道练习题和近似干扰项。
- `src/features/tenses/practice-sets.ts` 是课程导学与巩固题的来源。每个答案选项都有对应反馈。
- `src/features/tenses/mixed-practice-data.ts` 单独保存混合练习种子并根据目标课程生成选项解释；每轮每课抽一题，题目和选项各自打乱。
- 给练习、持久化进度和错题复习分配稳定 ID；不得根据数组下标关联已完成状态。变更 ID 前需规划旧进度迁移。

## 学习进度

- `src/lib/progress-storage.ts` 定义 `LearningProgress`：`solvedQuestionIds` 与 `missedQuestions`（最近错选项及尝试次数）。
- 当前 key 为 `english-class:tenses-progress:v2`，读取时兼容 `...:v1` 并迁移写入 v2。存储异常时应用继续可用。
- `src/hooks/use-learning-progress.ts` 统一处理作答、汇总完成度和本地持久化。新练习应复用此契约。
- 错题页从课程题和混合题两类题库合并数据，并以题目 ID 关联错题状态。

## 页面与设计

- `src/features/learning/module-registry.ts` 是首页模块状态的目录：`active` 表示可进入，`planned` 表示尚未实现。
- 课程的逐题展示和完成态在 `src/features/tenses/lesson-page.tsx`；共享回答交互在 `practice-question.tsx`。
- 样式集中在 `src/index.css`，设计方向记录在 `DESIGN.md`。新增布局要沿用现有 token、中文 UI 与英文例句的字体区分，并核对窄屏。

## 语法建模约束

将来时间表达和过去将来表达作为学习组处理。不要将这套目录改写成“英语客观存在的 16 个时态”这一事实性主张；遇到教学图表和语法定义冲突时，以准确语义解释并更新产品文案。
