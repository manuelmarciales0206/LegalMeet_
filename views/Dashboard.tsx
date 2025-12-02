
import React, { useState } from 'react';
import { ViewState, Case, Appointment, CaseCategory } from '../types';
import { ArrowRight, Clock, Video, FileText, CheckCircle2, Search, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  setView: (view: ViewState) => void;
  upcomingAppointment: Appointment | null;
  activeCases: Case[];
  onCreateCase: (description: string, category: CaseCategory) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, upcomingAppointment, activeCases, onCreateCase }) => {
  const [caseDescription, setCaseDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CaseCategory>('Familiar');

  const categories: CaseCategory[] = ['Penal', 'Procesal', 'Familiar', 'Laboral', 'Civil'];

  const handleAnalyze = () => {
    if (caseDescription.trim().length > 0) {
      onCreateCase(caseDescription, selectedCategory);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* 
        Bloque de Exposición del Caso (Intake Form)
        Diseño Responsive: Flex-col en móvil, Flex-row en escritorio (interno).
        Uso de Grillas y Flexbox moderno.
      */}
      <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Expón tu caso</h2>
          <p className="text-slate-500 mb-6 text-sm md:text-base">
            Describe tu situación con tus propias palabras. No necesitas términos legales complejos.
          </p>

          <div className="flex flex-col gap-6">
            {/* Input Area */}
            <div className="w-full">
              <textarea
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                placeholder="Hola, cuéntanos brevemente qué te está pasando. Por ejemplo: 'Necesito ayuda con una herencia familiar que no hemos podido repartir'..."
                className="w-full h-32 p-4 rounded-xl border border-slate-300 text-slate-700 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none resize-none bg-slate-50 transition-all text-sm leading-relaxed"
              ></textarea>
            </div>

            {/* Classification & Action */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  ¿A qué se relaciona tu problema?
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-brand-800 text-white shadow-md transform scale-105'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button onClick={() => setSelectedCategory('Otro')} className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:border-brand-300">
                    Otro
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!caseDescription.trim()}
                className={`
                  flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg
                  ${caseDescription.trim() 
                    ? 'bg-action-600 hover:bg-action-700 hover:-translate-y-0.5' 
                    : 'bg-slate-300 cursor-not-allowed'}
                `}
              >
                <Search size={20} />
                <span className="md:hidden">Analizar</span>
                <span className="hidden md:inline">Analizar mi caso y buscar abogado</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer del Intake */}
        <div className="bg-brand-50 border-t border-brand-100 px-6 py-3 flex items-center gap-2 text-xs text-brand-900">
          <CheckCircle2 size={14} className="text-brand-600" />
          <span>Al hacer clic, se creará un borrador seguro de tu caso en "Mis Casos".</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Upcoming Appointment Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock className="text-brand-800" size={20} />
              Próxima Cita
            </h3>
            {upcomingAppointment && (
              <span className="text-[10px] font-bold uppercase bg-green-100 text-green-700 px-2 py-1 rounded">Confirmada</span>
            )}
          </div>
          
          {upcomingAppointment ? (
            <div className="flex-1 flex flex-col justify-center space-y-3">
               <div className="flex items-start gap-3">
                 <img src="https://picsum.photos/id/64/100/100" alt="Lawyer" className="w-12 h-12 rounded-full object-cover border border-slate-100" />
                 <div className="min-w-0">
                   <p className="font-semibold text-slate-900 truncate">{upcomingAppointment.lawyerName}</p>
                   <p className="text-xs text-slate-500 truncate">{upcomingAppointment.caseTitle}</p>
                 </div>
               </div>
               <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{new Date(upcomingAppointment.date).toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short'})}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-slate-400" />
                    <span>{upcomingAppointment.time}</span>
                 </div>
               </div>
               <button className="w-full mt-2 bg-brand-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors flex items-center justify-center gap-2 shadow-sm">
                 <Video size={16} /> Unirse ahora
               </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
               <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                 <Clock size={24} className="text-slate-300" />
               </div>
               <p className="text-slate-500 text-sm">No tienes citas programadas.</p>
               <button onClick={() => setView(ViewState.MY_APPOINTMENTS)} className="text-action-600 text-xs font-bold mt-2 hover:underline">
                 Ver historial
               </button>
            </div>
          )}
        </div>

        {/* Active Cases Summary */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-brand-800" size={20} />
              Mis Casos Activos
            </h3>
            <button 
              onClick={() => setView(ViewState.MY_CASES)}
              className="text-action-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              Gestionar casos <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {activeCases.slice(0, 3).map(c => (
              <div key={c.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-brand-200 transition-all cursor-pointer" onClick={() => setView(ViewState.MY_CASES)}>
                <div className="mb-2 sm:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900 group-hover:text-brand-900">{c.title}</h4>
                    {c.status === 'draft' && <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded uppercase">Borrador</span>}
                  </div>
                  <p className="text-xs text-slate-500">
                    {c.status === 'draft' ? 'Sin abogado asignado' : `Abogado: ${c.lawyerName}`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Siguiente paso</span>
                    <span className="text-xs font-medium text-slate-700 text-right">
                      {c.nextAction}
                    </span>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-300 group-hover:text-brand-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Simple Icon Wrappers
const CalendarIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
)

const ClockIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)

export default Dashboard;
