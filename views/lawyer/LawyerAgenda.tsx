
import React from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

const LawyerAgenda: React.FC = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const hours = Array.from({length: 10}, (_, i) => i + 8); // 8am to 5pm

  return (
    <div className="max-w-6xl mx-auto animate-fade-in h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Mi Agenda</h2>
        <div className="flex gap-2">
           <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2">
              <button className="p-2 hover:bg-slate-100 rounded-md"><ChevronLeft size={18} /></button>
              <span className="text-sm font-bold px-2">Nov 27 - Dic 03</span>
              <button className="p-2 hover:bg-slate-100 rounded-md"><ChevronRight size={18} /></button>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Settings size={16} /> Configurar Disponibilidad
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
        {/* Header Row */}
        <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50">
           <div className="p-4 border-r border-slate-200 text-xs font-bold text-slate-400 uppercase text-center">Hora</div>
           {days.map(d => (
             <div key={d} className="p-4 border-r border-slate-200 last:border-0 text-center">
               <span className="text-xs font-bold text-slate-700 uppercase block">{d}</span>
             </div>
           ))}
        </div>

        {/* Calendar Body */}
        <div className="overflow-y-auto flex-1">
           {hours.map(h => (
             <div key={h} className="grid grid-cols-8 border-b border-slate-100 min-h-[80px]">
                <div className="p-2 border-r border-slate-100 text-xs text-slate-400 font-medium text-center relative">
                  <span className="-top-2.5 relative">{h}:00</span>
                </div>
                {days.map((d, i) => (
                  <div key={`${d}-${h}`} className="border-r border-slate-100 last:border-0 relative p-1">
                    {/* Mock Events */}
                    {h === 10 && d === 'Lunes' && (
                       <div className="absolute inset-1 bg-blue-100 border border-blue-200 rounded p-1.5 text-xs overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                          <p className="font-bold text-blue-800 truncate">Juan Pérez</p>
                          <p className="text-blue-600 truncate">Consulta Inicial</p>
                       </div>
                    )}
                    {h === 14 && d === 'Miércoles' && (
                       <div className="absolute inset-1 bg-green-100 border border-green-200 rounded p-1.5 text-xs overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                          <p className="font-bold text-green-800 truncate">María López</p>
                          <p className="text-green-600 truncate">Revisión Docs</p>
                       </div>
                    )}
                  </div>
                ))}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerAgenda;
