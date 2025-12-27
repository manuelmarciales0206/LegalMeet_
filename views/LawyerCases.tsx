// views/LawyerCases.tsx
import React, { useState, useEffect } from 'react';

interface Case {
  id: string;
  clientName: string;
  clientPhone: string;
  category: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  nextAppointment?: string;
  notes?: string;
}

const LawyerCases: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Cargar casos de localStorage (simulado)
    const savedCases = localStorage.getItem('legalmeet_lawyer_cases');
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    } else {
      // Casos de ejemplo
      const exampleCases: Case[] = [
        {
          id: '1',
          clientName: 'María García',
          clientPhone: '3001234567',
          category: 'Laboral',
          description: 'Despido sin justa causa después de 5 años de trabajo. No le han pagado liquidación ni indemnización.',
          status: 'in_progress',
          createdAt: '2024-12-20',
          nextAppointment: '2024-12-28 10:00',
          notes: 'Cliente tiene contrato indefinido. Solicitar desprendibles de nómina.'
        },
        {
          id: '2',
          clientName: 'Carlos Rodríguez',
          clientPhone: '3109876543',
          category: 'Familiar',
          description: 'Proceso de divorcio con hijos menores. Necesita definir custodia y cuota alimentaria.',
          status: 'pending',
          createdAt: '2024-12-22',
        },
        {
          id: '3',
          clientName: 'Ana Martínez',
          clientPhone: '3205551234',
          category: 'Civil',
          description: 'Incumplimiento de contrato de arrendamiento. Arrendatario debe 6 meses.',
          status: 'resolved',
          createdAt: '2024-12-15',
          notes: 'Caso resuelto mediante conciliación. Cliente satisfecho.'
        },
      ];
      setCases(exampleCases);
      localStorage.setItem('legalmeet_lawyer_cases', JSON.stringify(exampleCases));
    }
  }, []);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    const labels = {
      pending: 'Pendiente',
      in_progress: 'En Proceso',
      resolved: 'Resuelto',
      closed: 'Cerrado',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Laboral': '💼',
      'Familiar': '👨‍👩‍👧',
      'Penal': '⚖️',
      'Civil': '📄',
      'Comercial': '🏢',
    };
    return icons[category] || '📋';
  };

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.status === filter);

  const updateCaseStatus = (caseId: string, newStatus: string) => {
    const updatedCases = cases.map(c => 
      c.id === caseId ? { ...c, status: newStatus as Case['status'] } : c
    );
    setCases(updatedCases);
    localStorage.setItem('legalmeet_lawyer_cases', JSON.stringify(updatedCases));
  };

  const saveNotes = (caseId: string) => {
    const updatedCases = cases.map(c => 
      c.id === caseId ? { ...c, notes } : c
    );
    setCases(updatedCases);
    localStorage.setItem('legalmeet_lawyer_cases', JSON.stringify(updatedCases));
    setShowModal(false);
    setSelectedCase(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Mis Casos</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Filtrar:</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="in_progress">En Proceso</option>
            <option value="resolved">Resueltos</option>
            <option value="closed">Cerrados</option>
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase">Total</p>
          <p className="text-2xl font-bold text-slate-800">{cases.length}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
          <p className="text-xs font-bold text-yellow-700 uppercase">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-800">{cases.filter(c => c.status === 'pending').length}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
          <p className="text-xs font-bold text-blue-700 uppercase">En Proceso</p>
          <p className="text-2xl font-bold text-blue-800">{cases.filter(c => c.status === 'in_progress').length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
          <p className="text-xs font-bold text-green-700 uppercase">Resueltos</p>
          <p className="text-2xl font-bold text-green-800">{cases.filter(c => c.status === 'resolved').length}</p>
        </div>
      </div>

      {/* Lista de casos */}
      <div className="space-y-4">
        {filteredCases.map((caso) => (
          <div key={caso.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {getCategoryIcon(caso.category)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-semibold text-slate-800 truncate">{caso.clientName}</h3>
                    {getStatusBadge(caso.status)}
                  </div>
                  <p className="text-sm text-cyan-600 font-bold mb-2 uppercase text-[10px] tracking-wider">{caso.category}</p>
                  <p className="text-sm text-slate-600 line-clamp-2">{caso.description}</p>
                  {caso.nextAppointment && (
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      📅 Próxima cita: <span className="font-bold text-slate-600">{caso.nextAppointment}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                <button
                  onClick={() => { setSelectedCase(caso); setNotes(caso.notes || ''); setShowModal(true); }}
                  className="flex-1 px-4 py-2 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-bold transition-colors"
                >
                  Ver detalles
                </button>
                <a
                  href={`https://wa.me/57${caso.clientPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 text-center font-bold transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Caso: {selectedCase.clientName}</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <span className="text-2xl">✕</span>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Categoría</p>
                  <p className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-xl">{getCategoryIcon(selectedCase.category)}</span>
                    {selectedCase.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Teléfono</p>
                  <p className="font-bold text-slate-800">{selectedCase.clientPhone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Descripción del caso</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedCase.description}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Estado del proceso</p>
                <select
                  value={selectedCase.status}
                  onChange={(e) => updateCaseStatus(selectedCase.id, e.target.value)}
                  className="mt-1 px-4 py-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Proceso</option>
                  <option value="resolved">Resuelto</option>
                  <option value="closed">Cerrado</option>
                </select>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Notas privadas del abogado</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Estrategia, documentos faltantes, acuerdos alcanzados..."
                  className="w-full h-40 px-4 py-3 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-sm leading-relaxed"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3.5 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => saveNotes(selectedCase.id)}
                  className="flex-[2] py-3.5 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 shadow-lg transition-all"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerCases;