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
      "role": "user",
      "content": "用一句话形容杭州的冬天"
    }
  ],
  n: 3,
});

console.log(completion.choices.map(choice => choice.message.content));
// 如需查看完整响应，请取消下列注释
console.log(JSON.stringify(completion, null, 2));
