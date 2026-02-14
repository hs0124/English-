
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { PolishResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const polishEnglish = async (text: string): Promise<PolishResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请润色以下英语文本，使其听起来更自然、地道。请用中文提供解释和建议。
    结果请以 JSON 格式返回。
    文本: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING },
          polished: { type: Type.STRING },
          explanation: { type: Type.STRING, description: '用中文解释润色的原因' },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: '用中文列出关键学习点或替代方案'
          }
        },
        required: ["original", "polished", "explanation", "suggestions"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const createLiveSession = async (callbacks: any) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction: '你是一位充满鼓励且专业的英语外教。与用户进行友好对话，如果语法错误影响理解，请温柔地纠正，但重点放在沟通流畅度和建立信心上。你可以根据用户需求用简单的中文进行解释，但尽量保持母语级别的英语交流环境。',
    }
  });
};
