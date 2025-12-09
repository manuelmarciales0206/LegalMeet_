
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

export const searchJurisprudence = async (query: string): Promise<string> => {
    if (!ai) {
      return "⚠️ Función no disponible: Falta API Key.";
    }
  
    try {
      const model = ai.models.generateContent;
      const response = await model({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          systemInstruction: `Eres un asistente legal especializado en derecho colombiano (LegalTech Colombia). Cuando el abogado haga una consulta:
  
  1. Identifica el área del derecho (laboral, familia, penal, civil, comercial).
  2. Cita artículos relevantes del código correspondiente:
     - Código Sustantivo del Trabajo
     - Código Civil Colombiano
     - Código Penal Colombiano
     - Código General del Proceso
     - Código de Infancia y Adolescencia (Ley 1098/2006)
     
  3. Menciona sentencias relevantes de la Corte Constitucional o Corte Suprema de Justicia. Crea referencias realistas como:
     - "Sentencia T-XXX de 20XX" (tutelas)
     - "Sentencia C-XXX de 20XX" (constitucionalidad)
     - "Sentencia SL-XXXX de 20XX" (laboral)
     - "Sentencia SC-XXXX de 20XX" (civil)
  
  4. Proporciona explicación clara, estructurada y práctica.
  
  5. SIEMPRE incluye al final: "⚠️ Esta información es orientativa. Cada caso debe analizarse individualmente según sus circunstancias específicas."
  
  Responde de manera profesional y técnica, como si hablaras con un abogado colombiano.`,
        }
      });
      
      return response.text || "No se encontraron resultados.";
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      return "Error al consultar jurisprudencia.";
    }
  };
