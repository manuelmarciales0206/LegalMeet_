
import React from 'react';
import { MOCK_TRANSACTIONS } from '../../services/mockData';
import { Download, CreditCard, DollarSign } from 'lucide-react';

const LawyerEarnings: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
       <h2 className="text-2xl font-bold text-slate-800 mb-6">Mis Ingresos</h2>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase mb-2">Ingresos Este Mes</p>
             <h3 className="text-3xl font-bold text-slate-800">$2.450.000</h3>
             <p className="text-xs text-green-600 font-bold mt-2">+12% vs mes anterior</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase mb-2">Pendiente por Cobrar</p>
             <h3 className="text-3xl font-bold text-slate-800">$850.000</h3>
             <p className="text-xs text-slate-500 mt-2">3 facturas pendientes</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-brand-300">
             <div className="p-3 bg-brand-50 text-brand-800 rounded-full mb-2">
                <CreditCard size={24} />
             </div>
             <p className="text-sm font-bold text-slate-700">Configurar Pagos</p>
          </div>
       </div>

       <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
             <h3 className="font-bold text-slate-800">Historial de Transacciones</h3>
             <button className="flex items-center gap-1 text-xs font-bold text-brand-800 hover:underline">
                <Download size={14} /> Exportar
             </button>
          </div>
          <table className="w-full text-left">
             <thead className="border-b border-slate-100">
                <tr>
                   <th className="p-4 text-xs font-bold text-slate-500 uppercase">Fecha</th>
                   <th className="p-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                   <th className="p-4 text-xs font-bold text-slate-500 uppercase">Concepto</th>
                   <th className="p-4 text-xs font-bold text-slate-500 uppercase">Monto</th>
                   <th className="p-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {MOCK_TRANSACTIONS.map(t => (
                   <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-600">{t.date}</td>
                      <td className="p-4 text-sm font-bold text-slate-800">{t.clientName}</td>
                      <td className="p-4 text-sm text-slate-600">{t.caseTitle}</td>
                      <td className="p-4 text-sm font-bold text-slate-800">${t.amount.toLocaleString()}</td>
                      <td className="p-4">
                         <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {t.status}
                         </span>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

export default LawyerEarnings;
