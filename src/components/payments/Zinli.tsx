import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, ExternalLink, Mail } from 'lucide-react';

const ORANGE = '#F59B20';

interface ZinliProps {
  amountUSD: number;
  courseName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const Zinli: React.FC<ZinliProps> = ({ amountUSD, courseName, onSuccess, onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const email = 'solcar1992@gmail.com';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <ArrowLeft style={{ width: 14, height: 14 }} /> Volver
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid #f3f4f6' }}>
        <h4 style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Pasos:</h4>
        <ol style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8, paddingLeft: 16 }}>
          <li>Abre tu app de <strong>Zinli</strong></li>
          <li>Ve a <strong>Enviar</strong></li>
          <li>Busca por email: <strong>{email}</strong></li>
          <li>Envía <strong>${amountUSD} USD</strong></li>
          <li>Envía la captura por WhatsApp</li>
        </ol>
      </div>

      {/* WhatsApp link */}
      <a
        href={`https://wa.me/5804248804735?text=${encodeURIComponent('Hola! Realicé un pago de Zinli por $' + amountUSD + ' para el curso "' + courseName + '". Adjunto la captura del pago.')}`}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 16px',
          borderRadius: 10,
          background: '#25D366',
          color: 'white',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        <ExternalLink style={{ width: 16, height: 16 }} /> Enviar por WhatsApp
      </a>
    </div>
  );
};
