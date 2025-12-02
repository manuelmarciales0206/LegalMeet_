import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, Bot, HelpCircle } from 'lucide-react';

const Support: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hola, soy tu asistente legal virtual. ¿En qué puedo orientarte hoy? (Ej: ¿Cómo crear un caso?, ¿Qué hace un abogado laboral?)' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToAssistant(input);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      
      {/* FAQ Sidebar */}
      <div className="hidden md:block w-1/3 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Preguntas Frecuentes</h2>
        <div className="space-y-2">
          {['¿Cómo pago mi cita?', '¿Es seguro subir mis documentos?', '¿Cómo cancelo una cita?', 'Garantía de servicio'].map((q, i) => (
            <button key={i} className="w-full text-left p-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:border-brand-300 hover:text-brand-800 transition-colors flex justify-between items-center">
              {q}
              <HelpCircle size={14} className="text-slate-400" />
            </button>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-900 text-sm mb-2">¿Necesitas un humano?</h3>
          <p className="text-xs text-blue-700 mb-3">Si el asistente no resuelve tu duda, contacta a soporte.</p>
          <button className="w-full bg-white text-blue-700 border border-blue-200 py-2 rounded-lg text-xs font-bold hover:bg-blue-50">
            Contactar Soporte
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Bot className="text-brand-800" size={20} />
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Asistente Legal IA</h3>
            <p className="text-[10px] text-slate-500">Respuestas generadas por IA. No sustituye a un abogado.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[80%] rounded-2xl px-4 py-3 text-sm
                ${msg.role === 'user' 
                  ? 'bg-brand-800 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                 <div className="flex space-x-1">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
             </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 border-t border-slate-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-brand-800 text-white p-2 rounded-lg hover:bg-brand-900 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
