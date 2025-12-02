
import React from 'react';
import { Case } from '../types';
import { FileText, Clock, MoreVertical, UploadCloud, CalendarPlus, UserPlus, Briefcase } from 'lucide-react';
import EmptyState from '../components/EmptyState';

interface MyCasesProps {
  cases: Case[];
  onScheduleForCase?: (caseId: string) => void;
  onNewCase: () => void;
}

const MyCases: React.FC<MyCasesProps> = ({ cases, onScheduleForCase, onNewCase }) => {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Mis Casos</h2>
          <p className="text-slate-500 text-sm">Gestiona tus procesos legales y comunícate con tu abogado.</p>
        </div>
        {cases.length > 0 && (
          <button 
            onClick={onNewCase}
            className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 shadow-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            <FileText size={16} /> Crear nuevo asunto
          </button>
        )}
      </div>

      {cases.length === 0 ? (
        <EmptyState 
          icon={Briefcase}
          title="Aún no tienes casos activos"
          description="Aquí verás el seguimiento de tus procesos legales. Comienza exponiendo tu problema para encontrar un abogado."
          actionLabel="Crear mi primer caso"
          onAction={onNewCase}
        />
      ) : (
        <div className="space-y-6">
          {cases.map((c) => (
            <div key={c.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-white">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase border ${
                      c.status === 'active' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      c.status === 'draft' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                      'bg-gray-50 text-gray-700 border-gray-100'
                    }`}>
                      {c.status === 'draft' ? 'Borrador' : c.status === 'active' ? 'En Proceso' : c.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{c.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{c.title}</h3>
                  
                  {c.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 mb-2 max-w-2xl">{c.description}</p>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    {c.lawyerName ? (
                      <>
                        <span className="text-slate-400">Abogado:</span>
                        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                           <div className="w-4 h-4 rounded-full bg-slate-300"></div> 
                           <span className="font-bold text-slate-700 text-xs">{c.lawyerName}</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-orange-600 text-xs font-bold flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                        <UserPlus size={14} /> Pendiente asignar abogado
                      </span>
                    )}
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Timeline / Progress (Only for active cases) */}
              {c.status !== 'draft' ? (
                <div className="p-6 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estado del proceso</span>
                    <span className="text-xs font-bold text-brand-800">{c.progress}% completado</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
                    <div className="bg-brand-800 h-2 rounded-full transition-all duration-500" style={{ width: `${c.progress}%` }}></div>
                  </div>

                  {/* Simplified Steps Visual */}
                  <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    <span className="text-brand-800">Inicio</span>
                    <span className={c.progress > 30 ? "text-brand-800" : ""}>Documentación</span>
                    <span className={c.progress > 60 ? "text-brand-800" : ""}>Radicación</span>
                    <span className={c.progress === 100 ? "text-brand-800" : ""}>Fallo</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-yellow-50/30 border-b border-yellow-100/50 flex gap-3">
                   <Clock size={20} className="text-yellow-600 flex-shrink-0 mt-0.5"/>
                   <div>
                     <p className="text-sm font-bold text-slate-800">Tu caso está en borrador</p>
                     <p className="text-sm text-slate-600 mt-1">
                       Hemos guardado tu descripción. Ahora debes buscar un abogado especialista para comenzar el proceso formal.
                    </p>
                   </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-2 text-sm text-slate-600 w-full sm:w-auto">
                  {c.status !== 'draft' && (
                    <>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-action-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-action-600"></span>
                      </span>
                      <span className="text-xs text-slate-500">Siguiente paso:</span>
                      <span className="font-medium text-slate-900">{c.nextAction}</span>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  {c.status !== 'draft' ? (
                    <>
                       <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                        <UploadCloud size={14} /> Documentos
                      </button>
                      <button 
                        onClick={() => onScheduleForCase && onScheduleForCase(c.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-800 hover:bg-brand-900 rounded-lg transition-colors shadow-sm"
                      >
                        <CalendarPlus size={14} /> Agendar Cita
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => onScheduleForCase && onScheduleForCase(c.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-action-600 hover:bg-action-700 rounded-lg transition-colors shadow-sm animate-pulse"
                    >
                      <UserPlus size={14} /> Buscar Abogado Ahora
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCases;
