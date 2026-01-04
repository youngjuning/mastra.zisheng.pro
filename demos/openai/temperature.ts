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
      "content": "写一个三句话的短故事，主角是一只猫和一束阳光。"
    }
  ],
  temperature: 0.1,
});

console.log(completion.choices[0].message.content);
// 如需查看完整响应，请取消下列注释
console.log(JSON.stringify(completion, null, 2));
