---
order: 1
title: 概述
description: '智能体使用大语言模型和工具来解决开放式任务。它们推理目标，决定使用哪些工具，保留对话记忆，并进行内部迭代，直到模型发出最终答案或满足可选的停止条件。'
keywords: [Mastra, AI, Agents, Tools]
toc: content
group:
  title: Agents
  order: 2
---

# 智能体概述

智能体使用大语言模型和工具来解决开放式任务。它们推理目标，决定使用哪些工具，保留对话记忆，并进行内部迭代，直到模型发出最终答案或满足可选的停止条件。

:::info{title="什么是智能体"}
AI 智能体（AI Agent） 是一种能够**感知环境、自主决策、执行任务并持续学习**的智能软件系统。它不只是被动地响应指令，而是像一个“数字员工”一样，主动思考、规划、调用工具、与外界交互，最终完成复杂目标。

✅ 简单说：AI 智能体 = LLM（大脑） + 工具（手脚） + 记忆（经验） + 目标（驱动力）

随着 LLM、工具调用（Function Calling）、记忆机制的发展，AI 智能体正从概念走向现实，成为下一代人机交互的核心范式。

参考：[构建高效 AI 智能体 - Anthropic](https://zhuanlan.zhihu.com/p/14060480822)
:::

![](https://mastra.ai/assets/images/agents-overview-1e3bb3b8cf0d13be675394ad41418ea7.jpg)

## 设置 Agents

### 安装

1、将 Mastra 核心包添加到你的项目中：

```sh
npm install @mastra/core@beta
```

2、Mastra 的模型路由器会自动检测您选择的提供商的环境变量。对于硅基流动，设置 SILICONFLOW_API_KEY:

```env
SILICONFLOW_API_KEY=<your-api-key>
```

3、通过使用 系统 `instructions` 和 Agent 类实例化来创建智能体：

```ts
import { Agent } from "@mastra/core/agent";

export const testAgent = new Agent({
  id: "test-agent",
  name: "Test Agent",
  instructions: "You are a helpful assistant.",
  model: "siliconflow-cn/Qwen/Qwen3-Coder-30B-A3B-Instruct",
});
```

## 指令格式

指令定义了智能体的行为、个性和能力。它们是系统级提示，可建立智能体的核心身份和专业知识。

可以以多种格式提供说明，以提高灵活性。下面的示例说明了支持的格式：

```ts
// String (most common)
instructions: "You are a helpful assistant.";

// Array of strings
instructions: [
  "You are a helpful assistant.",
  "Always be polite.",
  "Provide detailed answers.",
];

// Array of system messages
// 这里和 LLM 的格式是一致的s
instructions: [
  { role: "system", content: "You are a helpful assistant." },
  { role: "system", content: "You have expertise in TypeScript." },
];
```
