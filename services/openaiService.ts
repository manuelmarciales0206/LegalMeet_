// services/openaiService.ts
// Usamos process.env para consistencia con el entorno de ejecución
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const searchJurisprudenceAI = async (query: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente legal especializado en derecho colombiano y jurisprudencia. Tu función es ayudar a abogados a encontrar y analizar:

1. JURISPRUDENCIA COLOMBIANA:
   - Sentencias de la Corte Constitucional (T-, C-, SU-)
   - Sentencias de la Corte Suprema de Justicia (SL-, SC-, SP-)
   - Sentencias del Consejo de Estado
   - Conceptos de la Superintendencia de Sociedades
   - Conceptos del Ministerio de Trabajo

2. NORMATIVA APLICABLE:
   - Constitución Política de Colombia
   - Código Sustantivo del Trabajo
   - Código Civil
   - Código General del Proceso
   - Código Penal
   - Código de Comercio
   - Leyes especiales relevantes

3. FORMATO DE RESPUESTA:
   - Cita la sentencia/norma específica
   - Explica el precedente o principio jurídico
   - Indica cómo aplica al caso consultado
   - Sugiere estrategias procesales cuando sea pertinente

4. SIEMPRE incluye:
   - Número de sentencia/artículo
   - Fecha o año
   - Magistrado ponente (si aplica)
   - Link de consulta sugerido (Corte Constitucional, Corte Suprema, etc.)

⚠️ Al final recuerda: "Esta información es orientativa. Verifique siempre en fuentes oficiales."

Responde de manera profesional, técnica y estructurada.`
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI Error:', data.error);
      return 'Error al consultar. Verifica tu conexión e intenta de nuevo.';
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error en jurisprudencia:', error);
    return 'Error al conectar con el servicio de jurisprudencia.';
  }
};

export const analyzeCase = async (caseDescription: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente legal para abogados colombianos. Analiza el caso presentado y proporciona:

1. CLASIFICACIÓN DEL CASO:
   - Área del derecho (laboral, civil, penal, familia, comercial, administrativo)
   - Tipo de proceso sugerido
   - Jurisdicción competente

2. ANÁLISIS JURÍDICO:
   - Hechos relevantes identificados
   - Problemas jurídicos principales
   - Normas aplicables
   - Jurisprudencia relevante

3. ESTRATEGIA SUGERIDA:
   - Pretensiones viables
   - Pruebas a recaudar
   - Términos procesales a considerar
   - Riesgos del caso

4. PROBABILIDAD DE ÉXITO: Alta / Media / Baja (con justificación)

Sé conciso pero completo. Usa lenguaje técnico-jurídico.`
          },
          {
            role: 'user',
            content: caseDescription
          }
        ],
        max_tokens: 1500,
        temperature: 0.4,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analizando caso:', error);
    return 'Error al analizar el caso.';
  }
};
