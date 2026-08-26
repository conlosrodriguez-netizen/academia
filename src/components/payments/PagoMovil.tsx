import React, { useState, useEffect } from 'react';
import { Copy, Check, ArrowLeft, Building2, Loader2 } from 'lucide-react';

const ORANGE = '#F59B20';
const WHATSAPP = '5804248804734';

interface PagoMovilProps {
  amountUSD: number;
  courseName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const PagoMovil: React.FC<PagoMovilProps> = ({ amountUSD, courseName, onSuccess, onBack }) => {
  const [bcvRate, setBcvRate] = useState<number>(0);
  const [rateLoading, setRateLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('https://dolar-bcv-api.vercel.app/api/dollar');
        const data = await res.json();
        if (data?.rate && data.rate > 100) {
          setBcvRate(data.rate);
        } else {
          setBcvRate(787.52);
        }
      } catch {
        setBcvRate(787.52);
      } finally {
        setRateLoading(false);
      }
    };
    fetchRate();
  }, []);

  const amountBs = (amountUSD * bcvRate).toFixed(2);
  const phone = '04248804734';
  const cedula = '21175955';
  const bank = 'Banesco';

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
      '💰 Monto: $' + amountUSD + ' USD (Bs. ' + amountBs + ')\n' +
      '🏦 Método: Pago Móvil\n' +
      '🏛️ Banco: ' + bank + '\n' +
      '📱 Teléfono: ' + phone + '\n' +
      '🪪 Cédula: ' + cedula
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
        <button onClick={onSuccess} style={{ borderRadius: 10, background: ORANGE, padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
          Entendido
        </button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = { width: '100%', borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 13, color: '#111827', outline: 'none' };
  const InfoRow = ({ label, value, field }: { label: string; value: string; field: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f9fafb', borderRadius: 10, border: '1px solid #f3f4f6' }}>
      <div>
        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>{value}</div>
      </div>
      <button onClick={() => copyToClipboard(value, field)} style={{ padding: 6, background: 'none', border: 'none', cursor: 'pointer', color: copied === field ? '#10b981' : '#9ca3af' }}>
        {copied === field ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <ArrowLeft style={{ width: 14, height: 14 }} /> Volver
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Building2 style={{ width: 20, height: 20, color: '#10b981' }} />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Pago Móvil</h3>
          <p style={{ fontSize: 11, color: '#9ca3af' }}>Transferencia interbancaria</p>
        </div>
      </div>

      {/* Amount */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid #bbf7d0', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#059669', fontWeight: 600, marginBottom: 4 }}>Monto a pagar</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#047857' }}>${amountUSD} USD</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#059669', marginTop: 4 }}>
          {rateLoading ? 'Cargando tasa BCV...' : `Bs. ${amountBs}`}
        </div>
        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>
          {rateLoading ? <Loader2 style={{ width: 12, height: 12, display: 'inline', animation: 'spin 1s linear infinite' }} /> : `BCV: ${bcvRate.toFixed(2)} Bs/USD`}
        </div>
      </div>

      {/* Bank details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <InfoRow label="Banco" value={bank} field="bank" />
        <InfoRow label="Teléfono" value={phone} field="phone" />
        <InfoRow label="Cédula/RIF" value={cedula} field="cedula" />
        <InfoRow label="Monto en Bs." value={`Bs. ${amountBs}`} field="amount" />
      </div>

      {/* User data form */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Tus datos para crear tu cuenta:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Nombre *</label>
              <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Apellido *</label>
              <input type="text" placeholder="Tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Correo electrónico *</label>
            <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>Aquí recibirás tu usuario y contraseña</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!nombre || !apellido || !email || loading}
        style={{
          width: '100%',
          borderRadius: 10,
          padding: '14px 16px',
          fontSize: 13,
          fontWeight: 700,
          background: nombre && apellido && email ? ORANGE : '#d1d5db',
          color: 'white',
          border: 'none',
          cursor: nombre && apellido && email ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {loading ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Enviando...</> : '✅ Confirmar Pago por WhatsApp'}
      </button>
      <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>Se abrirá WhatsApp con todos tus datos</p>
    </div>
  );
};
