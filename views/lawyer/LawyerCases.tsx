
import React, { useState } from 'react';
import { ViewState, LawyerCase } from '../../types';
import { MOCK_LAWYER_CASES } from '../../services/mockData';
import { FileText, Clock, User, Filter, ChevronRight, Download } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

interface LawyerCasesProps {
  setView: (view: ViewState) => void;
}

const LawyerCases: React.FC<LawyerCasesProps> = ({ setView }) => {
  const [selectedCase, setSelectedCase] = useState<LawyerCase | null>(null);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Mis Casos</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
          <Filter size={16} /> Filtrar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Case List */}
        <div className="lg:col-span-1 space-y-4">
          {MOCK_LAWYER_CASES.map(c => (
            <div 
              key={c.id} 
              onClick={() => setSelectedCase(c)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedCase?.id === c.id ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' : 'bg-white border-slate-200 hover:border-brand-300'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={c.clientAvatar} alt={c.clientName} className="w-8 h-8 rounded-full" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{c.clientName}</h4>
                  <p className="text-xs text-slate-500">{c.category}</p>
                </div>
              </div>
              <h3 className="font-bold text-brand-900 text-sm mb-1">{c.title}</h3>
              <div className="flex items-center justify-between mt-2">
                 <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded uppercase">{c.status}</span>
                 <ChevronRight size={16} className="text-slate-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedCase.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">{selectedCase.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Honorarios</p>
                  <p className="font-bold text-slate-800">${selectedCase.fee.toLocaleString()}</p>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${selectedCase.feeStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {selectedCase.feeStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Próxima Audiencia</p>
                    <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                       <Clock size={16} className="text-brand-800" />
                       {selectedCase.nextHearing || 'Por definir'}
                    </div>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Cliente</p>
                    <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                       <User size={16} className="text-brand-800" />
                       {selectedCase.clientName}
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                   <h3 className="font-bold text-slate-800 text-sm mb-3">Línea de tiempo</h3>
                   <div className="space-y-4 pl-2 border-l-2 border-slate-100">
                     {selectedCase.timeline.map((item, i) => (
                       <div key={i} className="relative pl-4">
                         <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-500"></div>
                         <p className="text-xs text-slate-400 font-bold mb-0.5">{item.date}</p>
                         <p className="text-sm font-bold text-slate-800">{item.action}</p>
                         <p className="text-xs text-slate-600">{item.description}</p>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h3 className="font-bold text-slate-800 text-sm mb-3">Documentos</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {selectedCase.documents.map((doc, i) => (
                       <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <div className="flex items-center gap-2 overflow-hidden">
                             <FileText size={16} className="text-red-500 shrink-0" />
                             <span className="text-sm text-slate-700 truncate">{doc.name}</span>
                          </div>
                          <button className="text-slate-400 hover:text-brand-800">
                             <Download size={16} />
                          </button>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-2">Notas Privadas</h3>
                    <textarea 
                      className="w-full p-3 bg-yellow-50/50 border border-yellow-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      rows={3}
                      defaultValue={selectedCase.notes}
                    ></textarea>
                 </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
                  Contactar Cliente
                </button>
                <button className="px-4 py-2 bg-brand-800 text-white rounded-lg text-sm font-bold hover:bg-brand-900">
                  Actualizar Estado
                </button>
              </div>

            </div>
          ) : (
            <EmptyState 
              icon={FileText} 
              title="Selecciona un caso" 
              description="Haz clic en un caso de la lista para ver los detalles completos." 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerCases;
