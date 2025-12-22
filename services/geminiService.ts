
import { GoogleGenAI } from "@google/genai";

// Always use named parameter for apiKey initialization and rely on process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToAssistant = async (message: string): Promise<string> => {
  try {
    // Correct way to call generateContent directly on ai.models
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "Eres un asistente legal útil y empático para 'LegalMeet', una app en Colombia. Tu objetivo es orientar a usuarios (estratos 1-4) con lenguaje claro, sencillo y sin tecnicismos complejos. No das consejos legales vinculantes, solo orientación general y ayuda para navegar la app. Respuestas breves.",
      }
    });
    
    // Access .text property directly, not as a method
    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Hubo un error temporal al conectar con el asistente.";
  }
};

export const searchJurisprudence = async (query: string): Promise<string> => {
    try {
      // Use gemini-3-pro-preview for complex reasoning tasks as per guidelines
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
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
      
      // Access .text property directly
      return response.text || "No se encontraron resultados.";
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      return "Error al consultar jurisprudencia.";
    }
  };
