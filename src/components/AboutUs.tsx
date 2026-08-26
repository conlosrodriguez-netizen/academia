import React from 'react';
import { Heart, Users, Handshake } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" style={{ background: 'white', padding: '64px 0', borderBottom: '1px solid #f3f4f6' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'center' }} className="about-grid">
          {/* Photo placeholder */}
          <div style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3, #f5d0fe)', borderRadius: 20, aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #e9d5ff', minHeight: 280 }}>
            <Users style={{ width: 48, height: 48, color: '#c084fc', marginBottom: 12 }} />
            <p style={{ fontSize: 13, color: '#9333ea', fontWeight: 600, textAlign: 'center', padding: '0 20px' }}>
              📸 Espacio para foto familiar / pareja
            </p>
            <p style={{ fontSize: 11, color: '#a855f7', marginTop: 4 }}>@conlosrodriguez</p>
          </div>

          {/* Text */}
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999, background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#be185d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
              <Heart style={{ width: 12, height: 12 }} /> Quiénes Somos
            </span>

            <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111827', lineHeight: 1.25, marginBottom: 16 }}>
              Detrás de @ConLosRodriguez: una familia impulsando tu negocio
            </h2>

            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p>
                Somos una familia apasionada por emprender y por enseñar a otros a lograrlo. Entendemos perfectamente el reto que significa llevar un negocio adelante, cuidar cada dólar del presupuesto y multiplicar el tiempo para sacar los proyectos a flotación.
              </p>
              <p>
                Por eso decidimos unir nuestras fortalezas: fusionamos la <strong style={{ color: '#374151' }}>precisión y las habilidades técnicas de él</strong> con la <strong style={{ color: '#374151' }}>visión creativa, la estética y el diseño de ella</strong>. El resultado es una combinación 360° perfecta entre funcionalidad tecnológica y estrategia visual.
              </p>
              <p>
                No somos una agencia distante ni te tratamos con la frialdad de una corporación. Aquí no hay intermediarios ni respuestas automáticas deshumanizadas. Somos <strong style={{ color: '#374151' }}>personas reales acompañando a personas reales</strong>. Conocemos de cerca las dudas, los miedos y los triunfos de emprender, y estamos al lado de nuestros alumnos para guiarlos paso a paso.
              </p>
              <p>
                No creamos teoría aburrida; transformamos nuestro conocimiento en herramientas prácticas para que tú mismo puedas aplicarlas en tu marca. En <strong style={{ color: '#F59B20' }}>@ConLosRodriguez</strong> no solo te enseñamos una habilidad: te brindamos la <strong style={{ color: '#374151' }}>independencia, la confianza y la calidez humana</strong> que tu emprendimiento necesita para crecer.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '12px 16px', borderRadius: 12, background: '#fffbeb', border: '1px solid #fef3c7' }}>
              <Handshake style={{ width: 18, height: 18, color: '#d97706', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#92400e' }}>
                Familiaridad + Profesionalidad = Tu éxito
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};
