import React from 'react';
import type { Course, User } from '../data';
import { ArrowLeft, Clock, BookOpen, PlayCircle, HelpCircle, CheckCircle, CreditCard, FileText } from 'lucide-react';

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
      // Direct to checkout - no login required first
      onCheckout(course);
    }
  };

  const getCTAConfig = () => {
    if (isPurchased) {
      if (!isPrereqMet) return { label: 'BLOQUEADO - REQUIERE PREREQUISITO', bg: '#d1d5db', color: '#6b7280' };
      return { label: 'CONTINUAR CURSO', bg: '#10b981', color: 'white' };
    }
    return { label: 'INSCRIBIRSE AHORA - $' + course.price + ' USD', bg: ORANGE, color: 'white' };
  };

  const cta = getCTAConfig();

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Top bar */}
      <div style={{ background: ORANGE, padding: '12px 0' }}>
        <div className="container">
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <ArrowLeft style={{ width: 18, height: 18 }} /> Volver al catálogo
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="course-detail-grid">
          {/* Left: Info */}
          <div>
            {/* Category */}
            <span style={{ display: 'inline-block', borderRadius: 6, background: '#f5f3ff', border: '1px solid #ede9fe', padding: '4px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', marginBottom: 12 }}>
              {course.category}
            </span>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 8 }}>
              {course.title}
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 20 }}>{course.subtitle}</p>

            {/* Meta badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', border: '1px solid #e5e7eb', padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
                <BookOpen style={{ width: 16, height: 16, color: '#7c3aed' }} /> {course.masterclassCount} Masterclass
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', border: '1px solid #e5e7eb', padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
                <Clock style={{ width: 16, height: 16, color: '#7c3aed' }} /> {course.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', border: '1px solid #e5e7eb', padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>
                <FileText style={{ width: 16, height: 16, color: '#7c3aed' }} /> {totalLessons} Lecciones
              </div>
            </div>

            {/* Description */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Descripción del Curso</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{course.description}</p>
            </div>

            {/* Prerequisites */}
            {course.prerequisiteNames && course.prerequisiteNames.length > 0 && (
              <div style={{ background: '#fffbeb', borderRadius: 12, border: '1px solid #fef3c7', padding: '14px 16px', marginBottom: 24, fontSize: 13, color: '#92400e' }}>
                <span style={{ fontWeight: 700 }}>Requisito previo: </span>
                {course.prerequisiteNames.join(', ')}
              </div>
            )}
          </div>

          {/* Right: Price + CTA + Program */}
          <div>
            {/* Price card */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 24, marginBottom: 24, position: 'sticky', top: 88 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: ORANGE }}>${course.price}</span>
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
                boxShadow: cta.bg !== '#d1d5db' ? `0 4px 12px ${cta.bg}33` : 'none',
                cursor: 'pointer',
                marginBottom: 12,
              }}>
                {isPurchased && isPrereqMet ? <CheckCircle style={{ width: 16, height: 16, display: 'inline', marginRight: 6 }} /> : <CreditCard style={{ width: 16, height: 16, display: 'inline', marginRight: 6 }} />}
                {cta.label}
              </button>

              <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
                {isPurchased ? 'Ya tienes acceso a este curso' : 'Acceso inmediato después del pago'}
              </div>
            </div>

            {/* Program */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Programa del Curso</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {course.modules.map((mod) => (
                  <div key={mod.id} style={{ borderRadius: 12, border: '1px solid #f3f4f6', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                        {mod.title}
                      </span>
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
