
import React, { useState, useEffect } from 'react';
import { CaseCategory, Appointment, LawyerProfile } from '../types';
import { MOCK_LAWYERS } from '../services/mockData';
import { CheckCircle2, ChevronRight, ChevronLeft, CreditCard, Lock, Calendar, Clock, Star, Video, MessageCircle } from 'lucide-react';

interface DashboardProps {
  onAppointmentCreated: (apt: Appointment) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAppointmentCreated }) => {
  const [step, setStep] = useState(1);
  const [caseData, setCaseData] = useState({ description: '', category: '' as CaseCategory });
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // STEP 1: Intake
  const categories: {id: CaseCategory, name: string, icon: string}[] = [
    { id: 'Laboral', name: 'Laboral', icon: '💼' },
    { id: 'Familiar', name: 'Familiar', icon: '👨‍👩‍👧' },
    { id: 'Penal', name: 'Penal', icon: '⚖️' },
    { id: 'Civil', name: 'Civil', icon: '📄' },
    { id: 'Comercial', name: 'Comercial', icon: '🏢' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('legalmeet_whatsapp_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.descripcion) setCaseData(prev => ({ ...prev, description: data.descripcion }));
      if (data.tipo) setCaseData(prev => ({ ...prev, category: data.tipo as CaseCategory }));
    }
  }, []);

  const handlePayment = async () => {
    if (!selectedLawyer || !selectedDate || !selectedTime) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const appointment: Appointment = {
      id: 'apt_' + Date.now(),
      lawyerId: selectedLawyer.id,
      lawyerName: selectedLawyer.name,
      lawyerPhoto: selectedLawyer.avatarUrl,
      lawyerSpecialty: selectedLawyer.specialty,
      caseDescription: caseData.description,
      caseCategory: caseData.category,
      date: selectedDate.toISOString(),
      time: selectedTime,
      status: 'upcoming',
      price: selectedLawyer.priceInitialConsultation,
      createdAt: new Date().toISOString()
    };
    
    localStorage.removeItem('legalmeet_whatsapp_data');
    setIsProcessing(false);
    onAppointmentCreated(appointment);
  };

  const getAvailableDates = () => {
    const dates = [];
    let date = new Date();
    while (dates.length < 7) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0) dates.push(new Date(date));
    }
    return dates;
  };

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Progress bar */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700">Paso {step} de 3</span>
            <span className="text-sm font-medium text-slate-500">
              {step === 1 && 'Describe tu caso'}
              {step === 2 && 'Elige abogado y horario'}
              {step === 3 && 'Confirma y paga'}
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-action-600 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 w-full space-y-6 animate-fade-in">
        
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">¿En qué podemos ayudarte?</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCaseData({...caseData, category: cat.id})}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      caseData.category === cat.id ? 'border-action-600 bg-brand-50' : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-bold text-xs">{cat.name}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cuéntanos tu situación</label>
                <textarea
                  value={caseData.description}
                  onChange={(e) => setCaseData({...caseData, description: e.target.value})}
                  placeholder="Describe brevemente qué te está pasando..."
                  className="w-full h-40 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 focus:border-transparent resize-none text-slate-700"
                />
                <p className="text-xs text-slate-400 mt-2">{caseData.description.length} caracteres (mínimo 20 recomendado)</p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={caseData.description.length < 10 || !caseData.category}
              className="w-full py-4 bg-action-600 text-white rounded-xl font-bold text-lg hover:bg-action-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Buscar abogados disponibles <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Abogados en {caseData.category}</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {MOCK_LAWYERS.filter(l => l.specialty === caseData.category).map(lawyer => (
                  <button
                    key={lawyer.id}
                    onClick={() => setSelectedLawyer(lawyer)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      selectedLawyer?.id === lawyer.id ? 'border-action-600 bg-brand-50' : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <img src={lawyer.avatarUrl} alt={lawyer.name} className="w-14 h-14 rounded-full border border-slate-100 object-cover" />
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900">{lawyer.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-xs font-bold text-slate-700">{lawyer.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({lawyer.reviewCount} reseñas)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-action-600 text-sm">${lawyer.priceInitialConsultation.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400">por cita</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedLawyer && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Elige fecha y hora</h2>
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar">
                  {getAvailableDates().map((date) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex-shrink-0 p-4 rounded-xl text-center min-w-[80px] transition-all border-2 ${
                          isSelected ? 'bg-action-600 border-action-600 text-white shadow-md' : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase mb-1">{date.toLocaleDateString('es-CO', { weekday: 'short' })}</p>
                        <p className="text-xl font-bold">{date.getDate()}</p>
                        <p className="text-[10px] opacity-70">{date.toLocaleDateString('es-CO', { month: 'short' })}</p>
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 ${
                          selectedTime === time ? 'bg-action-600 border-action-600 text-white shadow-sm' : 'bg-slate-50 border-transparent hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"><ChevronLeft size={20}/> Volver</button>
              <button onClick={() => setStep(3)} disabled={!selectedLawyer || !selectedDate || !selectedTime} className="flex-[2] py-4 bg-action-600 text-white rounded-xl font-bold text-lg hover:bg-action-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2">Continuar al pago <ChevronRight size={20}/></button>
            </div>
          </div>
        )}

        {step === 3 && selectedLawyer && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-action-600" /> Resumen de tu cita
              </h2>
              
              <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-2xl border border-brand-100 mb-6">
                <img src={selectedLawyer.avatarUrl} alt={selectedLawyer.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h3 className="font-bold text-slate-900">{selectedLawyer.name}</h3>
                  <p className="text-xs text-action-600 font-bold uppercase">{selectedLawyer.specialty}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm px-2">
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-slate-500 font-medium">Fecha y Hora</span>
                  <span className="font-bold text-slate-800">
                    {selectedDate?.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })} • {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-slate-500 font-medium">Tipo de Caso</span>
                  <span className="font-bold text-slate-800">{caseData.category}</span>
                </div>
                <div className="flex justify-between text-lg pt-2">
                  <span className="font-bold text-slate-800">Total a pagar</span>
                  <span className="font-black text-action-600">${selectedLawyer.priceInitialConsultation.toLocaleString()} COP</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lock size={18} className="text-brand-800" /> Elige método de pago
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'pse', name: 'PSE', icon: '🏦' },
                  { id: 'card', name: 'Tarjeta', icon: '💳' },
                  { id: 'nequi', name: 'Nequi', icon: '📱' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === m.id ? 'border-action-600 bg-brand-50' : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="font-bold text-xs">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">← Volver</button>
              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className={`flex-[2] py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                  paymentMethod && !isProcessing ? 'bg-action-600 hover:bg-action-700' : 'bg-slate-200 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>Procesando...</>
                ) : (
                  <>Confirmar y Pagar <CreditCard size={20}/></>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
