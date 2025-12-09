
import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { LawyerProfile } from '../types';

interface PaymentModalProps {
  lawyer: LawyerProfile | { name: string; priceInitialConsultation: number; specialty: string };
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ lawyer, onClose, onSuccess }) => {
  const [step, setStep] = useState<'method' | 'processing' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handlePay = () => {
    if (!selectedMethod) return;
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Lock size={16} className="text-brand-800" /> Pago Seguro
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 'method' && (
            <>
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Concepto</p>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-slate-800 text-lg">Consulta Inicial</h4>
                  <span className="font-bold text-brand-800 text-xl">${lawyer.priceInitialConsultation.toLocaleString('es-CO')}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Con: {lawyer.name}</p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-xs font-bold text-slate-700 uppercase">Selecciona medio de pago</p>
                
                <button 
                  onClick={() => setSelectedMethod('pse')}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all ${selectedMethod === 'pse' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/PSE_logo_2022.svg" alt="PSE" className="h-8 mr-3" />
                  <span className="font-medium text-slate-700">PSE (Débito bancario)</span>
                </button>

                <button 
                  onClick={() => setSelectedMethod('card')}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all ${selectedMethod === 'card' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`}
                >
                  <CreditCard className="h-6 w-6 mr-3 text-slate-600" />
                  <div className="text-left">
                     <span className="block font-medium text-slate-700">Tarjeta de Crédito</span>
                     <span className="text-xs text-slate-400">Visa, Mastercard, Amex</span>
                  </div>
                </button>

                <button 
                  onClick={() => setSelectedMethod('nequi')}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all ${selectedMethod === 'nequi' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`}
                >
                   <div className="h-8 w-8 bg-purple-900 text-white flex items-center justify-center rounded-full mr-3 font-bold text-xs">N</div>
                   <span className="font-medium text-slate-700">Nequi / Daviplata</span>
                </button>
              </div>

              <button
                disabled={!selectedMethod}
                onClick={handlePay}
                className="w-full py-3.5 bg-brand-800 text-white font-bold rounded-xl hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Pagar ${lawyer.priceInitialConsultation.toLocaleString('es-CO')}
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600 font-medium">Procesando pago seguro...</p>
              <p className="text-xs text-slate-400 mt-2">No cierres esta ventana</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">¡Pago Exitoso!</h3>
              <p className="text-slate-600 text-center mb-6">Tu cita ha sido confirmada y agregada a tu agenda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
