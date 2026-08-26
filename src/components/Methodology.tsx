import React from 'react';
import { Brain, Zap, Target } from 'lucide-react';

export const Methodology: React.FC = () => {
  return (
    <section style={{ background: 'white', padding: '64px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', borderRadius: 999, background: '#fff7ed', border: '1px solid #fed7aa', padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            Nuestra Metodología
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 8 }}>
            Aprende sin rodeos.<br />
            <span style={{ color: '#F59B20' }}>Aplica al instante.</span>
          </h2>
          <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Olvídate de las clases aburridas de una hora. Estudiar por periodos largos solo satura tu cerebro y te hace olvidar lo que viste. En <strong>@ConLosRodriguez</strong> estructuramos cada curso en cápsulas de 5 a 10 minutos basándonos en la ciencia del aprendizaje.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Card 1 */}
          <div style={{ background: '#fafafa', borderRadius: 16, border: '1px solid #f3f4f6', padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.05)' }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Brain style={{ width: 22, height: 22, color: '#ef4444' }} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              Vence la Curva del Olvido
            </h3>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>Hermann Ebbinghaus:</span> El cerebro olvida el 70% de lo aprendido en 24 horas si recibe demasiada información junta. Nuestras lecciones cortas fijan el conocimiento en tu memoria a largo plazo.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#fafafa', borderRadius: 16, border: '1px solid #f3f4f6', padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(124,58,237,0.05)' }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Zap style={{ width: 22, height: 22, color: '#7c3aed' }} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              Cero Sobrecarga Cognitiva
            </h3>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7 }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>John Sweller:</span> Tu memoria de trabajo es limitada. Al enfocar cada módulo en una sola acción concreta, eliminas la saturación y aprendes sin estrés.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#fafafa', borderRadius: 16, border: '1px solid #f3f4f6', padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(245,155,32,0.05)' }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Target style={{ width: 22, height: 22, color: '#F59B20' }} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              Atención Sintetizada
            </h3>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7 }}>
              La neurociencia demuestra que la atención de alta intensidad dura menos de 10 minutos. Te damos el contenido justo en su punto óptimo de concentración para que termines cada lección y la apliques en tu negocio ese mismo día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
