import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5804248804734';
const WHATSAPP_MESSAGE = encodeURIComponent('Hola! Viene de la página web de CONLOSRODRIGUEZ. Tengo una duda sobre los cursos.');

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#25D366',
          border: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <MessageCircle style={{ width: 28, height: 28, color: 'white' }} />
      </button>

      {/* Tooltip */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 96,
          right: 24,
          width: 280,
          background: 'white',
          borderRadius: 16,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          zIndex: 100,
          animation: 'slideUp 0.3s ease-out',
        }}>
          {/* Header */}
          <div style={{ background: '#075E54', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle style={{ width: 20, height: 20, color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>CONLOSRODRIGUEZ</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Normalmente responde rápido</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Message bubble */}
          <div style={{ padding: 16, background: '#f0f0f0' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px 12px 12px 0',
              padding: '10px 14px',
              fontSize: 13,
              color: '#333',
              lineHeight: 1.5,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              maxWidth: '90%',
            }}>
              ¡Hola! 👋 ¿Tienes alguna duda sobre nuestros cursos de tecnología e IA?
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 16px',
                borderRadius: 12,
                background: '#25D366',
                color: 'white',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              <MessageCircle style={{ width: 16, height: 16 }} /> Abrir WhatsApp
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
