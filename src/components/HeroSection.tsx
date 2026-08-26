import React from 'react';
import { ShieldCheck, Award, ArrowRight, Zap, Tag } from 'lucide-react';

const ORANGE = '#F59B20';

export const HeroSection: React.FC = () => {
  return (
    <section style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed, #6d28d9)', overflow: 'hidden' }}>
      <div className="container" style={{ padding: '56px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 600, position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', padding: '6px 16px', marginBottom: 20 }}>
            <Tag style={{ width: 14, height: 14, color: '#6ee7b7' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6ee7b7' }}>Los precios más asequibles del mercado</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 14 }}>
            Aprende las habilidades digitales que tu emprendimiento necesita para crecer
          </h1>

          {/* H2 */}
          <h2 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 600, color: '#fde047', marginBottom: 12 }}>
            Cursos online en cápsulas de 5 a 10 minutos
          </h2>

          {/* H3 */}
          <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 28, maxWidth: 480 }}>
            Domina la tecnología, el diseño y el marketing para escalar tu marca a tu propio ritmo.
          </p>

          {/* CTA */}
          <a href="#cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: ORANGE, padding: '14px 28px', fontSize: 14, fontWeight: 700, color: 'white', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', marginBottom: 32 }}>
            Explora los cursos <ArrowRight style={{ width: 16, height: 16 }} />
          </a>

          {/* Trust */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck style={{ width: 16, height: 16, color: '#6ee7b7' }} />
              <span>Pago seguro automatizado</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Award style={{ width: 16, height: 16, color: '#fde047' }} />
              <span>Constancia de finalización</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap style={{ width: 16, height: 16, color: '#fbbf24' }} />
              <span>Acceso inmediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
