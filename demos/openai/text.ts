import { OpenAI } from "openai";
import "dotenv/config";

const openai = new OpenAI({
  baseURL: "https://api.siliconflow.cn/v1",
  apiKey: process.env.SILICONFLOW_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "Qwen/Qwen3-235B-A22B-Instruct-2507",
  messages: [
    {
      "role": "system",
      "content": "你是一个有帮助的助手，需要提供精准、高效且富有洞察力的回应，随时准备协助用户处理各种任务与问题。"
    },
    {
      "role": "user",
      "content": "你是谁？"
    }
  ],
});

console.log(completion.choices[0].message.content);
// 如需查看完整响应，请取消下列注释
console.log(JSON.stringify(completion, null, 2));
