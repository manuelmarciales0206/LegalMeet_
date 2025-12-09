
import React, { useState } from 'react';
import { MOCK_CLIENTS } from '../../services/mockData';
import { Search, Mail, Phone, Clock } from 'lucide-react';

const LawyerClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Mis Clientes</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 w-64"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-slate-50 border-b border-slate-200">
             <tr>
               <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</th>
               <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto</th>
               <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Casos</th>
               <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Última Interacción</th>
               <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {filtered.map(client => (
               <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                 <td className="p-4">
                   <div className="flex items-center gap-3">
                     <img src={client.avatarUrl} alt={client.name} className="w-10 h-10 rounded-full" />
                     <span className="font-bold text-slate-800 text-sm">{client.name}</span>
                   </div>
                 </td>
                 <td className="p-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2 mb-1"><Mail size={12}/> {client.email}</div>
                    <div className="flex items-center gap-2"><Phone size={12}/> {client.phone}</div>
                 </td>
                 <td className="p-4">
                    <span className="px-2 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-md">
                       {client.activeCases} Activos
                    </span>
                 </td>
                 <td className="p-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                       <Clock size={14} /> {client.lastContactDate}
                    </div>
                 </td>
                 <td className="p-4 text-right">
                    <button className="text-brand-800 font-bold text-xs hover:underline">Ver Historial</button>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default LawyerClients;
