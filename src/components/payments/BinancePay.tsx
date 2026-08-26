import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, ExternalLink } from 'lucide-react';

const ORANGE = '#F59B20';

interface BinancePayProps {
  amountUSD: number;
  courseName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const BinancePay: React.FC<BinancePayProps> = ({ amountUSD, courseName, onSuccess, onBack }) => {
  const [copied, setCopied] = useState<string | null>(null);

  // Binance Pay USDT address (TRC20)
  const usdtAddress = 'TU_DIRECCION_BINANCE_USDT';
  const network = 'TRC20';

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

      {/* QR Code placeholder */}
      <div style={{ background: 'white', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #e5e7eb', textAlign: 'center' }}>
        <div style={{ width: 160, height: 160, background: '#f3f4f6', borderRadius: 8, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #d1d5db' }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>QR Code</span>
        </div>
        <p style={{ fontSize: 11, color: '#6b7280' }}>Escanea con tu app de Binance</p>
      </div>

      {/* Network info */}
      <div style={{ background: '#fffbeb', borderRadius: 10, padding: '10px 14px', marginBottom: 16, border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>⚠️</span>
        <span style={{ fontSize: 11, color: '#92400e', fontWeight: 600 }}>Red: {network} (TRC20)</span>
      </div>

      {/* Address */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Dirección USDT (TRC20)</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 12, color: '#111827', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {usdtAddress}
          </div>
          <button onClick={() => copyToClipboard(usdtAddress, 'address')} style={{ padding: 10, borderRadius: 10, border: '1px solid #e5e7eb', background: copied === 'address' ? '#ecfdf5' : 'white', cursor: 'pointer', color: copied === 'address' ? '#10b981' : '#6b7280', flexShrink: 0 }}>
            {copied === 'address' ? <Check style={{ width: 18, height: 18 }} /> : <Copy style={{ width: 18, height: 18 }} />}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid #f3f4f6' }}>
        <h4 style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Pasos:</h4>
        <ol style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8, paddingLeft: 16 }}>
          <li>Abre tu app de Binance</li>
          <li>Ve a <strong>Pago</strong> → <strong>Enviar</strong></li>
          <li>Selecciona <strong>USDT</strong> y red <strong>TRC20</strong></li>
          <li>Pega la dirección y envía <strong>{amountUSD} USDT</strong></li>
          <li>Envía la referencia de la transacción por WhatsApp</li>
        </ol>
      </div>

      {/* WhatsApp link */}
      <a
        href={`https://wa.me/5804248804735?text=${encodeURIComponent('Hola! Realicé un pago de Binance Pay por $' + amountUSD + ' USDT para el curso "' + courseName + '". Adjunto la referencia de la transacción.')}`}
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
