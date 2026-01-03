import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const weatherTool = createTool({
  id: "get-weather",
  description: "获取一个位置的当前天气",
  inputSchema: z.object({
    location: z.string().describe("城市名")
  }),
  outputSchema: z.object({
    output: z.string(),
  }),
  execute: async () => {
    return {
      output: "当前是晴天",
    }
  }
})
