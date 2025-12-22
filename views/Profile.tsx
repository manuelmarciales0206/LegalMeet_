import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  IdCard, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Bell, 
  MessageSquare, 
  Clock, 
  Camera, 
  Save, 
  Edit3,
  Lock,
  LogOut,
  ChevronRight,
  Upload,
  Smartphone,
  CheckCircle2,
  X
} from 'lucide-react';

interface ProfileData {
  photoUrl: string;
  fullName: string;
  email: string;
  phone: string;
  documentId: string;
  city: string;
  birthDate: string;
  address: string;
  alternativePhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  preferredSchedule: 'mañana' | 'tarde' | 'cualquiera';
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  twoFactorAuth: boolean;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    photoUrl: 'https://i.pravatar.cc/150?img=12',
    fullName: 'Giovanny Tocarruncho',
    email: 'giovanny.tocarruncho@gmail.com',
    phone: '+57 300 123 4567',
    documentId: '1.098.765.432',
    city: 'bogota',
    birthDate: '1990-05-15',
    address: 'Calle 100 #15-20',
    alternativePhone: '',
    emergencyContactName: 'Marta Tocarruncho',
    emergencyContactPhone: '+57 311 000 0000',
    preferredContact: 'whatsapp',
    preferredSchedule: 'cualquiera',
    emailNotifications: true,
    whatsappNotifications: true,
    twoFactorAuth: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('legalmeet_user_profile');
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('legalmeet_user_profile', JSON.stringify(profileData));
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fixed: Made icon optional in the type definition to resolve missing property error when only emoji is used.
  const SectionTitle = ({ icon: Icon, title, emoji }: { icon?: any, title: string, emoji?: string }) => (
    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
      {emoji ? <span className="text-xl">{emoji}</span> : (Icon && <Icon size={20} className="text-action-600" />)}
      {title}
    </h3>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-20">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={20} />
          <span className="font-bold">¡Perfil actualizado con éxito!</span>
        </div>
      )}

      {/* Password Modal (Mock) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Cambiar Contraseña</h3>
              <button onClick={() => setIsPasswordModalOpen(false)}><X className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contraseña Actual</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-action-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nueva Contraseña</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-action-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Confirmar Nueva Contraseña</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-action-600" />
              </div>
              <button onClick={() => setIsPasswordModalOpen(false)} className="w-full py-3 bg-action-600 text-white rounded-xl font-bold hover:bg-action-700 transition-colors shadow-lg">Actualizar Contraseña</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Mi Perfil</h1>
          <p className="text-slate-500 font-medium">Gestiona tu información personal, preferencias y seguridad.</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
            isEditing 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-action-600 text-white hover:bg-action-700'
          }`}
        >
          {isEditing ? <><Save size={20} /> Guardar cambios</> : <><Edit3 size={20} /> Editar perfil</>}
        </button>
      </div>

      <div className="space-y-6">
        
        {/* SECCIÓN 1: FOTO Y NOMBRE (Header de Perfil) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                {profileData.photoUrl ? (
                  <img src={profileData.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl text-slate-300">👤</span>
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-1 right-1 bg-action-600 text-white p-2.5 rounded-full shadow-xl hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  placeholder="Tu nombre completo"
                  className="text-2xl font-bold w-full border-b-2 border-slate-200 pb-1 focus:border-action-600 outline-none bg-transparent"
                />
              ) : (
                <h2 className="text-2xl font-black text-slate-800">{profileData.fullName || 'Sin nombre registrado'}</h2>
              )}
              <p className="text-slate-500 font-medium mt-1">Cliente desde Diciembre 2024</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <span className="px-3 py-1 bg-brand-50 text-action-700 text-xs font-bold rounded-full border border-brand-100">CLIENTE PLATINO</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">VERIFICADO</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: INFORMACIÓN PERSONAL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionTitle emoji="👤" title="Información Personal" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Correo Electrónico</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.email || 'No registrado'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Teléfono Principal</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.phone || 'No registrado'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Documento de Identidad (C.C.)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.documentId}
                  onChange={(e) => setProfileData({...profileData, documentId: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.documentId || 'No registrado'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Ciudad</label>
              {isEditing ? (
                <select
                  value={profileData.city}
                  onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                >
                  <option value="">Selecciona ciudad</option>
                  <option value="bogota">Bogotá, D.C.</option>
                  <option value="medellin">Medellín</option>
                  <option value="cali">Cali</option>
                  <option value="barranquilla">Barranquilla</option>
                  <option value="cartagena">Cartagena</option>
                  <option value="bucaramanga">Bucaramanga</option>
                  <option value="cucuta">Cúcuta</option>
                  <option value="otras">Otras</option>
                </select>
              ) : (
                <p className="font-bold text-slate-800 capitalize">{profileData.city || 'No registrada'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Fecha de Nacimiento</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.birthDate || 'No registrada'}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: INFORMACIÓN DE CONTACTO ADICIONAL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionTitle emoji="📞" title="Información de Contacto Adicional" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Dirección de Correspondencia</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  placeholder="Calle, Número, Barrio, Apto..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.address || 'Sin dirección registrada'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Teléfono Alternativo</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.alternativePhone}
                  onChange={(e) => setProfileData({...profileData, alternativePhone: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.alternativePhone || 'N/A'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Contacto de Emergencia (Nombre)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.emergencyContactName}
                  onChange={(e) => setProfileData({...profileData, emergencyContactName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.emergencyContactName || 'No asignado'}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Teléfono de Emergencia</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.emergencyContactPhone}
                  onChange={(e) => setProfileData({...profileData, emergencyContactPhone: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-action-600 outline-none"
                />
              ) : (
                <p className="font-bold text-slate-800">{profileData.emergencyContactPhone || 'No asignado'}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECCIÓN 4: PREFERENCIAS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionTitle emoji="⚙️" title="Preferencias de Usuario" />
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Método de Contacto Preferido</label>
                <div className="flex gap-2">
                  {(['whatsapp', 'call', 'email'] as const).map((method) => (
                    <button
                      key={method}
                      disabled={!isEditing}
                      onClick={() => setProfileData({...profileData, preferredContact: method})}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${
                        profileData.preferredContact === method 
                          ? 'bg-action-600 border-action-600 text-white shadow-md' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {method === 'call' ? 'Llamada' : method}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Horario Preferido para Citas</label>
                <div className="flex gap-2">
                  {(['mañana', 'tarde', 'cualquiera'] as const).map((sched) => (
                    <button
                      key={sched}
                      disabled={!isEditing}
                      onClick={() => setProfileData({...profileData, preferredSchedule: sched})}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${
                        profileData.preferredSchedule === sched 
                          ? 'bg-brand-800 border-brand-800 text-white shadow-md' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {sched}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <div>
                  <p className="font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquare size={16} className="text-green-500" /> Notificaciones por WhatsApp
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Recibe recordatorios de tus citas agendadas.</p>
                </div>
                <button
                  onClick={() => isEditing && setProfileData({...profileData, whatsappNotifications: !profileData.whatsappNotifications})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    profileData.whatsappNotifications ? 'bg-action-600' : 'bg-slate-300'
                  } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                    profileData.whatsappNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between group">
                <div>
                  <p className="font-bold text-slate-800 flex items-center gap-2">
                    <Mail size={16} className="text-blue-500" /> Notificaciones por Email
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Recibe confirmaciones de pago y facturas.</p>
                </div>
                <button
                  onClick={() => isEditing && setProfileData({...profileData, emailNotifications: !profileData.emailNotifications})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    profileData.emailNotifications ? 'bg-action-600' : 'bg-slate-300'
                  } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                    profileData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 5: SEGURIDAD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionTitle emoji="🔒" title="Seguridad de la Cuenta" />
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setIsPasswordModalOpen(true)}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-brand-100 group-hover:text-brand-800">
                  <Lock size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Cambiar contraseña</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Último cambio: Hace 3 meses</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-100 text-brand-800 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Verificación en dos pasos (2FA)</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Asegura tu cuenta con código móvil</p>
                </div>
              </div>
              <button
                onClick={() => isEditing && setProfileData({...profileData, twoFactorAuth: !profileData.twoFactorAuth})}
                className={`w-10 h-5 rounded-full transition-colors relative ${profileData.twoFactorAuth ? 'bg-action-600' : 'bg-slate-300'} ${!isEditing && 'opacity-60'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${profileData.twoFactorAuth ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Última sesión activa</p>
              <p className="text-xs text-slate-600 font-bold flex items-center justify-center gap-1">
                <Smartphone size={12} /> Hoy, 10:45 AM • Bogotá, CO (Chrome/Windows)
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN 6: DOCUMENTOS (Opcional) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionTitle emoji="📄" title="Mis Documentos de Identificación" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-action-600 transition-all cursor-pointer group">
              <Upload size={32} className="text-slate-300 mb-3 group-hover:text-action-600 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-800">Cédula de Ciudadanía (Frontal)</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Sube el PDF o JPG de tu documento</p>
            </div>
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-action-600 transition-all cursor-pointer group">
              <Upload size={32} className="text-slate-300 mb-3 group-hover:text-action-600 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-800">Otro documento de identidad</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Pasaporte, Licencia o RUT</p>
            </div>
          </div>
        </div>

        {/* BOTÓN CERRAR SESIÓN */}
        <div className="pt-8 flex justify-center">
          <button className="flex items-center gap-2 px-8 py-4 text-red-500 font-black uppercase tracking-widest text-xs hover:bg-red-50 rounded-2xl transition-colors">
            <LogOut size={18} /> Cerrar mi sesión en este dispositivo
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;