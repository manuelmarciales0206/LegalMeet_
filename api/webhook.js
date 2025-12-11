// api/webhook.js
// Webhook para WhatsApp Business API + OpenAI + Whisper (audios)

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'legalmeet_verify_2024';
const APP_URL = process.env.APP_URL || 'https://legal-meet.vercel.app';

const conversations = new Map();

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
- Siempre recomienda consultar con un abogado
- Respuestas cortas (máximo 3-4 oraciones)
- Usa emojis ocasionalmente 😊`;

// Función para descargar audio de WhatsApp
async function downloadWhatsAppMedia(mediaId) {
  const mediaResponse = await fetch(`https://graph.facebook.com/v22.0/${mediaId}`, {
    headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` },
  });
  const mediaData = await mediaResponse.json();
  
  const audioResponse = await fetch(mediaData.url, {
    headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` },
  });
  
  const audioBuffer = await audioResponse.arrayBuffer();
  return Buffer.from(audioBuffer);
}

// Función para transcribir audio con Whisper
async function transcribeAudio(audioBuffer) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.ogg"\r\nContent-Type: audio/ogg\r\n\r\n`),
    audioBuffer,
    Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\nwhisper-1\r\n`),
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\nes\r\n`),
    Buffer.from(`--${boundary}--\r\n`)
  ]);
  
  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
    },
    body: body,
  });
  
  const data = await response.json();
  return data.text || '';
}

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
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

// Función para clasificar el caso
async function classifyCase(conversation) {
  const classifyPrompt = `Basándote en esta conversación, clasifica el caso legal y extrae información.

Conversación:
${conversation.map(m => `${m.role}: ${m.content}`).join('\n')}

Responde SOLO con JSON válido (sin markdown, sin backticks):
{
  "categoria": "Laboral|Familiar|Penal|Civil|Comercial",
  "descripcion_corta": "resumen máximo 50 caracteres",
  "descripcion_completa": "resumen completo del caso en 2-3 oraciones",
  "precio_min": 80000,
  "precio_max": 150000,
  "nombre_usuario": "nombre si lo mencionó o vacío",
  "urgencia": "alta|media|baja"
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: classifyPrompt }],
      max_tokens: 300,
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  try {
    const content = data.choices[0].message.content;
    const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanContent);
  } catch (e) {
    return { 
      categoria: 'Civil', 
      descripcion_corta: 'Consulta legal general',
      descripcion_completa: 'El usuario necesita asesoría legal.',
      precio_min: 80000, 
      precio_max: 150000,
      nombre_usuario: '',
      urgencia: 'media'
    };
  }
}

// Función para enviar mensaje de WhatsApp
async function sendWhatsAppMessage(to, message) {
  await fetch(`https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`, {
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
}

// Handler principal
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      
      if (body.object === 'whatsapp_business_account') {
        const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
        
        if (messages && messages.length > 0) {
          const message = messages[0];
          const from = message.from;
          const messageType = message.type;
          
          let userMessage = '';
          
          if (messageType === 'text') {
            userMessage = message.text.body;
          } else if (messageType === 'audio') {
            try {
              await sendWhatsAppMessage(from, '🎤 Recibí tu audio, déjame escucharlo... ⏳');
              const audioBuffer = await downloadWhatsAppMedia(message.audio.id);
              userMessage = await transcribeAudio(audioBuffer);
              
              if (!userMessage || userMessage.trim() === '') {
                await sendWhatsAppMessage(from, '❌ No pude entender el audio. ¿Podrías repetirlo o escribir tu consulta?');
                return res.status(200).json({ status: 'ok' });
              }
            } catch (audioError) {
              console.error('Error procesando audio:', audioError);
              await sendWhatsAppMessage(from, '❌ Hubo un problema procesando tu audio. ¿Podrías escribir tu consulta?');
              return res.status(200).json({ status: 'ok' });
            }
          } else {
            await sendWhatsAppMessage(from, '¿En qué puedo ayudarte hoy? 😊');
            return res.status(200).json({ status: 'ok' });
          }

          let conversation = conversations.get(from) || [];
          conversation.push({ role: 'user', content: userMessage });

          const userMessages = conversation.filter(m => m.role === 'user').length;
          let aiResponse;

          if (userMessages >= 3 && !conversation.some(m => m.content && m.content.includes('legal-meet.vercel.app'))) {
            const classification = await classifyCase(conversation);
            
            const linkParams = new URLSearchParams({
              tipo: classification.categoria.toLowerCase(),
              descripcion: classification.descripcion_completa || classification.descripcion_corta,
              telefono: from.replace('57', ''),
              precio_min: classification.precio_min.toString(),
              precio_max: classification.precio_max.toString(),
              nombre: classification.nombre_usuario || '',
              urgencia: classification.urgencia || 'media',
              from_whatsapp: 'true'
            });
            
            const appLink = `${APP_URL}?${linkParams.toString()}`;
            
            aiResponse = `✅ Entiendo tu situación. Tu caso parece ser de tipo *${classification.categoria}*.\n\n` +
              `📋 *Resumen:* ${classification.descripcion_corta}\n\n` +
              `💰 *Precio estimado:* $${classification.precio_min.toLocaleString('es-CO')} - $${classification.precio_max.toLocaleString('es-CO')} COP\n\n` +
              `👨‍⚖️ Te recomiendo agendar una cita con uno de nuestros abogados especialistas.\n\n` +
              `👉 *Agenda tu cita aquí:*\n${appLink}`;
          } else {
            aiResponse = await callOpenAI(conversation);
          }

          conversation.push({ role: 'assistant', content: aiResponse });
          conversations.set(from, conversation);
          await sendWhatsAppMessage(from, aiResponse);
        }
      }
      
      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(200).json({ status: 'error', message: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
