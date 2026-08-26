import React from 'react';
import { ArrowLeft, Heart, Users, Sparkles, Target, Zap } from 'lucide-react';

const ORANGE = '#F59B20';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64 }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#6b7280', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <ArrowLeft style={{ width: 18, height: 18 }} /> Volver
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3, #f5d0fe)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999, background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#be185d', marginBottom: 20 }}>
            <Heart style={{ width: 14, height: 14 }} /> Una familia emprendedora
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 12 }}>
            Detrás de <span style={{ color: ORANGE }}>@ConLosRodriguez</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7 }}>
            Una familia impulsando tu negocio
          </p>
        </div>
      </section>

      {/* Photos section */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="photos-grid">
            {/* Wife */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #fbcfe8',
                margin: '0 auto 16px',
                boxShadow: '0 8px 30px rgba(236,72,153,0.15)',
              }}>
                <img src="./sol.jpeg" alt="Ella" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Ella</h3>
              <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 250, margin: '0 auto' }}>
                Visión creativa, estética y diseño. La fuerza visual de la marca.
              </p>
            </div>

            {/* Heart connector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: ORANGE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(245,155,32,0.3)',
              }}>
                <Heart style={{ width: 24, height: 24, color: 'white' }} />
              </div>
            </div>

            {/* Husband */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #bfdbfe',
                margin: '0 auto 16px',
                boxShadow: '0 8px 30px rgba(59,130,246,0.15)',
              }}>
                <img src="./yeison.jpeg" alt="Él" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Él</h3>
              <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 250, margin: '0 auto' }}>
                Precisión técnica, habilidades digitales y estrategia. El motor tecnológico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: 'white', padding: '64px 0', borderTop: '1px solid #f3f4f6' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'start' }} className="about-content-grid">
            {/* Text */}
            <div style={{ maxWidth: 500 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 20 }}>
                Sobre Nosotros
              </h2>
              <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: ORANGE, fontStyle: 'italic' }}>
                  ✝️ Nuestro objetivo en todo lo que hacemos es para la gloria de Dios.
                </p>
                <p>
                  Somos una familia con habilidades tecnológicas y creativas que quiere poner sus dones al servicio de emprendedores para que logren sus objetivos. Entendemos perfectamente el reto que significa llevar un negocio adelante, cuidar cada dólar del presupuesto y multiplicar el tiempo para sacar los proyectos a flotación.
                </p>
                <p>
                  Por eso decidimos unir nuestras fortalezas: fusionamos la <strong style={{ color: '#374151' }}>precisión y las habilidades técnicas de él</strong> con la <strong style={{ color: '#374151' }}>visión creativa, la estética y el diseño de ella</strong>. El resultado es una combinación 360° perfecta entre funcionalidad tecnológica y estrategia visual.
                </p>
                <p>
                  No somos una agencia distante ni te tratamos con la frialdad de una corporación. Aquí no hay intermediarios ni respuestas automáticas deshumanizadas. Somos <strong style={{ color: '#374151' }}>personas reales acompañando a personas reales</strong>. Conocemos de cerca las dudas, los miedos y los triunfos de emprender, y estamos al lado de nuestros alumnos para guiarlos paso a paso.
                </p>
                <p>
                  No creamos teoría aburrida; transformamos nuestro conocimiento en herramientas prácticas para que tú mismo puedas aplicarlas en tu marca. En <strong style={{ color: ORANGE }}>@ConLosRodriguez</strong> no solo te enseñamos una habilidad: te brindamos la <strong style={{ color: '#374151' }}>independencia, la confianza y la calidez humana</strong> que tu emprendimiento necesita para crecer.
                </p>
              </div>
            </div>

            {/* Video */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 300 }}>
                {/* Phone frame */}
                <div style={{
                  background: 'linear-gradient(145deg, #1a1a2e, #0f0f1a)',
                  borderRadius: 40,
                  padding: 14,
                  boxShadow: '0 25px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                  border: '4px solid #2a2a3e',
                }}>
                  {/* Dynamic Island */}
                  <div style={{
                    width: 90,
                    height: 28,
                    background: '#000',
                    borderRadius: 20,
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 10,
                    top: 4,
                  }} />
                  {/* Screen */}
                  <div style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    marginTop: -8,
                    position: 'relative',
                    background: '#000',
                    height: 540,
                  }}>
                    <video
                      ref={(el) => { if (el) { el.play().catch(() => {}); } }}
                      src="./video-about.mp4"
                      autoPlay
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  {/* Home bar */}
                  <div style={{
                    width: 100,
                    height: 5,
                    background: '#555',
                    borderRadius: 3,
                    margin: '10px auto 6px',
                  }} />
                </div>
                {/* Glow */}
                <div style={{
                  position: 'absolute',
                  bottom: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '85%',
                  height: 50,
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(124,58,237,0.25))',
                  filter: 'blur(25px)',
                  borderRadius: '50%',
                  zIndex: -1,
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '64px 0', background: '#f9fafb' }}>
        <div className="container">
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 32, textAlign: 'center' }}>
            Lo que nos define
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: <Users style={{ width: 22, height: 22, color: '#7c3aed' }} />, title: 'Familia', desc: 'No somos una corporación. Somos una familia que entiende tus retos.', bg: '#f5f3ff' },
              { icon: <Sparkles style={{ width: 22, height: 22, color: '#ec4899' }} />, title: 'Calidez', desc: 'Te acompañamos paso a paso con trato personal y humano.', bg: '#fdf2f8' },
              { icon: <Target style={{ width: 22, height: 22, color: ORANGE }} />, title: 'Práctica', desc: 'Sin teoría aburrida. Herramientas que aplicas el mismo día.', bg: '#fffbeb' },
              { icon: <Zap style={{ width: 22, height: 22, color: '#10b981' }} />, title: 'Tecnología', desc: 'Fusionamos lo técnico con lo creativo para resultados reales.', bg: '#ecfdf5' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 24, textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 8 }}>¿Listo para aprender?</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Explora nuestros cursos y comienza tu transformación digital hoy.</p>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: ORANGE, padding: '12px 24px', fontSize: 13, fontWeight: 700, color: 'white', textDecoration: 'none' }}>
            Ver Cursos
          </a>
        </div>
      </section>

      <style>{`
        @media (min-width: 640px) {
          .photos-grid { grid-template-columns: 1fr auto 1fr !important; }
        }
        @media (min-width: 768px) {
          .about-content-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
};
