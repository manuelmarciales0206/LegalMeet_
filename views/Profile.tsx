
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
  Upload
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

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
      <Icon size={20} className="text-action-600" />
      {title}
    </h3>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-20">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <ShieldCheck size={20} />
          <span className="font-bold">¡Perfil actualizado con éxito!</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Mi Perfil</h1>
          <p className="text-slate-500 font-medium">Gestiona tu información personal y preferencias de seguridad.</p>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Photo & Identity */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
                {profileData.photoUrl ? (
                  <img src={profileData.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-300" />
                )}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 bg-brand-800 text-white p-2.5 rounded-2xl shadow-xl hover:bg-brand-900 transition-transform hover:scale-110">
                  <Camera size={18} />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="text-xl font-black text-center w-full bg-slate-50 border-none rounded-xl p-2 focus:ring-2 focus:ring-action-600 outline-none"
                placeholder="Tu nombre completo"
              />
            ) : (
              <h2 className="text-xl font-black text-slate-900">{profileData.fullName || 'Usuario LegalMeet'}</h2>
            )}
            <p className="text-action-600 font-bold text-sm uppercase tracking-wider mt-1">Cliente Platino</p>
            
            <div className="mt-6 w-full pt-6 border-t border-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                <span>Casos Activos</span>
                <span className="text-slate-900">2</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                <span>Citas completadas</span>
                <span className="text-slate-900">14</span>
              </div>
            </div>
          </div>

          {/* Security Summary */}
          <div className="bg-brand-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Lock size={18} /> Seguridad
            </h4>
            <div className="space-y-4 relative z-10">
              <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold">
                <span>Cambiar contraseña</span>
                <ChevronRight size={16} />
              </button>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/10 text-sm font-bold">
                <span>Verificación 2 pasos</span>
                <button
                  onClick={() => setProfileData({...profileData, twoFactorAuth: !profileData.twoFactorAuth})}
                  className={`w-10 h-5 rounded-full transition-colors relative ${profileData.twoFactorAuth ? 'bg-action-600' : 'bg-slate-500'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${profileData.twoFactorAuth ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              <p className="text-[10px] text-brand-200 font-medium text-center pt-2">
                Último acceso: Hoy, 10:45 AM desde Bogotá
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Info Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <SectionTitle icon={IdCard} title="Información Personal" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Mail size={12} /> Correo Electrónico
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Phone size={12} /> Teléfono Móvil
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                  <IdCard size={12} /> Documento (C.C.)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.documentId}
                    onChange={(e) => setProfileData({...profileData, documentId: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.documentId}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                  <MapPin size={12} /> Ciudad de Residencia
                </label>
                {isEditing ? (
                  <select
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none appearance-none"
                  >
                    <option value="bogota">Bogotá, D.C.</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                    <option value="barranquilla">Barranquilla</option>
                    <option value="cartagena">Cartagena</option>
                    <option value="bucaramanga">Bucaramanga</option>
                    <option value="cucuta">Cúcuta</option>
                  </select>
                ) : (
                  <p className="font-bold text-slate-800 capitalize">{profileData.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Calendar size={12} /> Fecha de Nacimiento
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.birthDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                  <MapPin size={12} /> Dirección
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.address || 'No registrada'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences & Notifications */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <SectionTitle icon={Bell} title="Preferencias y Notificaciones" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Alertas por WhatsApp</p>
                    <p className="text-xs text-slate-500 font-medium">Recordatorios de citas y estados de casos</p>
                  </div>
                </div>
                <button
                  onClick={() => setProfileData({...profileData, whatsappNotifications: !profileData.whatsappNotifications})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${profileData.whatsappNotifications ? 'bg-action-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${profileData.whatsappNotifications ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Alertas por Email</p>
                    <p className="text-xs text-slate-500 font-medium">Facturación y actualizaciones mensuales</p>
                  </div>
                </div>
                <button
                  onClick={() => setProfileData({...profileData, emailNotifications: !profileData.emailNotifications})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${profileData.emailNotifications ? 'bg-action-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${profileData.emailNotifications ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Contacto preferido</label>
                  <div className="flex gap-2">
                    {['whatsapp', 'call', 'email'].map((method) => (
                      <button
                        key={method}
                        disabled={!isEditing}
                        onClick={() => setProfileData({...profileData, preferredContact: method as any})}
                        className={`flex-1 p-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${
                          profileData.preferredContact === method 
                            ? 'bg-action-600 border-action-600 text-white shadow-md' 
                            : 'bg-white border-slate-100 text-slate-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Horario preferido</label>
                  <div className="flex gap-2">
                    {['mañana', 'tarde', 'cualquiera'].map((sched) => (
                      <button
                        key={sched}
                        disabled={!isEditing}
                        onClick={() => setProfileData({...profileData, preferredSchedule: sched as any})}
                        className={`flex-1 p-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${
                          profileData.preferredSchedule === sched 
                            ? 'bg-brand-800 border-brand-800 text-white shadow-md' 
                            : 'bg-white border-slate-100 text-slate-400'
                        }`}
                      >
                        {sched}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <SectionTitle icon={Upload} title="Documentos de Identidad" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-2 group-hover:text-action-600 group-hover:bg-brand-50 transition-colors">
                  <Upload size={20} />
                </div>
                <p className="text-xs font-bold text-slate-800">Cédula Frontal</p>
                <p className="text-[10px] text-slate-400 font-medium">PDF o JPG (Máx 5MB)</p>
              </div>
              <div className="p-4 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-2 group-hover:text-action-600 group-hover:bg-brand-50 transition-colors">
                  <Upload size={20} />
                </div>
                <p className="text-xs font-bold text-slate-800">Cédula Posterior</p>
                <p className="text-[10px] text-slate-400 font-medium">PDF o JPG (Máx 5MB)</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <SectionTitle icon={Clock} title="Contacto de Emergencia" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre de Contacto</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.emergencyContactName}
                    onChange={(e) => setProfileData({...profileData, emergencyContactName: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.emergencyContactName || 'No asignado'}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Teléfono de Emergencia</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContactPhone}
                    onChange={(e) => setProfileData({...profileData, emergencyContactPhone: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-action-600 outline-none"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{profileData.emergencyContactPhone || 'No asignado'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
             <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors">
               <LogOut size={20} /> Cerrar Sesión
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
