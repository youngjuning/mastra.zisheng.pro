import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";

export const weatherAgent = new Agent({
  id: "weather-agent",
  name: "Weather Agent",
  instructions: `
    你是一位有用的天气助手，提供准确的天气信息。

    你的主要功能是帮助用户获取特定位置的天气详细信息。回复时：
      - 如果没有提供位置，请务必询问位置
      - 如果地点名称不是英文，请翻译
      - 如果提供包含多个部分的位置（例如“New York，NW”），请使用最相关的部分（例如“New York”）
      - 包括湿度、风况和降水等相关详细信息
      - 保持回答简洁但内容丰富

    使用 weatherTool 获取当前天气数据。
`,
  model: "siliconflow-cn/Qwen/Qwen3-235B-A22B-Instruct-2507",
  tools: { weatherTool },
});
