import { mastra } from "./mastra";
import "dotenv/config";

const agent = mastra.getAgent("weatherAgent");

const result = await agent.generate(`What's the weather in Hangzhou?`);

console.log(result);
