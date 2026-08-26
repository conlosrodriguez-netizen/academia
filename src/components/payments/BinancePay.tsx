import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, Loader2 } from 'lucide-react';

const WHATSAPP = '5804248804734';

interface BinancePayProps {
  amountUSD: number;
  courseName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const BinancePay: React.FC<BinancePayProps> = ({ amountUSD, courseName, onSuccess, onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const walletEmail = 'solcar1992@gmail.com';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(
      '✅ Hola, ya pagué!\n\n' +
      '👤 Nombre: ' + nombre + ' ' + apellido + '\n' +
      '📧 Email: ' + email + '\n' +
      '📚 Curso: ' + courseName + '\n' +
      '💰 Monto: $' + amountUSD + ' USD (' + amountUSD + ' USDT)\n' +
      '🪙 Método: Binance Pay\n' +
      '📩 Enviado a: ' + walletEmail
    );
    window.open('https://wa.me/' + WHATSAPP + '?text=' + msg, '_blank');
  };

  const handleSubmit = () => {
    if (!nombre || !apellido || !email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sendWhatsApp();
    }, 1000);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check style={{ width: 32, height: 32, color: '#10b981' }} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>¡Listo!</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Se abrió WhatsApp con tu confirmación.</p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Te confirmamos el acceso en menos de 24h.</p>
        <button onClick={onSuccess} style={{ borderRadius: 10, background: '#f59e0b', padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>Entendido</button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = { width: '100%', borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 13, color: '#111827', outline: 'none' };

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <ArrowLeft style={{ width: 14, height: 14 }} /> Volver
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 20 }}>🪙</span>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Binance Pay</h3>
          <p style={{ fontSize: 11, color: '#9ca3af' }}>Pago con USDT</p>
        </div>
      </div>

      {/* Amount */}
      <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid #fde68a', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, marginBottom: 4 }}>Monto a pagar</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#92400e' }}>${amountUSD} USD</div>
        <div style={{ fontSize: 12, color: '#b45309', marginTop: 4 }}>≈ {amountUSD} USDT</div>
      </div>

      {/* Wallet */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Enviar a:</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 13, color: '#111827', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 8 }}>
            📧 {walletEmail}
          </div>
          <button onClick={() => copyToClipboard(walletEmail, 'email')} style={{ padding: 10, borderRadius: 10, border: '1px solid #e5e7eb', background: copied === 'email' ? '#ecfdf5' : 'white', cursor: 'pointer', color: copied === 'email' ? '#10b981' : '#6b7280', flexShrink: 0 }}>
            {copied === 'email' ? <Check style={{ width: 18, height: 18 }} /> : <Copy style={{ width: 18, height: 18 }} />}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid #f3f4f6' }}>
        <ol style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8, paddingLeft: 16 }}>
          <li>Abre <strong>Binance</strong> → <strong>Binance Pay</strong></li>
          <li>Busca: <strong>{walletEmail}</strong></li>
          <li>Envía <strong>${amountUSD} USDT</strong></li>
        </ol>
      </div>

      {/* User data form */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Tus datos para crear tu cuenta:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Nombre *</label>
              <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Apellido *</label>
              <input type="text" placeholder="Tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Correo electrónico *</label>
            <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>Aquí recibirás tu usuario y contraseña</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!nombre || !apellido || !email || loading}
        style={{ width: '100%', borderRadius: 10, padding: '14px 16px', fontSize: 13, fontWeight: 700, background: nombre && apellido && email ? '#f59e0b' : '#d1d5db', color: 'white', border: 'none', cursor: nombre && apellido && email ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
      >
        {loading ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Enviando...</> : '✅ Confirmar Pago por WhatsApp'}
      </button>
      <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>Se abrirá WhatsApp con todos tus datos</p>
    </div>
  );
};
