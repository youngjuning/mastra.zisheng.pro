import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

interface WeatherResponse {
  current_condition: Array<{
    temp_C: string;
    FeelsLikeC: string;
    humidity: string;
    windspeedKmph: string;
    weatherDesc: Array<{
      value: string;
    }>;
  }>;
  nearest_area: Array<{
    areaName: Array<{
      value: string;
    }>;
  }>;
}

export const weatherTool = createTool({
  id: 'get-weather',
  description: 'Get current weather for a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    windGust: z.number(),
    conditions: z.string(),
    location: z.string(),
  }),
  execute: async (inputData) => {
    return await getWeather(inputData.location);
  },
});

const getWeather = async (location: string) => {
  // 使用 wttr.in API，设置 30 秒超时
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    // wttr.in 支持直接使用城市名称，返回 JSON 格式
    const weatherUrl = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;
    const response = await fetch(weatherUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0', // wttr.in 需要 User-Agent
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as WeatherResponse;

    if (!data.current_condition?.[0]) {
      throw new Error(`Location '${location}' not found or weather data unavailable`);
    }

    const current = data.current_condition[0];
    const areaName = data.nearest_area?.[0]?.areaName?.[0]?.value || location;

    return {
      temperature: parseFloat(current.temp_C),
      feelsLike: parseFloat(current.FeelsLikeC),
      humidity: parseFloat(current.humidity),
      windSpeed: parseFloat(current.windspeedKmph) * 0.277778, // 转换为 m/s (km/h * 0.277778)
      windGust: parseFloat(current.windspeedKmph) * 0.277778, // wttr.in 不提供阵风数据，使用风速
      conditions: current.weatherDesc[0]?.value || 'Unknown',
      location: areaName,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Weather API request timeout (30s)');
    }
    throw error;
  }
};

