import { mastra } from "./mastra";
import "dotenv/config";

const agent = mastra.getAgent("testAgent");

const response = await agent.generate([
  {
    role: "user",
    content: [
      {
        type: "image",
        image: "https://placebear.com/cache/395-205.jpg",
        mimeType: "image/jpeg",
      },
      {
        type: "text",
        text: "Describe the image in detail, and extract all the text in the image.",
      }
    ]
  }
]);

console.log(response.text);
