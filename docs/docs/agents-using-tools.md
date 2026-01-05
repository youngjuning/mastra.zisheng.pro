---
order: 2
title: 使用工具
description: '智能体使用工具调用应用程序接口、查询数据库或运行代码库中的自定义功能。'
keywords: [Mastra, AI, Agents, Tools]
toc: content
group:
  title: Agents
  order: 2
---

# 使用工具

智能体使用工具来调用 API、查询数据库或从代码库运行自定义函数。工具通过提供对数据的结构化访问和执行明确定义的操作，为智能体提供了超越文本生成的功能。你还可以从 [远程 MCP 服务器](/docs/mcp-overview) 加载工具来扩展智能体的功能。

## 何时实用工具

当智能体需要来自远程资源的额外上下文或信息，或者需要运行执行特定操作的代码时，请使用工具。这包括模型无法自行可靠地处理的任务，例如获取实时数据或返回一致的、定义良好的输出。

:::warning
有些模型已经内置支持联网搜索，比如 qwen3-max，如果不支持可以基于 DuckDuckGo 编写 web search 工具。
:::

## 创建一个工具

创建工具时，请保持描述简单并重点关注工具的用途，强调其主要用例。描述性 Schema 名称还可以帮助指导智能体如何使用该工具。

此示例演示如何创建一个从 API 获取天气数据的工具。当代理调用该工具时，它会提供该工具的 `inputSchema`。该工具通过 `inputData` 参数访问此数据，在此示例中包括天气 API 查询用到的 `location` 参数。

```ts
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const weatherTool = createTool({
  id: "weather-tool",
  description: "Fetches weather for a location",
  inputSchema: z.object({
    location: z.string(),
  }),
  outputSchema: z.object({
    weather: z.string(),
  }),
  execute: async (inputData) => {
    const { location } = inputData;

    const response = await fetch(`https://wttr.in/${location}?format=3`);
    const weather = await response.text();

    return { weather };
  },
});
```
