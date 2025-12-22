
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Briefcase, DollarSign, FileText, CheckCircle } from 'lucide-react';

const LawyerRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  if (isComplete) {
    return (
      <div className="max-w-xl mx-auto mt-12 text-center p-8 bg-white rounded-3xl shadow-xl border animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud Enviada!</h2>
        <p className="text-slate-600 mb-8">Estamos revisando tu perfil profesional. Te notificaremos al correo electrónico en un plazo máximo de 48 horas.</p>
        <button onClick={() => window.location.reload()} className="w-full py-4 bg-brand-800 text-white rounded-2xl font-bold hover:bg-brand-900 shadow-lg">Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Afiliarse como Abogado</h1>
        <p className="text-slate-500 font-medium">Únete a la red legal más confiable de Colombia.</p>
      </div>

      <div className="flex gap-2 mb-10">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`flex-1 h-2.5 rounded-full transition-all duration-500 ${s <= step ? 'bg-action-600 shadow-sm' : 'bg-slate-200'}`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {step === 1 && (
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <User className="text-action-600" /> Datos Personales
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre Completo</label>
                <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all" placeholder="Ej: Dra. Ana María Pérez" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Teléfono Celular</label>
                <input type="tel" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all" placeholder="+57" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ciudad</label>
                <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all" placeholder="Ej: Bogotá" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Briefcase className="text-action-600" /> Información Profesional
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tarjeta Profesional (Número)</label>
                <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all" placeholder="TP-000000" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Universidad de Egreso</label>
                <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Especialidades (Separadas por coma)</label>
                <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all" placeholder="Laboral, Civil, Penal..." />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <DollarSign className="text-action-600" /> Tarifas y Horarios
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Precio Consulta Inicial (COP)</label>
                <input type="number" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-action-600 transition-all font-bold" placeholder="80000" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-4">Días de Disponibilidad</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(d => (
                    <label key={d} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-all">
                      <input type="checkbox" className="rounded text-action-600" />
                      <span className="text-xs font-bold text-slate-700">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <FileText className="text-action-600" /> Documentos de Soporte
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Cédula de Ciudadanía', info: 'PDF o JPG legible' },
                { label: 'Tarjeta Profesional', info: 'Por ambas caras' },
                { label: 'Hoja de Vida', info: 'Actualizada' }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-action-200 transition-all cursor-pointer group">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{doc.label}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{doc.info}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 group-hover:bg-action-50 text-slate-400 group-hover:text-action-600 rounded-xl flex items-center justify-center transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              <ChevronLeft size={20} /> Atrás
            </button>
          )}
          <button
            onClick={() => step < 4 ? setStep(step + 1) : setIsComplete(true)}
            className="flex-[2] py-4 bg-action-600 text-white rounded-2xl font-bold text-lg hover:bg-action-700 shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            {step === 4 ? 'Finalizar Registro' : 'Continuar'} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistration;
