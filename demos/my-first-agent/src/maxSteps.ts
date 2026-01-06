import { mastra } from "./mastra";
import "dotenv/config";

const testAgent = mastra.getAgent("testAgent");

const response = await testAgent.generate("Help me organize my day", {
  maxSteps: 10,
  onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }) => {
    console.log({ text, toolCalls, toolResults, finishReason, usage });
  },
});

console.log(response.text);
