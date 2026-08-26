import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

const ORANGE = '#F59B20';

export const ValueProposition: React.FC = () => {
  return (
    <section style={{ background: '#f9fafb', padding: '56px 0', borderBottom: '1px solid #f3f4f6' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 680 }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999, background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#047857', marginBottom: 20 }}>
          <Tag style={{ width: 14, height: 14 }} />
          Los precios más accesibles del mercado
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#111827', lineHeight: 1.25, marginBottom: 12 }}>
          Aprende las habilidades digitales que tu emprendimiento necesita para crecer
        </h1>

        {/* H2 */}
        <h2 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 600, color: ORANGE, marginBottom: 12 }}>
          Cursos online en cápsulas de 6 a 10 minutos
        </h2>

        {/* H3 */}
        <h3 style={{ fontSize: 'clamp(13px, 2vw, 15px)', fontWeight: 400, color: '#6b7280', lineHeight: 1.7, marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
          Domina la tecnología, el diseño y el marketing para escalar tu marca a tu propio ritmo.
        </h3>

        {/* CTA */}
        <a href="#cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: ORANGE, padding: '14px 28px', fontSize: 14, fontWeight: 700, color: 'white', textDecoration: 'none', boxShadow: '0 4px 14px rgba(245,155,32,0.3)', transition: 'all 0.2s' }}>
          Explora los cursos <ArrowRight style={{ width: 16, height: 16 }} />
        </a>
      </div>
    </section>
  );
};
