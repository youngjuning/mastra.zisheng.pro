import { Mastra } from "@mastra/core";
import { weatherAgent } from "./agents/weather-agent";
import { testAgent } from "./agents/test-agent";

export const mastra = new Mastra({
  agents: { weatherAgent, testAgent },
});
