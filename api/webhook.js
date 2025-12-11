// api/webhook.js
// Webhook para WhatsApp Business API + OpenAI

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'legalmeet_verify_2024';
const APP_URL = process.env.APP_URL || 'https://legal-meet.vercel.app';

// Almacenamiento temporal de conversaciones (en producción usar base de datos)
const conversations = new Map();

// Configuración del asistente legal
const SYSTEM_PROMPT = `Eres el asistente legal virtual de LegalMeet, una plataforma colombiana que conecta personas con abogados certificados.

Tu rol es:
1. Saludar amablemente y preguntar en qué puedes ayudar
2. Escuchar el problema legal del usuario con empatía
3. Hacer 2-3 preguntas clave para entender mejor el caso
4. Clasificar el caso en una categoría: Laboral, Familiar, Penal, Civil, Comercial
5. Dar una orientación básica (NO consejo legal vinculante)
6. Informar el rango de precio estimado de una consulta
7. Ofrecer agendar cita con un abogado especialista

Rangos de precios por categoría:
- Laboral: $80.000 - $150.000 COP
- Familiar: $80.000 - $150.000 COP
- Penal: $120.000 - $200.000 COP
- Civil: $80.000 - $150.000 COP
- Comercial: $100.000 - $180.000 COP

Reglas:
- Usa lenguaje sencillo, sin tecnicismos
- Sé empático y comprensivo
- NO des consejos legales específicos, solo orientación general
- Siempre recomienda consultar con un abogado para el caso específico
- Respuestas cortas (máximo 3-4 oraciones por mensaje)
- Usa emojis ocasionalmente para ser amigable 😊

Cuando tengas suficiente información del caso (después de 2-3 intercambios), genera un resumen y ofrece el link para agendar cita.`;

// Función para llamar a OpenAI
async function callOpenAI(messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Función para clasificar el caso
async function classifyCase(conversation) {
  const classifyPrompt = `Basándote en esta conversación, clasifica el caso legal.

Conversación:
${conversation.map(m => `${m.role}: ${m.content}`).join('\n')}

Responde SOLO con un JSON válido (sin markdown, sin backticks):
{"categoria": "Laboral|Familiar|Penal|Civil|Comercial", "descripcion_corta": "resumen en 10 palabras", "precio_min": 80000, "precio_max": 150000}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: classifyPrompt }],
      max_tokens: 150,
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  try {
    return JSON.parse(data.choices[0].message.content);
  } catch (e) {
    return { categoria: 'Civil', descripcion_corta: 'Consulta legal general', precio_min: 80000, precio_max: 150000 };
  }
}

// Función para enviar mensaje de WhatsApp
async function sendWhatsAppMessage(to, message) {
  const url = `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: message }
    }),
  });

  return response.json();
}

// Función para enviar mensaje con botón/link
async function sendWhatsAppMessageWithLink(to, message, linkText, linkUrl) {
  // Primero enviamos el mensaje de texto
  await sendWhatsAppMessage(to, message);
  
  // Luego enviamos el link
  await sendWhatsAppMessage(to, `👉 ${linkText}: ${linkUrl}`);
}

// Handler principal
export default async function handler(req, res) {
  // Verificación del webhook (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Forbidden');
    }
  }

  // Recibir mensajes (POST)
  if (req.method === 'POST') {
    try {
      const body = req.body;

      if (body.object === 'whatsapp_business_account') {
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;

        if (messages && messages.length > 0) {
          const message = messages[0];
          const from = message.from; // Número del usuario
          const messageType = message.type;
          
          let userMessage = '';
          
          // Manejar diferentes tipos de mensajes
          if (messageType === 'text') {
            userMessage = message.text.body;
          } else if (messageType === 'audio') {
            userMessage = '[El usuario envió un audio - Por favor escribe tu consulta]';
            await sendWhatsAppMessage(from, '🎤 Recibí tu audio. Por ahora solo puedo procesar mensajes de texto. ¿Podrías escribir tu consulta? 😊');
            return res.status(200).json({ status: 'ok' });
          } else {
            userMessage = '[Mensaje no soportado]';
            await sendWhatsAppMessage(from, 'Por ahora solo puedo procesar mensajes de texto. ¿En qué puedo ayudarte? 😊');
            return res.status(200).json({ status: 'ok' });
          }

          // Obtener o crear conversación
          let conversation = conversations.get(from) || [];
          
          // Agregar mensaje del usuario
          conversation.push({ role: 'user', content: userMessage });

          // Verificar si es momento de ofrecer el link (después de 3+ mensajes)
          const shouldOfferLink = conversation.filter(m => m.role === 'user').length >= 3;

          let aiResponse;

          if (shouldOfferLink && !conversation.some(m => m.content.includes('legal-meet.vercel.app'))) {
            // Clasificar el caso
            const classification = await classifyCase(conversation);
            
            // Generar respuesta con link
            const linkParams = new URLSearchParams({
              tipo: classification.categoria.toLowerCase(),
              descripcion: classification.descripcion_corta,
              telefono: from,
              precio_min: classification.precio_min,
              precio_max: classification.precio_max
            });
            
            const appLink = `${APP_URL}?${linkParams.toString()}`;
            
            aiResponse = `Entiendo tu situación. Tu caso parece ser de tipo *${classification.categoria}*.\n\n` +
              `💰 El precio estimado de una consulta inicial es entre $${classification.precio_min.toLocaleString()} y $${classification.precio_max.toLocaleString()} COP.\n\n` +
              `Te recomiendo agendar una cita con uno de nuestros abogados especialistas para que te asesore mejor.\n\n` +
              `👉 Agenda tu cita aquí: ${appLink}`;
          } else {
            // Respuesta normal de la IA
            aiResponse = await callOpenAI(conversation);
          }

          // Guardar respuesta de la IA
          conversation.push({ role: 'assistant', content: aiResponse });
          conversations.set(from, conversation);

          // Enviar respuesta por WhatsApp
          await sendWhatsAppMessage(from, aiResponse);

          // Limpiar conversaciones viejas (más de 1 hora)
          const oneHourAgo = Date.now() - (60 * 60 * 1000);
          for (const [key, value] of conversations.entries()) {
            if (value.timestamp && value.timestamp < oneHourAgo) {
              conversations.delete(key);
            }
          }
        }

        return res.status(200).json({ status: 'ok' });
      }

      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(200).json({ status: 'error', message: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
