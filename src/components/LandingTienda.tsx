import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Clock, Users, Star, Shield, Zap, MessageCircle, X, Loader2, Copy, Check, Building2 } from 'lucide-react';

const ORANGE = '#F59B20';
const WHATSAPP = '5804248804734';

export const LandingTienda: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [referencia, setReferencia] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const courseName = 'Crea tu Tienda Digital Gratis con Gemini y Google Sheets';
  const price = 20;
  const bank = 'Banesco';
  const phone = '04248804734';
  const cedula = '21175955';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(
      'Confirmación de pago - CONLOSRODRIGUEZ\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Hola, acabo de realizar el pago de mi curso.\n\n' +
      '• Curso: ' + courseName + '\n' +
      '• Monto: $' + price + ' USD\n' +
      '• Método: Pago Móvil\n' +
      '• Banco: ' + bank + '\n' +
      '• Teléfono: ' + phone + '\n' +
      '• Cédula: ' + cedula + '\n' +
      '• Referencia: ' + referencia + '\n\n' +
      'Mis datos:\n' +
      '• Nombre: ' + nombre + ' ' + apellido + '\n' +
      '• Email: ' + email + '\n\n' +
      'Quedo atento(a). ¡Gracias!'
    );
    window.open('https://wa.me/' + WHATSAPP + '?text=' + msg, '_blank');
  };

  const handleSubmit = () => {
    if (!nombre || !apellido || !email || !referencia) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sendWhatsApp();
    }, 1000);
  };

  const benefits = [
    'Tienda en línea funcionando sin pagar hosting',
    'Sin dominio, sin mensualidades, sin costos ocultos',
    'Usa Google Sheets como base de datos (gratis)',
    'Gemini te genera el código (sin programar)',
    'Actualizaciones instantáneas desde tu teléfono',
    'Diseño profesional y adaptable a móviles',
    'Acompañamiento paso a paso',
    'Acceso de por vida a las actualizaciones',
  ];

  const testimonials = [
    { name: 'María G.', text: 'En 2 horas tenía mi tienda funcionando. Increíble!', stars: 5 },
    { name: 'Carlos R.', text: 'Pensé que necesitaba un programador. Con Gemini lo hice yo mismo.', stars: 5 },
    { name: 'Ana M.', text: 'Mi negocio de ropa ahora tiene tienda online. Las ventas subieron 40%.', stars: 5 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Urgency Banner */}
      <div style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444)', color: 'white', textAlign: 'center', padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>
        🔥 OFERTA POR TIEMPO LIMITADO - Precio sube a $30 USD en 48 horas
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
            <Zap style={{ width: 14, height: 14, color: '#fbbf24' }} />
            <span>Más de 400 estudiantes ya aprendieron</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
            Crea tu Tienda Digital <span style={{ color: '#fbbf24' }}>GRATIS</span> con Gemini y Google Sheets
          </h1>
          
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Sin hosting, sin dominio, sin mensualidades. Tu tienda funcionando en menos de 2 horas.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#fbbf24' }}>$20</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>$30 USD</div>
              <div style={{ fontSize: 12, color: '#4ade80', fontWeight: 700 }}>Ahorras $10 USD</div>
            </div>
          </div>

          <button 
            onClick={() => setShowCheckout(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: ORANGE, padding: '16px 32px', fontSize: 16, fontWeight: 800, color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,155,32,0.4)' }}
          >
            QUIERO MI TIENDA AHORA <ArrowRight style={{ width: 18, height: 18 }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            <span className="flex items-center gap-1"><Shield style={{ width: 14, height: 14 }} /> Garantía 7 días</span>
            <span className="flex items-center gap-1"><Clock style={{ width: 14, height: 14 }} /> Acceso inmediato</span>
            <span className="flex items-center gap-1"><Users style={{ width: 14, height: 14 }} /> 400+ estudiantes</span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 32 }}>
            ¿Qué incluye el curso?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {benefits.map((benefit, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <CheckCircle style={{ width: 20, height: 20, color: '#10b981', flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '60px 20px', background: '#f1f5f9' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 32 }}>
            Lo que dice nuestra comunidad
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, padding: 20, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} style={{ width: 14, height: 14, color: '#fbbf24', fill: '#fbbf24' }} />)}
                </div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>"{t.text}"</p>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>¿Listo para empezar?</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>
            Únete a más de 400 personas que ya tienen su tienda funcionando.
          </p>
          <button 
            onClick={() => setShowCheckout(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: ORANGE, padding: '16px 32px', fontSize: 16, fontWeight: 800, color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,155,32,0.4)' }}
          >
            OBTENER ACCESO - $20 USD <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a 
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola! Tengo una duda sobre el curso de Tienda Digital.')}`}
        target="_blank" 
        rel="noreferrer"
        style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', zIndex: 100, color: 'white', textDecoration: 'none' }}
      >
        <MessageCircle style={{ width: 26, height: 26 }} />
      </a>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: 16 }} onClick={() => { setShowCheckout(false); setSubmitted(false); }}>
          <div style={{ width: '100%', maxWidth: 440, background: 'white', borderRadius: 20, padding: 28, boxShadow: '0 8px 40px rgba(0,0,0,0.2)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setShowCheckout(false); setSubmitted(false); }} style={{ position: 'absolute', top: 16, right: 16, padding: 6, background: '#f3f4f6', border: 'none', borderRadius: 8, color: '#6b7280', cursor: 'pointer' }}>
              <X style={{ width: 18, height: 18 }} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle style={{ width: 32, height: 32, color: '#10b981' }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>¡Pago registrado!</h3>
                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Se abrió WhatsApp con tu confirmación.</p>
                <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>En menos de 24 horas recibirás acceso a tu curso por correo.</p>
                <button onClick={() => { setShowCheckout(false); setSubmitted(false); }} style={{ borderRadius: 10, background: ORANGE, padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>Entendido</button>
              </div>
            ) : (
              <>
                {/* Summary */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6', marginBottom: 20 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed' }}>GOOGLE SHEETS & SCRIPT</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{courseName}</p>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>${price}</span>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16, textAlign: 'center' }}>Método de Pago</h3>

                {/* Payment method */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', borderRadius: 12, border: '2px solid #10b981', background: '#f0fdf4', marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 style={{ width: 20, height: 20, color: '#10b981' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Pago Móvil</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>Transferencia interbancaria</div>
                  </div>
                </div>

                {/* Bank details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {[
                    { label: 'Banco', value: bank, field: 'bank' },
                    { label: 'Teléfono', value: phone, field: 'phone' },
                    { label: 'Cédula', value: cedula, field: 'cedula' },
                  ].map((item) => (
                    <div key={item.field} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f9fafb', borderRadius: 8, border: '1px solid #f3f4f6' }}>
                      <div>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>{item.value}</div>
                      </div>
                      <button onClick={() => copyToClipboard(item.value, item.field)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: copied === item.field ? '#10b981' : '#9ca3af' }}>
                        {copied === item.field ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                      </button>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#059669', fontWeight: 600, textTransform: 'uppercase' }}>Monto</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#047857', fontFamily: 'monospace' }}>$20 USD / Bs. 15,750</div>
                    </div>
                    <button onClick={() => copyToClipboard('Banco: Banesco\nTeléfono: 04248804734\nCédula: 21175955\nMonto: Bs. 15750', 'all')} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: copied === 'all' ? '#10b981' : '#9ca3af' }}>
                      {copied === 'all' ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                    </button>
                  </div>
                </div>

                {/* Reference */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Referencia (4 dígitos) *</label>
                  <input type="text" placeholder="Ej: 4523" value={referencia} onChange={(e) => setReferencia(e.target.value.replace(/\D/g, '').slice(0, 4))} style={{ width: '100%', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '8px 12px', fontSize: 14, fontWeight: 700, fontFamily: 'monospace', letterSpacing: 3, textAlign: 'center', color: '#111827', outline: 'none' }} />
                </div>

                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ flex: 1, borderRadius: 8, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '8px 12px', fontSize: 13, color: '#111827', outline: 'none' }} />
                    <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} style={{ flex: 1, borderRadius: 8, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '8px 12px', fontSize: 13, color: '#111827', outline: 'none' }} />
                  </div>
                  <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '8px 12px', fontSize: 13, color: '#111827', outline: 'none' }} />
                  <p style={{ fontSize: 10, color: '#9ca3af' }}>Recibirás tu usuario y contraseña por correo</p>
                </div>

                <button onClick={handleSubmit} disabled={!nombre || !apellido || !email || !referencia || loading} style={{ width: '100%', borderRadius: 10, padding: '14px 16px', fontSize: 14, fontWeight: 700, background: nombre && apellido && email && referencia ? ORANGE : '#d1d5db', color: 'white', border: 'none', cursor: nombre && apellido && email && referencia ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {loading ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Procesando...</> : '✅ CONFIRMAR PAGO'}
                </button>
                <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 8 }}>Se abrirá WhatsApp con tu confirmación</p>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
