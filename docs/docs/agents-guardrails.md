---
order: 7
title: 护栏
description: '智能体使用处理器对输入和输出应用护栏。它们在每次交互之前或之后运行，让你可以在用户和智能体之间传递信息时查看、转换或组织信息。'
keywords: [Mastra, AI, Agents, Tools, Network, Guardrails]
toc: content
group:
  title: Agents
  order: 2
---

智能体使用处理器对输入和输出应用护栏。它们在每次交互之前或之后运行，让你可以在用户和智能体之间传递信息时查看、转换或阻止信息。

处理器可以配置为：

- **`inputProcessors`**：在消息到达语言模型之前应用。
- **`outputProcessors`**：应用于响应返回给用户之前。

一些处理器是混合 `inputProcessors` 和 `outputProcessors` 的，这意味着它们可以一起使用，具体取决于应应用逻辑的位置。

## 何时使用处理器

使用处理器进行内容审核、提示注入预防、响应清理、消息转换和其他与安全相关的控制。Mastra 为常见用例提供了多个内置输入和输出处理器。

## 将处理器添加到智能体

导入并实例化相应的处理器类，然后通过 `inputProcessors` 或 `outputProcessors` 选项将其传入智能体的配置中：

```ts
// src/mastra/agents/moderated-agent.ts
import { Agent } from "@mastra/core/agent";
import { ModerationProcessor } from '@mastra/core/processors';

// moderated = 被审核的、被监管的
export const moderatedAgent = new Agent({
  id: "moderated-agent",
  name: "Moderated Agent",
  instructions: "You ara a helpful assistant",
  model: "openai/gpt-5.1",
  inputProcessors: [
    new ModerationProcessor({
      model: "openrouter/openai/gpt-oss-safeguard-20b",
      categories: ["hate", "harassment", "violence"],
      threshold: 0.7,
      strategy: "block",
      instructions: "Detect and flag inappropriate content in user messages",
    })
  ]
});
```

## 输入处理器

在用户消息到达大语言模型之前应用处理器。它们对于规范化、验证、内容审核、提示注入检测和安全检查非常用。

### 规范化用户信息

`UnicodeNormalizer` 是一个输入处理器，通过统一 Unicode 字符、标准化空白和删除有问题的字符来清理和规范用户输入，从而使 LLM 能够更好地理解用户消息。

```ts
// src/mastra/agents/normalized-agent.ts
import { UnicodeNormalizer } from "@mastra/core/processors";

export const normalizedAgent = new Agent({
  id: "normalized-agent",
  name: "Normalized Agent",
  inputProcessors: [
    new UnicodeNormalizer({
      // 移除字符串中的控制子符
      stripControlChars: true,
      // 将字符串中的连续空白字符压缩为单个空格，并去除收尾空白。
      collapseWhitespace: true,
    }),
  ]
});
```

:::info
访问 [UnicodeNormalizer](https://mastra.ai/reference/processors/unicode-normalizer) 以获取配置选项的完整列表。
:::

### 防止提示注入

`PromptInjectionDetector` 是一个输入处理器，用于扫描用户消息以查找提示注入、越狱尝试和系统覆盖模式。它使用 LLM 对有风险的输入进行分类，并可以在其到达模型之前阻止或重写它。

```ts
// src/mastra/agents/secure-agent.ts
import { PromptInjectionDetector } from "@mastra/core/processors";

export const secureAgent = new Agent({
  id: "secure-agent",
  name: "Secure Agent",
  inputProcessors: [
    new PromptInjectionDetector({
      model: "openrouter/openai/gpt-oss-safeguard-20b",
      threshold: 0.8,
      strategy: "rewrite",
      // 提示词注入攻击、越狱攻击、系统指令覆写尝试
      detectionTypes: ["injection", "jailbreak", "system-override"]
    })
  ]
})
```

:::info
请访问 [PromptInjectionDetector](https://mastra.ai/reference/processors/prompt-injection-detector) 以获取配置选项的完整列表。
:::

### 检测和翻译语言

`languageDetector` 是一个输入处理器，可检测用户消息并将其翻译为目标语言，从而在保持一致交互的同时实现多语言支持。它使用 LLM 来识别语言并执行翻译。

```ts
// src/mastra/agents/multilingual-agent.ts
import { LanguageDetector } from "@mastra/core/processors";

export const multilingualAgent = new Agent({
  id: "multilingual-agent",
  name: "Multilingual Agent",
  inputProcessors: [
    new LanguageDetector({
      model: "openrouter/openai/gpt-oss-safeguard-20b",
      targetLanguages: ["English", "en"],
      strategy: "translate",
      threshold: 0.8,
    }),
  ],
});
```

:::info
请访问 [LanguageDetector](https://mastra.ai/reference/processors/language-detector) 以获取配置选项的完整列表。
:::

## 输出处理器

输出处理器在语言模型生成响应之后但在将其返回给用户之前应用。他们对于响应优化、调节、转换和应用安全控制很有用。

### 批处理流输出
