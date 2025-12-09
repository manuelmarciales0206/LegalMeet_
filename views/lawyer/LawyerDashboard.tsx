
import React from 'react';
import { ViewState } from '../../types';
import { Briefcase, Calendar, DollarSign, Star, Clock, AlertCircle } from 'lucide-react';
import { MOCK_LAWYER_CASES } from '../../services/mockData';

interface LawyerDashboardProps {
  setView: (view: ViewState) => void;
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ setView }) => {
  
  const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
      <div className={`p-3 rounded-full ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Casos Activos" value={MOCK_LAWYER_CASES.length} colorClass="bg-blue-50 text-blue-600" />
        <StatCard icon={Calendar} label="Citas Hoy" value="3" colorClass="bg-green-50 text-green-600" />
        <StatCard icon={DollarSign} label="Ingresos Mes" value="$2.4M" colorClass="bg-yellow-50 text-yellow-600" />
        <StatCard icon={Star} label="Calificación" value="4.8" colorClass="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Agenda Today */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-brand-800" /> Agenda de Hoy
          </h3>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', client: 'Juan Pérez', type: 'Laboral', action: 'Video Consulta' },
              { time: '02:00 PM', client: 'María López', type: 'Familiar', action: 'Chat Revisión' },
              { time: '04:30 PM', client: 'Pedro Gómez', type: 'Penal', action: 'Video Consulta' }
            ].map((apt, i) => (
              <div key={i} className="flex items-center p-3 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors">
                <div className="w-20 font-bold text-slate-600 text-sm">{apt.time}</div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm">{apt.client}</p>
                  <p className="text-xs text-slate-500">{apt.type} • {apt.action}</p>
                </div>
                <button className="px-3 py-1.5 bg-brand-800 text-white text-xs font-bold rounded-lg hover:bg-brand-900">
                  Unirse
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setView(ViewState.LAWYER_AGENDA)} className="w-full mt-4 py-2 text-sm text-brand-800 font-bold hover:bg-brand-50 rounded-lg">
            Ver agenda completa
          </button>
        </div>

        {/* Attention Required */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-600" /> Requiere Atención
          </h3>
          <div className="space-y-4">
            {MOCK_LAWYER_CASES.map((c) => (
              <div key={c.id} className="p-3 border-l-4 border-orange-400 bg-orange-50/50 rounded-r-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">{c.title}</h4>
                  <span className="text-[10px] text-slate-500">{c.lastUpdate}</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">Cliente: {c.clientName}</p>
                <div className="flex gap-2">
                  <button onClick={() => setView(ViewState.LAWYER_CASES)} className="text-xs font-bold text-orange-700 hover:underline">Gestionar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4">Ingresos últimos 6 meses</h3>
        <div className="h-40 flex items-end justify-between px-4 gap-2">
           {[35, 45, 30, 60, 50, 75].map((h, i) => (
             <div key={i} className="w-full bg-brand-100 rounded-t-lg relative group">
               <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-brand-800 rounded-t-lg transition-all hover:bg-brand-900"></div>
               <span className="absolute -bottom-6 w-full text-center text-xs text-slate-500 font-medium">
                 {['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
               </span>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

export default LawyerDashboard;
