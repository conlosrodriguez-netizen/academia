import React, { useState } from 'react';
import type { Course, User } from '../data';
import { PlayCircle, Clock, BookOpen, Award, TrendingUp, LogOut, FileText } from 'lucide-react';
import { Certificate } from './Certificate';

const ORANGE = '#F59B20';

interface DashboardProps {
  user: User;
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onLogout: () => void;
  onUpdateName: (name: string) => void;
}

export const StudentDashboard: React.FC<DashboardProps> = ({ user, courses, onSelectCourse, onLogout, onUpdateName }) => {
  const myCourses = courses.filter((c) => user.purchasedCourses.includes(c.id));
  const [certCourse, setCertCourse] = useState<Course | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const getProgress = (course: Course) => {
    const total = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const done = course.modules.reduce((acc, m) =>
      acc + m.lessons.filter((l) => user.completedLessons.includes(l.id)).length, 0
    );
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const getCompletedLessons = (course: Course) => {
    return course.modules.reduce((acc, m) =>
      acc + m.lessons.filter((l) => user.completedLessons.includes(l.id)).length, 0
    );
  };

  const totalCompleted = user.completedLessons.length;
  const completedCourses = myCourses.filter((c) => getProgress(c) === 100);

  const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="./logo.png" alt="CR" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>CONLOSRODRIGUEZ</div>
              <div style={{ fontSize: 10, color: ORANGE, fontWeight: 600 }}>Mi Plataforma</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 10, background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11 }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{user.name}</span>
            </div>
            <button onClick={onLogout} style={{ padding: 8, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#ef4444', cursor: 'pointer' }} title="Cerrar Sesión">
              <LogOut style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Welcome + Name edit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
              ¡Bienvenido, {user.name}! 👋
            </h1>
            <p style={{ fontSize: 14, color: '#6b7280' }}>Continúa donde lo dejaste o explora nuevos cursos</p>
          </div>
          <button onClick={() => setShowNameInput(!showNameInput)} style={{ borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', padding: '8px 14px', fontSize: 12, fontWeight: 600, color: '#6b7280', cursor: 'pointer' }}>
            ✏️ Editar nombre para constancia
          </button>
        </div>

        {/* Name input */}
        {showNameInput && (
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }}>Nombre completo para la constancia</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Ej: María García López"
                style={{ width: '100%', borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 14px', fontSize: 13, color: '#111827', outline: 'none' }}
              />
            </div>
            <button onClick={() => { onUpdateName(tempName); setShowNameInput(false); }} style={{ borderRadius: 10, background: ORANGE, padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer', marginTop: 18 }}>
              Guardar
            </button>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen style={{ width: 18, height: 18, color: '#7c3aed' }} />
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Mis Cursos</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>{myCourses.length}</div>
          </div>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp style={{ width: 18, height: 18, color: '#10b981' }} />
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Lecciones Completadas</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>{totalCompleted}</div>
          </div>
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award style={{ width: 18, height: 18, color: '#f59e0b' }} />
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Constancias</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>{completedCourses.length}</div>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Mis Cursos</h2>

          {myCourses.length === 0 ? (
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', padding: 48, textAlign: 'center' }}>
              <BookOpen style={{ width: 48, height: 48, color: '#d1d5db', margin: '0 auto 16px' }} />
              <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16 }}>Aún no tienes cursos inscritos</p>
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 10, background: ORANGE, padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', textDecoration: 'none' }}>
                Explorar Cursos
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
              {myCourses.map((course) => {
                const progress = getProgress(course);
                const completed = getCompletedLessons(course);
                const total = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                const isComplete = progress === 100;

                return (
                  <div
                    key={course.id}
                    style={{
                      background: 'white',
                      borderRadius: 16,
                      border: '1px solid #f3f4f6',
                      overflow: 'hidden',
                      transition: 'all 0.2s',
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{ position: 'relative', height: 160, overflow: 'hidden', cursor: 'pointer' }}
                      onClick={() => onSelectCourse(course.id)}
                    >
                      <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                      <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em' }}>{course.category}</span>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{course.title}</h3>
                      </div>
                      {isComplete && (
                        <div style={{ position: 'absolute', top: 12, right: 12, borderRadius: 8, background: '#10b981', padding: '4px 10px', fontSize: 10, fontWeight: 700, color: 'white' }}>
                          ✓ Completado
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: 16 }}>
                      {/* Progress bar */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>Progreso</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: isComplete ? '#10b981' : ORANGE }}>{progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: 6, borderRadius: 3, background: '#f3f4f6', marginBottom: 12 }}>
                        <div style={{ width: `${progress}%`, height: '100%', borderRadius: 3, background: isComplete ? '#10b981' : ORANGE, transition: 'width 0.5s' }} />
                      </div>

                      {/* Meta */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#9ca3af', marginBottom: 14 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <PlayCircle style={{ width: 14, height: 14 }} />
                          {completed}/{total} lecciones
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock style={{ width: 14, height: 14 }} />
                          {course.duration}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => onSelectCourse(course.id)}
                          style={{
                            flex: 1,
                            padding: '10px 16px',
                            borderRadius: 10,
                            fontSize: 12,
                            fontWeight: 700,
                            background: isComplete ? '#ecfdf5' : ORANGE,
                            color: isComplete ? '#10b981' : 'white',
                            border: isComplete ? '1px solid #a7f3d0' : 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {progress === 0 ? 'Comenzar' : isComplete ? 'Revisar' : 'Continuar'}
                        </button>
                        {isComplete && (
                          <button
                            onClick={() => setCertCourse(course)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '10px 14px',
                              borderRadius: 10,
                              fontSize: 12,
                              fontWeight: 700,
                              background: '#fffbeb',
                              color: '#d97706',
                              border: '1px solid #fde68a',
                              cursor: 'pointer',
                            }}
                          >
                            <FileText style={{ width: 14, height: 14 }} /> Constancia
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Certificate modal */}
      {certCourse && (
        <Certificate
          course={certCourse}
          studentName={user.name}
          completionDate={today}
          onClose={() => setCertCourse(null)}
        />
      )}
    </div>
  );
};
