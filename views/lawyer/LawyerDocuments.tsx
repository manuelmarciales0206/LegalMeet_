
import React from 'react';
import { FileText, Download, Plus } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

const LawyerDocuments: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold text-slate-800">Documentos</h2>
         <button className="flex items-center gap-2 px-4 py-2 bg-brand-800 text-white rounded-lg text-sm font-bold hover:bg-brand-900 shadow-sm">
            <Plus size={16} /> Subir Documento
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
             <h3 className="font-bold text-slate-700 mb-4 uppercase text-xs tracking-wider">Plantillas Legales</h3>
             <div className="space-y-3">
                {['Contrato de Prestación de Servicios.docx', 'Poder General.pdf', 'Derecho de Petición Modelo.docx'].map((doc, i) => (
                   <div key={i} className="bg-white p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:border-brand-300 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText size={20} />
                         </div>
                         <span className="font-bold text-slate-700 text-sm">{doc}</span>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-brand-800" />
                   </div>
                ))}
             </div>
          </div>
          
          <div>
             <h3 className="font-bold text-slate-700 mb-4 uppercase text-xs tracking-wider">Recientes de Clientes</h3>
             <EmptyState 
                icon={FileText} 
                title="Sin documentos recientes" 
                description="Aquí aparecerán los archivos compartidos por tus clientes en las últimas 24 horas." 
             />
          </div>
       </div>
    </div>
  );
};

export default LawyerDocuments;
