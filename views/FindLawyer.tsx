
import React, { useState } from 'react';
import { Case, CaseCategory, LawyerProfile } from '../types';
import { MOCK_LAWYERS } from '../services/mockData';
import { Filter, Star, MessageCircle, Video, User, CalendarCheck, SearchX } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import PaymentModal from '../components/PaymentModal';

interface FindLawyerProps {
  relatedCase?: Case;
  onSchedule?: (lawyerId: string, lawyerName: string) => void;
}

const FindLawyer: React.FC<FindLawyerProps> = ({ relatedCase, onSchedule }) => {
  const [filterCategory, setFilterCategory] = useState<string>(relatedCase?.category || 'all');
  const [selectedLawyerForPayment, setSelectedLawyerForPayment] = useState<LawyerProfile | null>(null);

  // Filter logic
  const filteredLawyers = MOCK_LAWYERS.filter(l => {
    if (filterCategory === 'all') return true;
    return l.specialty === filterCategory || l.secondarySpecialties.includes(filterCategory as CaseCategory);
  });

  const handleScheduleClick = (lawyer: LawyerProfile) => {
    setSelectedLawyerForPayment(lawyer);
  };

  const handlePaymentSuccess = () => {
    if (selectedLawyerForPayment && onSchedule) {
       onSchedule(selectedLawyerForPayment.id, selectedLawyerForPayment.name);
    }
    setSelectedLawyerForPayment(null);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      
      {selectedLawyerForPayment && (
        <PaymentModal 
          lawyer={selectedLawyerForPayment} 
          onClose={() => setSelectedLawyerForPayment(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Context Banner if coming from Case Intake */}
      {relatedCase && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-start gap-4 shadow-sm">
          <div className="p-3 bg-white rounded-full border border-brand-100 shadow-sm">
             <CalendarCheck className="text-brand-600" size={24} />
          </div>
          <div>
            <h3 className="text-brand-900 font-bold text-lg">Hemos analizado tu caso: "{relatedCase.title}"</h3>
            <p className="text-brand-700 text-sm mt-1 leading-relaxed">
              Basándonos en que es un tema <span className="font-bold px-2 py-0.5 bg-white/50 rounded-md">{relatedCase.category}</span>, estos son los abogados más recomendados para ti.
              Al agendar, la cita quedará vinculada automáticamente a este caso para que el abogado tenga todo el contexto.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800">
          {relatedCase ? 'Expertos Sugeridos' : 'Directorio de Abogados'}
        </h2>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button 
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterCategory === 'all' ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Todos
          </button>
          {['Penal', 'Familiar', 'Laboral', 'Comercial', 'Civil'].map(cat => (
             <button 
             key={cat}
             onClick={() => setFilterCategory(cat)}
             className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterCategory === cat ? 'bg-brand-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
           >
             {cat}
           </button>
          ))}
          <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-brand-800 px-2 ml-2 border-l border-slate-200 pl-4">
            <Filter size={14} /> Más filtros
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {filteredLawyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                  <div className="relative">
                    <img src={lawyer.avatarUrl} alt={lawyer.name} className="w-14 h-14 rounded-full object-cover border border-slate-100" />
                    {/* Simplified availability check */}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" title="Disponible ahora"></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-brand-800 transition-colors">{lawyer.name}</h4>
                    <p className="text-xs text-brand-600 font-bold mt-0.5">{lawyer.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="text-xs font-bold text-slate-700">{lawyer.rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-400">({lawyer.reviewCount} reseñas)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {lawyer.tags.slice(0, 3).map(badge => (
                  <span key={badge} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] uppercase font-bold tracking-wide rounded border border-slate-100">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-6 py-3 border-t border-b border-slate-50 mt-auto">
                <div className="flex items-center gap-3">
                  {lawyer.availability.video && <div className="flex items-center gap-1"><Video size={14} className="text-slate-400"/> Video</div>}
                  {lawyer.availability.chat && <div className="flex items-center gap-1"><MessageCircle size={14} className="text-slate-400"/> Chat</div>}
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  ${lawyer.priceInitialConsultation.toLocaleString('es-CO')} <span className="text-slate-400 font-normal text-xs">/ consulta</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-50 hover:text-brand-900 transition-colors">
                  <User size={14} /> Ver Perfil
                </button>
                <button 
                  onClick={() => handleScheduleClick(lawyer)}
                  className="flex items-center justify-center gap-2 bg-brand-800 text-white py-2.5 rounded-lg text-xs font-bold hover:bg-brand-900 transition-colors shadow-sm"
                >
                  <CalendarCheck size={14} /> Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={SearchX}
          title="No encontramos coincidencias"
          description={`No hay abogados disponibles en la categoría "${filterCategory}" en este momento. Intenta con "Todos".`}
          actionLabel="Ver todos los abogados"
          onAction={() => setFilterCategory('all')}
        />
      )}
    </div>
  );
};

export default FindLawyer;
