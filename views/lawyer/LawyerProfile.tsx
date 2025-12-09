
import React from 'react';
import { User, Save, Upload } from 'lucide-react';

const LawyerProfile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold text-slate-800">Mi Perfil Profesional</h2>
         <button className="flex items-center gap-2 px-6 py-2 bg-brand-800 text-white rounded-lg text-sm font-bold hover:bg-brand-900 shadow-sm">
            <Save size={16} /> Guardar Cambios
         </button>
       </div>

       <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8">
          
          {/* Header Info */}
          <div className="flex items-start gap-6">
             <div className="relative group cursor-pointer">
                <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-24 h-24 rounded-xl object-cover" />
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Upload className="text-white" size={24} />
                </div>
             </div>
             <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">Dra. Ana María González</h3>
                <p className="text-brand-600 font-bold mb-2">Especialista en Derecho de Familia</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                   <span>★ 4.9 (124 reseñas)</span>
                   <span>•</span>
                   <span>Bogotá, D.C.</span>
                </div>
             </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nombre Completo</label>
                <input type="text" defaultValue="Ana María González" className="w-full p-3 border border-slate-300 rounded-lg text-sm" />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Correo Profesional</label>
                <input type="email" defaultValue="ana.gonzalez@legalmeet.co" className="w-full p-3 border border-slate-300 rounded-lg text-sm bg-slate-50" disabled />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Universidad</label>
                <input type="text" defaultValue="Pontificia Universidad Javeriana" className="w-full p-3 border border-slate-300 rounded-lg text-sm" />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tarjeta Profesional</label>
                <input type="text" defaultValue="TP-345678" className="w-full p-3 border border-slate-300 rounded-lg text-sm" />
             </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Descripción Profesional</label>
             <textarea className="w-full p-3 border border-slate-300 rounded-lg text-sm h-32" defaultValue="Abogada especialista en derecho de familia con enfoque humano. Divorcios, custodia, alimentos y sucesiones. Más de 15 años de experiencia litigando en Bogotá."></textarea>
          </div>

          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Tarifas y Disponibilidad</label>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                   <p className="text-xs text-slate-500 mb-1">Consulta Inicial</p>
                   <p className="font-bold text-slate-800">$80.000 COP</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                   <p className="text-xs text-slate-500 mb-1">Hora Adicional</p>
                   <p className="font-bold text-slate-800">$150.000 COP</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg flex flex-col gap-2">
                   <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" defaultChecked className="text-brand-600 rounded" /> Video
                   </label>
                   <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" defaultChecked className="text-brand-600 rounded" /> Chat
                   </label>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

export default LawyerProfile;
