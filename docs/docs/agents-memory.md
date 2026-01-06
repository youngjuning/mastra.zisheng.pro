---
order: 3
title: Memory
description: '智能体使用 Memory 来维护交互中的上下文。LLM 是无状态的，不会在调用之间保留信息，因此智能体需要 Memory 来跟踪消息历史记录并调用相关信息。'
keywords: [Mastra, AI, Agents, Memory]
toc: content
group:
  title: Agents
  order: 2
---

# 记忆 Memory

智能体使用 Memory 来维护交互中的上下文。LLM 是无状态的，不会在调用之间保留信息，因此智能体需要 Memory 来跟踪消息历史记录并调用相关信息。

Mastra 智能体可以配置为存储消息历史记录，并使用可选的工作记忆（Working Memory）来维护最近的上下文或语义召回（semantic recall）以根据含义检索过去的消息。
