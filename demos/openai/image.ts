import { OpenAI } from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  baseURL: 'https://api.siliconflow.cn/v1',
  apiKey: process.env.SILICONFLOW_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: 'Qwen/Qwen3-VL-32B-Instruct',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: {
            url: 'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20251031/ownrof/f26d201b1e3f4e62ab4a1fc82dd5c9bb.png',
          },
        },
        { type: 'text', text: '请问图片展现了有哪些商品？' },
      ],
    },
  ],
});

console.log(completion.choices[0].message.content);
// 如需查看完整响应，请取消下列注释
console.log(JSON.stringify(completion, null, 2));
