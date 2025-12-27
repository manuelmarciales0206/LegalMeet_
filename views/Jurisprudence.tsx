// views/Jurisprudence.tsx
import React, { useState } from 'react';
import { searchJurisprudenceAI, analyzeCase } from '../services/openaiService';
import { Search, FileText, Clipboard, History, AlertTriangle, Scale, BookOpen } from 'lucide-react';

const Jurisprudence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'analyze'>('search');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('legalmeet_search_history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResult('');
    
    const response = activeTab === 'search' 
      ? await searchJurisprudenceAI(query)
      : await analyzeCase(query);
    
    setResult(response);
    setIsLoading(false);
    
    // Guardar en historial
    if (!searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('legalmeet_search_history', JSON.stringify(newHistory));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    // Podría añadirse un toast aquí
  };

  const exampleQueries = {
    search: [
      'Sentencias sobre despido sin justa causa en Colombia',
      'Jurisprudencia sobre custodia compartida',
      'Precedentes de responsabilidad médica',
      'Sentencias de tutela por derecho al mínimo vital',
      'Jurisprudencia sobre contrato de arrendamiento',
    ],
    analyze: [
      'Mi cliente fue despedido después de 10 años de trabajo por supuesto bajo rendimiento, pero nunca le hicieron llamados de atención ni seguieron el debido proceso disciplinario.',
      'Pareja separada hace 2 años, padre no paga cuota alimentaria de $500.000 desde hace 8 meses. Madre tiene custodia.',
      'Paciente sufrió complicaciones después de cirugía estética. El médico no informó adecuadamente los riesgos.',
    ]
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto animate-fade-in pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
          <Scale className="text-cyan-600" size={32} /> Jurisprudencia IA
        </h1>
        <p className="text-slate-500 font-medium">Investigación legal técnica y análisis de precedentes en Colombia.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 w-fit">
        <button
          onClick={() => { setActiveTab('search'); setResult(''); setQuery(''); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'search'
              ? 'bg-white text-cyan-700 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Search size={18} /> Buscar Jurisprudencia
        </button>
        <button
          onClick={() => { setActiveTab('analyze'); setResult(''); setQuery(''); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'analyze'
              ? 'bg-white text-cyan-700 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText size={18} /> Analizar Caso
        </button>
      </div>

      {/* Input */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <BookOpen size={120} />
        </div>
        
        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
          {activeTab === 'search' ? '¿Qué precedentes o normas necesitas?' : 'Describe los hechos y hechos jurídicos'}
        </label>
        
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={activeTab === 'search' 
            ? 'Ej: Sentencias de la Corte Constitucional sobre el derecho al olvido...'
            : 'Mi cliente solicita reconocimiento de pensión de sobreviviente pero la entidad alega...'
          }
          className="w-full h-40 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition-all text-slate-800 leading-relaxed"
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase">IA especializada en derecho colombiano v1.0</p>
          <button
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
              query.trim() && !isLoading
                ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:-translate-y-0.5'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Consultando...</>
            ) : (
              activeTab === 'search' ? <><Search size={16} /> Buscar Precedentes</> : <><FileText size={16} /> Analizar Estrategia</>
            )}
          </button>
        </div>
      </div>

      {/* Sugerencias y Ejemplos */}
      {!result && !isLoading && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
             <Scale size={16} />
             <h3 className="text-xs font-black uppercase tracking-widest">Ejemplos de consulta sugeridos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries[activeTab].map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="p-4 bg-white border border-slate-100 rounded-2xl text-left hover:border-cyan-200 hover:bg-cyan-50/30 transition-all group"
              >
                <p className="text-sm text-slate-600 font-medium group-hover:text-cyan-800 line-clamp-2">{example}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resultado */}
      {result && !isLoading && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              {activeTab === 'search' ? <BookOpen size={18} className="text-cyan-600" /> : <FileText size={18} className="text-cyan-600" />}
              {activeTab === 'search' ? 'Investigación Jurídica' : 'Análisis Estratégico'}
            </h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-500 hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all"
            >
              <Clipboard size={14} /> Copiar Texto
            </button>
          </div>
          <div className="p-8">
            <div className="prose prose-slate max-w-none prose-sm">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
                {result}
              </div>
            </div>
            
            <div className="mt-10 p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
              <AlertTriangle className="text-amber-500 shrink-0" size={20} />
              <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                ADVERTENCIA: Esta respuesta ha sido generada por inteligencia artificial. Es una herramienta de apoyo que no exime al profesional de su deber de verificar la vigencia de sentencias y normas en fuentes oficiales (Relatoría de Cortes, Gaceta del Congreso, etc.).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Historial (Opcional) */}
      {searchHistory.length > 0 && !result && !isLoading && (
        <div className="mt-12 opacity-60">
           <div className="flex items-center gap-2 mb-4 text-slate-400">
             <History size={16} />
             <h3 className="text-xs font-black uppercase tracking-widest">Consultas recientes</h3>
          </div>
          <div className="space-y-2">
            {searchHistory.map((h, i) => (
              <button 
                key={i} 
                onClick={() => setQuery(h)}
                className="w-full text-left p-3 text-xs text-slate-500 hover:text-cyan-600 transition-colors truncate"
              >
                • {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jurisprudence;