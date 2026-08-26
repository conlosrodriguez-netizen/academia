import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, Mail, Camera, Loader2 } from 'lucide-react';

interface ZinliProps {
  amountUSD: number;
  courseName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const Zinli: React.FC<ZinliProps> = ({ amountUSD, courseName, onSuccess, onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [capturePreview, setCapturePreview] = useState<string | null>(null);
  const [captureFile, setCaptureFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'solcar1992@gmail.com';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCaptureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCapturePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hola! Realicé un pago de Zinli por $' + amountUSD + ' para el curso "' + courseName + '". Adjunto la captura del pago.'
    );
    window.open('https://wa.me/5804248804734?text=' + msg, '_blank');
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sendWhatsApp();
    }, 1500);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check style={{ width: 32, height: 32, color: '#10b981' }} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>¡Listo!</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Se abrió WhatsApp con tu comprobante.</p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Te confirmamos el acceso en menos de 24h.</p>
        <button onClick={onSuccess} style={{ borderRadius: 10, background: '#8b5cf6', padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
          Entendido
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <ArrowLeft style={{ width: 14, height: 14 }} /> Volver
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 20 }}>💜</span>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Zinli</h3>
          <p style={{ fontSize: 11, color: '#9ca3af' }}>Billetera digital</p>
        </div>
      </div>

      {/* Amount */}
      <div style={{ background: 'linear-gradient(135deg, #ede9fe, #f5f3ff)', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid #c4b5fd', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#6d28d9', fontWeight: 600, marginBottom: 4 }}>Monto a pagar</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#5b21b6' }}>${amountUSD} USD</div>
      </div>

      {/* Email */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Enviar a:</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 13, color: '#111827', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail style={{ width: 14, height: 14, color: '#6b7280', flexShrink: 0 }} />
            {email}
          </div>
          <button onClick={() => copyToClipboard(email, 'email')} style={{ padding: 10, borderRadius: 10, border: '1px solid #e5e7eb', background: copied === 'email' ? '#ecfdf5' : 'white', cursor: 'pointer', color: copied === 'email' ? '#10b981' : '#6b7280', flexShrink: 0 }}>
            {copied === 'email' ? <Check style={{ width: 18, height: 18 }} /> : <Copy style={{ width: 18, height: 18 }} />}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid #f3f4f6' }}>
        <h4 style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Pasos:</h4>
        <ol style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8, paddingLeft: 16 }}>
          <li>Abre tu app de <strong>Zinli</strong></li>
          <li>Ve a <strong>Enviar</strong></li>
          <li>Busca por email: <strong>{email}</strong></li>
          <li>Envía <strong>${amountUSD} USD</strong></li>
          <li>Sube la captura y envía</li>
        </ol>
      </div>

      {/* Capture upload */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Captura del comprobante *</label>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '24px', borderRadius: 10, border: capturePreview ? '2px solid #10b981' : '2px dashed #d1d5db', background: capturePreview ? '#f0fdf4' : '#f9fafb', cursor: 'pointer', transition: 'all 0.2s' }}>
          {capturePreview ? (
            <img src={capturePreview} alt="Capture" style={{ width: '100%', maxHeight: 180, objectFit: 'contain', borderRadius: 8 }} />
          ) : (
            <>
              <Camera style={{ width: 24, height: 24, color: '#9ca3af' }} />
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600, display: 'block' }}>Sube la captura del pago</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Foto de la transacción en Zinli</span>
              </div>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleCapture} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!captureFile || loading}
        style={{
          width: '100%',
          borderRadius: 10,
          padding: '14px 16px',
          fontSize: 13,
          fontWeight: 700,
          background: captureFile ? '#8b5cf6' : '#d1d5db',
          color: 'white',
          border: 'none',
          cursor: captureFile ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {loading ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Enviando...</> : 'Enviar Comprobante por WhatsApp'}
      </button>

      <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>
        Se abrirá WhatsApp con tu comprobante pre-cargado
      </p>
    </div>
  );
};
