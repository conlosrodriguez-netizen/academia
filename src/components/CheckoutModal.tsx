import React, { useState } from 'react';
import type { Course } from '../data';
import { X, Building2, Wallet } from 'lucide-react';
import { PagoMovil } from './payments/PagoMovil';
import { BinancePay } from './payments/BinancePay';
import { Zinli } from './payments/Zinli';

const ORANGE = '#F59B20';

interface CheckoutModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  onSuccess: (courseId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, course, onClose, onSuccess }) => {
  const [method, setMethod] = useState<'select' | 'pagomovil' | 'binance' | 'zinli'>('select');

  if (!isOpen || !course) return null;

  const handleClose = () => {
    onClose();
    setMethod('select');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: 16 }} onClick={handleClose}>
      <div style={{ width: '100%', maxWidth: 440, background: 'white', borderRadius: 20, padding: 28, boxShadow: '0 8px 40px rgba(0,0,0,0.15)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} style={{ position: 'absolute', top: 16, right: 16, padding: 6, background: '#f3f4f6', border: 'none', borderRadius: 8, color: '#6b7280', cursor: 'pointer' }}>
          <X style={{ width: 18, height: 18 }} />
        </button>

        {/* Course summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6', marginBottom: 20 }}>
          <img src={course.image} alt="" style={{ width: 50, height: 50, borderRadius: 10, objectFit: 'cover' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed' }}>{course.category}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</p>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>${course.price}</span>
        </div>

        {method === 'select' && (
          <>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16, textAlign: 'center' }}>Método de Pago</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Pago Móvil */}
              <button
                onClick={() => setMethod('pagomovil')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px',
                  borderRadius: 12,
                  border: '2px solid #e5e7eb',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Building2 style={{ width: 22, height: 22, color: '#10b981' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Pago Móvil</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>Transferencia interbancaria instantánea</div>
                </div>
              </button>

              {/* Binance Pay */}
              <button
                onClick={() => setMethod('binance')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px',
                  borderRadius: 12,
                  border: '2px solid #e5e7eb',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f59e0b'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Wallet style={{ width: 22, height: 22, color: '#f59e0b' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Binance Pay</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>Pago con USDT (crypto)</div>
                </div>
              </button>

              {/* Zinli */}
              <button
                onClick={() => setMethod('zinli')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px',
                  borderRadius: 12,
                  border: '2px solid #e5e7eb',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 22 }}>💜</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Zinli</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>Billetera digital</div>
                </div>
              </button>
            </div>
          </>
        )}

        {method === 'pagomovil' && (
          <PagoMovil
            amountUSD={course.price}
            courseName={course.title}
            onSuccess={() => { onSuccess(course.id); handleClose(); }}
            onBack={() => setMethod('select')}
          />
        )}

        {method === 'binance' && (
          <BinancePay
            amountUSD={course.price}
            courseName={course.title}
            onSuccess={() => { onSuccess(course.id); handleClose(); }}
            onBack={() => setMethod('select')}
          />
        )}

        {method === 'zinli' && (
          <Zinli
            amountUSD={course.price}
            courseName={course.title}
            onSuccess={() => { onSuccess(course.id); handleClose(); }}
            onBack={() => setMethod('select')}
          />
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

