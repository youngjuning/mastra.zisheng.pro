---
order: 2
title: 开始
description: 'Mastra 是一个全面的开源框架，旨在简化 AI 应用开发流程。 '
keywords: [Mastra, AI, Agents]
toc: content
group:
  title: 入门
  order: 1
---

创建一个新的 Mastra 项目，或将 Mastra 与你喜欢的框架集成以开始构建。

## 创建新项目

`npx create mastra` 命令式构建第一个智能体的最快方法。它会引导你完成设置并生成一个示例智能体，你可以立即在 [Studio](/getting-started/studio) 中运行和调整。当你准备好时，你随时可以将 Mastra 与你的框架或 UI 集成。

```jsx
import { Card } from 'antd';

export default () => {
  return (
    <Card
        {...sharedCardProps}
        title="Object Card"
        styles={stylesCard}
        extra={<Button type="link">More</Button>}
        variant="borderless"
      >
    <Card.Meta avatar="" title=""/>
    </Card>
  )
}
```
