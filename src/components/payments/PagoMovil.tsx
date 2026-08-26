import React, { useState, useEffect } from 'react';
import { Copy, Check, ArrowLeft, Building2, Camera, Loader2 } from 'lucide-react';

const ORANGE = '#F59B20';
const BsToUsd = 36.5;

interface PagoMovilProps {
  amountUSD: number;
  courseName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const PagoMovil: React.FC<PagoMovilProps> = ({ amountUSD, onSuccess, onBack }) => {
  const [bcvRate, setBcvRate] = useState<number>(BsToUsd);
  const [copied, setCopied] = useState<string | null>(null);
  const [reference, setReference] = useState('');
  const [capturePreview, setCapturePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://pydolarve.org/api/v1/dollar')
      .then(res => res.json())
      .then(data => {
        if (data?.rates?.promedio?.price) {
          setBcvRate(data.rates.promedio.price);
        }
      })
      .catch(() => {});
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

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCapturePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!reference || reference.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check style={{ width: 32, height: 32, color: '#10b981' }} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Pago Recibido</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Tu pago está siendo verificado.</p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Recibirás acceso en menos de 24 horas.</p>
        <button onClick={onSuccess} style={{ borderRadius: 10, background: ORANGE, padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
          Entendido
        </button>
      </div>
    );
  }

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

      {/* Header */}
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
        <div style={{ fontSize: 14, fontWeight: 700, color: '#059669', marginTop: 4 }}>Bs. {amountBs}</div>
        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>BCV: {bcvRate.toFixed(2)} Bs/USD</div>
      </div>

      {/* Bank details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <InfoRow label="Banco" value={bank} field="bank" />
        <InfoRow label="Teléfono" value={phone} field="phone" />
        <InfoRow label="Cédula/RIF" value={cedula} field="cedula" />
        <InfoRow label="Monto en Bs." value={`Bs. ${amountBs}`} field="amount" />
      </div>

      {/* Reference */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Referencia de pago *</label>
        <input
          type="text"
          placeholder="Últimos 6 dígitos de la referencia"
          value={reference}
          onChange={(e) => setReference(e.target.value.replace(/\D/g, '').slice(0, 6))}
          style={{ width: '100%', borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 13, color: '#111827', outline: 'none', fontFamily: 'monospace', letterSpacing: 2 }}
        />
      </div>

      {/* Capture upload */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Captura de pantalla (opcional)</label>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '20px', borderRadius: 10, border: '2px dashed #d1d5db', background: '#f9fafb', cursor: 'pointer', transition: 'border-color 0.2s' }}>
          {capturePreview ? (
            <img src={capturePreview} alt="Capture" style={{ width: '100%', maxHeight: 150, objectFit: 'contain', borderRadius: 8 }} />
          ) : (
            <>
              <Camera style={{ width: 20, height: 20, color: '#9ca3af' }} />
              <span style={{ fontSize: 12, color: '#6b7280' }}>Subir captura del pago</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleCapture} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={reference.length < 6 || loading}
        style={{
          width: '100%',
          borderRadius: 10,
          padding: '12px 16px',
          fontSize: 13,
          fontWeight: 700,
          background: reference.length >= 6 ? ORANGE : '#d1d5db',
          color: 'white',
          border: 'none',
          cursor: reference.length >= 6 ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {loading ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Enviando...</> : 'Enviar Comprobante'}
      </button>
    </div>
  );
};
