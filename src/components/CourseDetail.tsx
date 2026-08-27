import React from 'react';
import type { Course, User } from '../data';
import { ArrowLeft, Clock, BookOpen, PlayCircle, HelpCircle, CheckCircle, CreditCard, FileText, CheckCircle2, Zap, Users } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  currentUser: User | null;
  allCourses: Course[];
  onBack: () => void;
  onCheckout: (course: Course) => void;
  onAccess: (courseId: string) => void;
}

const ORANGE = '#F59B20';

export const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  currentUser,
  allCourses,
  onBack,
  onCheckout,
  onAccess,
}) => {
  const isPurchased = currentUser?.purchasedCourses?.includes(course.id);

  const isPrereqMet = course.prerequisites.length === 0 || course.prerequisites.every((prereqId) => {
    if (!currentUser) return false;
    const prereqCourse = allCourses.find((c) => c.id === prereqId);
    if (!prereqCourse) return true;
    const prereqLessonIds = prereqCourse.modules.flatMap((m) => m.lessons.map((l) => l.id));
    return prereqLessonIds.some((id) => currentUser.completedLessons.includes(id));
  });

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const handleCTA = () => {
    if (isPurchased) {
      if (!isPrereqMet) {
        alert('Debes completar el nivel previo requerido.');
        return;
      }
      onAccess(course.id);
    } else {
      onCheckout(course);
    }
  };

  const getCTAConfig = () => {
    if (isPurchased) {
      if (!isPrereqMet) return { label: 'BLOQUEADO', bg: '#d1d5db', color: '#6b7280' };
      return { label: 'CONTINUAR CURSO', bg: '#10b981', color: 'white' };
    }
    return { label: 'INSCRIBIRSE AHORA', bg: ORANGE, color: 'white' };
  };

  const cta = getCTAConfig();

  // Sample benefits based on course
  const benefits = course.id === 'tienda-gemini-sheets'
    ? ['Tienda en línea funcionando en 2 horas', 'Sin pagar hosting ni dominio', 'Gemini genera el código por ti', 'Actualizaciones desde tu teléfono', 'Guía paso a paso incluida', 'Soporte por WhatsApp']
    : course.id === 'arquitecto-no-code'
    ? ['Diseña sistemas a medida sin código', 'Domina los 4 pilares de la tecnología', 'Crea arquitecturas escalables', 'Proyecto final incluido', 'Sesión EN VIVO con interacción', 'Certificado de finalización']
    : course.id === 'edicion-reels'
    ? ['Edita desde tu teléfono o PC', 'Sin pagar editores externos', 'Plantillas y efectos profesionales', 'Subtítulos automáticos', 'Exporta en máxima calidad', 'Proyecto final publicable']
    : course.id === 'dashboards-sheets'
    ? ['Dashboards que se actualizan solos', 'Fórmulas avanzadas simplificadas', 'Gráficos profesionales', 'Reportes listos para clientes', 'Filtros automáticos', 'Proyecto final incluido']
    : ['Portal de edición para equipos', 'Sistema de roles y permisos', 'Notificaciones automáticas', 'Logs de actividad', 'Autenticación con Google', 'Despliegue incluido'];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Back button */}
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 24, padding: '8px 0' }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Volver al catálogo
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }} className="course-detail-grid">
          {/* Left: Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Hero image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', maxHeight: 400 }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
              {course.isLive && (
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: '#dc2626', padding: '6px 12px', fontSize: 11, fontWeight: 700, color: 'white', boxShadow: '0 2px 8px rgba(220,38,38,0.4)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', animation: 'pulse 1.5s infinite' }}></span>
                  EN VIVO
                </div>
              )}
              {course.isLive && course.liveDate && (
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'white', fontWeight: 600 }}>
                  📅 {course.liveDate} • {course.liveTime}
                </div>
              )}
            </div>

            {/* Category + Title */}
            <div>
              <span style={{ display: 'inline-block', borderRadius: 6, background: '#f5f3ff', border: '1px solid #ede9fe', padding: '4px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', marginBottom: 12 }}>
                {course.category}
              </span>
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 8 }}>
                {course.title}
              </h1>
              <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 16 }}>{course.subtitle}</p>

              {/* Meta badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', border: '1px solid #e5e7eb', padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
                  <BookOpen style={{ width: 16, height: 16, color: '#7c3aed' }} /> {course.masterclassCount} {course.isLive ? 'Sesión' : 'Clases'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', border: '1px solid #e5e7eb', padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
                  <Clock style={{ width: 16, height: 16, color: '#7c3aed' }} /> {course.duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', border: '1px solid #e5e7eb', padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
                  <FileText style={{ width: 16, height: 16, color: '#7c3aed' }} /> {totalLessons} Lecciones
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Descripción del Curso</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>{course.description}</p>
            </div>

            {/* What you'll learn */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16 }}>¿Qué aprenderás?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
                {benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <CheckCircle2 style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisiteNames && course.prerequisiteNames.length > 0 && (
              <div style={{ background: '#fffbeb', borderRadius: 12, border: '1px solid #fef3c7', padding: '14px 16px', fontSize: 13, color: '#92400e' }}>
                <span style={{ fontWeight: 700 }}>Requisito previo: </span>
                {course.prerequisiteNames.join(', ')}
              </div>
            )}
          </div>

          {/* Right: Price + CTA + Program */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Price card */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 24, position: 'sticky', top: 88 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: ORANGE }}>${course.price}</span>
                <span style={{ fontSize: 13, color: '#9ca3af' }}>USD</span>
              </div>

              <button onClick={handleCTA} style={{
                width: '100%',
                borderRadius: 12,
                padding: '14px 16px',
                fontSize: 13,
                fontWeight: 700,
                background: cta.bg,
                color: cta.color,
                border: 'none',
                cursor: 'pointer',
                boxShadow: `0 4px 12px ${cta.bg}33`,
                marginBottom: 12,
              }}>
                {cta.label}
              </button>

              <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
                {isPurchased ? 'Ya tienes acceso a este curso' : 'Acceso inmediato después del pago'}
              </div>

              {/* Features */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 16, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
                  <Zap style={{ width: 14, height: 14, color: ORANGE }} />
                  <span>Acceso inmediato</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
                  <Clock style={{ width: 14, height: 14, color: ORANGE }} />
                  <span>Aprende a tu ritmo</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
                  <Users style={{ width: 14, height: 14, color: ORANGE }} />
                  <span>Soporte por WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Program */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Programa del Curso</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {course.modules.map((mod) => (
                  <div key={mod.id} style={{ borderRadius: 12, border: '1px solid #f3f4f6', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{mod.title}</span>
                    </div>
                    <div style={{ padding: '8px 16px' }}>
                      {mod.lessons.map((lesson, lesIdx) => (
                        <div key={lesson.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: lesIdx < mod.lessons.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          {lesson.type === 'video' ? (
                            <PlayCircle style={{ width: 16, height: 16, color: '#7c3aed', flexShrink: 0 }} />
                          ) : lesson.type === 'quiz' ? (
                            <HelpCircle style={{ width: 16, height: 16, color: '#f59e0b', flexShrink: 0 }} />
                          ) : (
                            <FileText style={{ width: 16, height: 16, color: '#10b981', flexShrink: 0 }} />
                          )}
                          <span style={{ fontSize: 13, color: '#6b7280', flex: 1 }}>{lesson.title}</span>
                          <span style={{ fontSize: 11, color: '#d1d5db', flexShrink: 0 }}>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .course-detail-grid { grid-template-columns: 1fr 380px !important; }
        }
      `}</style>
    </div>
  );
};
