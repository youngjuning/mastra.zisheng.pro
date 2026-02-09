---
title: 自定义模型网关 Provider
description: '@mastra/mcp-docs-server 包提供通过模型上下文协议 (MCP)直接访问 Mastra 的完整知识库，包括文档、代码示例、博客文章和变更日志的功能。'
order: 5
keywords: [Mastra, AI, Agents]
toc: content
group:
  title: 入门
  order: 1
---

模型网关 Provider 聚合多个模型 Provider，并添加缓存、速率限制、分析和自动故障转移等功能。当你需要可观测性（Observability）、成本管理或简化多 Provider 访问时，请使用网关。

而自定义网关则允许你通过扩展 `MastraModelGateway` 基类来实现私有或专门的 LLM Provider 集成。
