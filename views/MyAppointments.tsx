
import React from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, Video, MessageSquare, ChevronRight, CalendarOff } from 'lucide-react';
import EmptyState from '../components/EmptyState';

interface MyAppointmentsProps {
  appointments: Appointment[];
}

const MyAppointments: React.FC<MyAppointmentsProps> = ({ appointments }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mis Citas</h2>
          <p className="text-sm text-slate-500 font-medium">Gestiona tus encuentros con abogados expertos.</p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <EmptyState 
          icon={CalendarOff}
          title="No tienes citas agendadas"
          description="Comienza una nueva consulta para hablar con un abogado hoy mismo."
          actionLabel="Agendar mi primera cita"
          onAction={() => window.location.reload()}
        />
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img src={apt.lawyerPhoto} alt={apt.lawyerName} className="w-16 h-16 rounded-2xl object-cover border border-slate-100" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 truncate">{apt.lawyerName}</h3>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase">Confirmada</span>
                  </div>
                  <p className="text-xs text-action-600 font-bold uppercase tracking-wide mb-3">{apt.lawyerSpecialty}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(apt.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', weekday: 'short' })}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Clock size={14} className="text-slate-400" />
                      {apt.time}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button className="flex-1 bg-brand-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-900 flex items-center justify-center gap-2 shadow-sm">
                    <Video size={16} /> Unirse
                  </button>
                  <button className="flex-1 sm:flex-none p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-xl transition-colors flex items-center justify-center">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
