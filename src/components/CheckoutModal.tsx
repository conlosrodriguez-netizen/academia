import React, { useState } from 'react';
import type { Course } from '../data';
import { X, CreditCard, CheckCircle2, Loader2, Shield, Mail, Key } from 'lucide-react';

const ORANGE = '#F59B20';

interface CheckoutModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  onSuccess: (courseId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, course, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !course) return null;

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => { const c = v.replace(/\D/g, '').slice(0, 4); return c.length >= 3 ? c.slice(0, 2) + '/' + c.slice(2) : c; };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onSuccess(course.id);
    }, 2500);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setSuccess(false);
      setEmail('');
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', borderRadius: 12, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '12px 14px', fontSize: 13, color: '#111827', outline: 'none' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: 16 }} onClick={handleClose}>
      <div style={{ width: '100%', maxWidth: 440, background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.15)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} disabled={loading} style={{ position: 'absolute', top: 16, right: 16, padding: 6, background: '#f3f4f6', border: 'none', borderRadius: 8, color: '#6b7280', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
          <X style={{ width: 18, height: 18 }} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 style={{ width: 40, height: 40, color: '#10b981' }} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>¡Inscripción Exitosa!</h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24, lineHeight: 1.6 }}>
              Tu cuenta ha sido creada. Hemos enviado tus credenciales de acceso a:
            </p>
            <div style={{ background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb', padding: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Mail style={{ width: 18, height: 18, color: ORANGE }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{email || 'tu@email.com'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Key style={{ width: 18, height: 18, color: '#7c3aed' }} />
                <span style={{ fontSize: 13, color: '#6b7280' }}>Revisa tu bandeja de entrada y spam</span>
              </div>
            </div>
            <div style={{ background: '#fffbeb', borderRadius: 12, border: '1px solid #fef3c7', padding: 14, marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
                <strong>Importante:</strong> En tu correo encontrarás tu <strong>usuario</strong> y <strong>contraseña</strong> para acceder a la plataforma y comenzar el curso.
              </p>
            </div>
            <button onClick={handleClose} style={{ width: '100%', borderRadius: 12, background: ORANGE, padding: '14px 16px', fontSize: 14, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
              Entendido
            </button>
          </div>
        ) : (
          <>
            {/* Course summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6', marginBottom: 24 }}>
              <img src={course.image} alt="" style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed' }}>{course.category}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</p>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>${course.price}</span>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Datos de Inscripción</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>Correo electrónico *</label>
                <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
                <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Aquí recibirás tu usuario y contraseña</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>Nombre en la tarjeta *</label>
                <input type="text" placeholder="Juan Pérez" value={cardName} onChange={(e) => setCardName(e.target.value)} required style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>Número de tarjeta *</label>
                <div style={{ position: 'relative' }}>
                  <CreditCard style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
                  <input type="text" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} required style={{ ...inputStyle, paddingLeft: 40, letterSpacing: 2 }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>Vencimiento *</label>
                  <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>CVC *</label>
                  <input type="text" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} required style={inputStyle} />
                </div>
              </div>

              <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, background: ORANGE, padding: '14px 16px', fontSize: 14, fontWeight: 700, color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(245,155,32,0.3)', opacity: loading ? 0.7 : 1, cursor: 'pointer', marginTop: 4 }}>
                {loading ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Procesando pago...</> : <><CreditCard style={{ width: 18, height: 18 }} /> Pagar ${course.price} USD</>}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: '#9ca3af' }}>
                <Shield style={{ width: 14, height: 14 }} /> Pago seguro con cifrado SSL
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
