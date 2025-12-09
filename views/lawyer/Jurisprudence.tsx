
import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { searchJurisprudence } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';

const Jurisprudence: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult('');
    const response = await searchJurisprudence(query);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-brand-900 rounded-2xl p-8 mb-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
           <BookOpen /> Jurisprudencia & Leyes
        </h2>
        <p className="text-brand-100 mb-6 text-sm">Busca sentencias, artículos y marcos legales actualizados con IA.</p>
        
        <div className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ej: Requisitos para custodia compartida en Colombia..."
            className="w-full p-4 pl-12 rounded-xl text-slate-900 focus:outline-none shadow-xl"
          />
          <Search className="absolute left-4 top-4 text-slate-400" />
          <button 
             onClick={handleSearch}
             disabled={loading}
             className="absolute right-2 top-2 bg-brand-800 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
          >
             {loading ? 'Buscando...' : 'Consultar'}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
         {result ? (
            <div className="p-8 overflow-y-auto prose prose-slate max-w-none">
               <ReactMarkdown>{result}</ReactMarkdown>
            </div>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
               <BookOpen size={48} className="mb-4 opacity-20" />
               <p>Los resultados de tu investigación aparecerán aquí.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default Jurisprudence;
