import { Agent } from "@mastra/core/agent";

export const testAgent = new Agent({
  id: "test-agent",
  name: "Test Agent",
  instructions: "You are a helpful assistant.",
  model: "siliconflow-cn/Qwen/Qwen3-Coder-30B-A3B-Instruct",
});

testAgent.stream([
  {
    role: "user",
    content: "你是谁？",
  },
]);
