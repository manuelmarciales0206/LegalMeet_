import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Error initializing GoogleGenAI", error);
}

export const sendMessageToAssistant = async (message: string): Promise<string> => {
  if (!ai) {
    return "Lo siento, el asistente virtual no está configurado actualmente (Falta API Key).";
  }

  try {
    const model = ai.models.generateContent;
    const response = await model({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "Eres un asistente legal útil y empático para 'LegalMeet', una app en Colombia. Tu objetivo es orientar a usuarios (estratos 1-4) con lenguaje claro, sencillo y sin tecnicismos complejos. No das consejos legales vinculantes, solo orientación general y ayuda para navegar la app. Respuestas breves.",
      }
    });
    
    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Hubo un error temporal al conectar con el asistente.";
  }
};
