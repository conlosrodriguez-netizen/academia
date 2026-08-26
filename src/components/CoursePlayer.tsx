import React, { useState } from 'react';
import type { Course, Lesson } from '../data';
import {
  ArrowLeft, PlayCircle, BookOpen, HelpCircle, CheckCircle,
  Award, ChevronDown, ChevronRight, Clock, FileText
} from 'lucide-react';

const ORANGE = '#F59B20';

interface PlayerProps {
  course: Course;
  userCompletedLessons: string[];
  onCompleteLesson: (lessonId: string) => void;
  onBack: () => void;
  allCourses: Course[];
}

export const CoursePlayer: React.FC<PlayerProps> = ({
  course,
  userCompletedLessons,
  onCompleteLesson,
  onBack,
  allCourses,
}) => {
  const firstLesson = course.modules[0]?.lessons[0];
  const [activeLesson, setActiveLesson] = useState<Lesson>(firstLesson);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    Object.fromEntries(course.modules.map((m) => [m.id, true]))
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Prerequisite check
  const isPrereqMet = course.prerequisites.length === 0 || course.prerequisites.every((prereqId) => {
    const prereqCourse = allCourses.find((c) => c.id === prereqId);
    if (!prereqCourse) return true;
    const prereqLessonIds = prereqCourse.modules.flatMap((m) => m.lessons.map((l) => l.id));
    return prereqLessonIds.some((id) => userCompletedLessons.includes(id));
  });

  if (!isPrereqMet) {
    return (
      <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ maxWidth: 420, width: '100%', background: 'white', borderRadius: 20, border: '1px solid #f3f4f6', padding: 40, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ fontSize: 28 }}>🔒</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Nivel Bloqueado</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
            Para acceder a "<strong>{course.title}</strong>" debes completar:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
            {course.prerequisiteNames?.map((name, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: '#7c3aed', fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed' }} />
                {name}
              </div>
            ))}
          </div>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 10, background: ORANGE, padding: '10px 20px', fontSize: 13, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft style={{ width: 16, height: 16 }} /> Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedInCourse = course.modules.reduce((acc, m) =>
    acc + m.lessons.filter((l) => userCompletedLessons.includes(l.id)).length, 0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0;

  const handleLessonSelect = (lesson: Lesson) => {
    if (!isLessonUnlocked(lesson.id)) return; // Can't select locked lessons
    setActiveLesson(lesson);
    setQuizAnswer(null);
    setQuizResult(null);
  };

  const handleQuizSubmit = () => {
    if (!activeLesson?.quiz || quizAnswer === null) return;
    const correct = quizAnswer === activeLesson.quiz.correctIndex;
    setQuizResult(correct);
    if (correct) handleCompleteAndAdvance(activeLesson.id);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const isLessonDone = (lessonId: string) => userCompletedLessons.includes(lessonId);

  // Sequential unlock: get flat list of all lessons in order
  const allLessonsFlat = course.modules.flatMap((m) => m.lessons);

  // Check if a lesson is unlocked (first lesson or previous lesson completed)
  const isLessonUnlocked = (lessonId: string): boolean => {
    const idx = allLessonsFlat.findIndex((l) => l.id === lessonId);
    if (idx === 0) return true; // First lesson is always unlocked
    if (idx < 0) return false;
    const prevLesson = allLessonsFlat[idx - 1];
    return isLessonDone(prevLesson.id);
  };

  // Auto-advance to next lesson after completion
  const handleCompleteAndAdvance = (lessonId: string) => {
    onCompleteLesson(lessonId);
    const currentIdx = allLessonsFlat.findIndex((l) => l.id === lessonId);
    if (currentIdx >= 0 && currentIdx < allLessonsFlat.length - 1) {
      const nextLesson = allLessonsFlat[currentIdx + 1];
      if (isLessonUnlocked(nextLesson.id) || nextLesson.id === allLessonsFlat[currentIdx + 1]?.id) {
        setActiveLesson(nextLesson);
        setQuizAnswer(null);
        setQuizResult(null);
      }
    }
  };

  const getLessonIcon = (lesson: Lesson, done: boolean, unlocked: boolean) => {
    if (done) return <CheckCircle style={{ width: 16, height: 16, color: '#10b981', flexShrink: 0 }} />;
    if (!unlocked) return <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #475569', display: 'inline-block', flexShrink: 0 }} />;
    if (lesson.type === 'video') return <PlayCircle style={{ width: 16, height: 16, color: '#7c3aed', flexShrink: 0 }} />;
    if (lesson.type === 'quiz') return <HelpCircle style={{ width: 16, height: 16, color: '#f59e0b', flexShrink: 0 }} />;
    return <FileText style={{ width: 16, height: 16, color: '#3b82f6', flexShrink: 0 }} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '0 16px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ padding: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94a3b8', cursor: 'pointer' }}>
            <ArrowLeft style={{ width: 18, height: 18 }} />
          </button>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{course.category}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{course.title}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 120, height: 4, borderRadius: 2, background: '#334155', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: progressPercent === 100 ? '#10b981' : ORANGE, borderRadius: 2, transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>{progressPercent}%</span>
          </div>
          {progressPercent === 100 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, borderRadius: 6, background: 'rgba(16,185,129,0.15)', padding: '4px 10px', fontSize: 10, fontWeight: 700, color: '#10b981' }}>
              <Award style={{ width: 12, height: 12 }} /> Completado
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94a3b8', cursor: 'pointer', fontSize: 11 }}>
            ☰
          </button>
        </div>
      </header>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Video / Content area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Video player */}
          {activeLesson.type === 'video' && (
            <div style={{ background: 'black', aspectRatio: '16/9', maxHeight: '60vh' }}>
              <video
                src={activeLesson.content}
                controls
                style={{ width: '100%', height: '100%' }}
                poster={course.image}
              />
            </div>
          )}

          {/* Content area */}
          <div style={{ flex: 1, overflow: 'auto', padding: 24, background: '#1e293b' }}>
            {/* Lesson header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                {getLessonIcon(activeLesson, isLessonDone(activeLesson.id), isLessonUnlocked(activeLesson.id))}
                <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {activeLesson.type === 'video' ? 'Video' : activeLesson.type === 'quiz' ? 'Quiz' : 'Lectura'}
                </span>
                <span style={{ fontSize: 11, color: '#475569' }}>•</span>
                <span style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock style={{ width: 12, height: 12 }} /> {activeLesson.duration}
                </span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{activeLesson.title}</h2>
            </div>

            {/* Reading content */}
            {activeLesson.type === 'reading' && (
              <div style={{ background: '#0f172a', borderRadius: 14, border: '1px solid #334155', padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <BookOpen style={{ width: 16, height: 16, color: '#3b82f6' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Lectura</span>
                </div>
                <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {activeLesson.content}
                </p>
              </div>
            )}

            {/* Quiz */}
            {activeLesson.type === 'quiz' && activeLesson.quiz && (
              <div style={{ background: '#0f172a', borderRadius: 14, border: '1px solid #334155', padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <HelpCircle style={{ width: 16, height: 16, color: '#f59e0b' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quiz</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 16, lineHeight: 1.5 }}>{activeLesson.quiz.question}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeLesson.quiz.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => { if (quizResult === null) setQuizAnswer(idx); }}
                      disabled={quizResult !== null}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        borderRadius: 10,
                        padding: '12px 16px',
                        fontSize: 13,
                        fontWeight: 500,
                        border: '1px solid',
                        borderColor: quizResult !== null && idx === activeLesson.quiz!.correctIndex
                          ? '#10b981'
                          : quizResult !== null && idx === quizAnswer && !quizResult
                          ? '#ef4444'
                          : quizAnswer === idx
                          ? ORANGE
                          : '#334155',
                        background: quizResult !== null && idx === activeLesson.quiz!.correctIndex
                          ? 'rgba(16,185,129,0.1)'
                          : quizResult !== null && idx === quizAnswer && !quizResult
                          ? 'rgba(239,68,68,0.1)'
                          : quizAnswer === idx
                          ? 'rgba(245,155,32,0.1)'
                          : 'transparent',
                        color: '#e2e8f0',
                        cursor: quizResult !== null ? 'default' : 'pointer',
                      }}
                    >
                      <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
                {quizResult === null ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                    style={{ marginTop: 16, width: '100%', borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 700, background: ORANGE, color: 'white', border: 'none', cursor: quizAnswer === null ? 'not-allowed' : 'pointer', opacity: quizAnswer === null ? 0.5 : 1 }}
                  >
                    Comprobar Respuesta
                  </button>
                ) : (
                  <div style={{ marginTop: 16, borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 600, background: quizResult ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: quizResult ? '#10b981' : '#ef4444', border: `1px solid ${quizResult ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                    {quizResult ? '¡Correcto! Lección desbloqueada.' : 'Incorrecto. Intenta de nuevo.'}
                  </div>
                )}
              </div>
            )}

            {/* Mark as done */}
            {activeLesson.type !== 'quiz' && (
              <div>
                {isLessonDone(activeLesson.id) ? (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#10b981' }}>
                    <CheckCircle style={{ width: 16, height: 16 }} /> Lección completada
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteAndAdvance(activeLesson.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 10, background: ORANGE, padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    <CheckCircle style={{ width: 16, height: 16 }} /> Marcar como completada
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside style={{ width: 320, background: '#1e293b', borderLeft: '1px solid #334155', overflow: 'auto', flexShrink: 0 }}>
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 12 }}>Contenido del Curso</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {course.modules.map((mod) => {
                  const modLessons = mod.lessons.length;
                  const modDone = mod.lessons.filter((l) => isLessonDone(l.id)).length;
                  const expanded = expandedModules[mod.id];
                  return (
                    <div key={mod.id}>
                      <button
                        onClick={() => toggleModule(mod.id)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid transparent', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}
                      >
                        {expanded ? <ChevronDown style={{ width: 14, height: 14, color: '#64748b', flexShrink: 0 }} /> : <ChevronRight style={{ width: 14, height: 14, color: '#64748b', flexShrink: 0 }} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.title}</div>
                          <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>{modDone}/{modLessons} lecciones</div>
                        </div>
                        {modDone === modLessons && <CheckCircle style={{ width: 14, height: 14, color: '#10b981', flexShrink: 0 }} />}
                      </button>
                      {expanded && (
                        <div style={{ marginLeft: 14, paddingLeft: 14, borderLeft: '1px solid #334155' }}>
                          {mod.lessons.map((lesson) => {
                            const done = isLessonDone(lesson.id);
                            const unlocked = isLessonUnlocked(lesson.id);
                            const active = activeLesson.id === lesson.id;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonSelect(lesson)}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 8,
                                  padding: '8px 10px',
                                  borderRadius: 6,
                                  border: 'none',
                                  background: active ? 'rgba(245,155,32,0.1)' : 'transparent',
                                  color: !unlocked ? '#475569' : active ? ORANGE : '#94a3b8',
                                  cursor: unlocked ? 'pointer' : 'not-allowed',
                                  textAlign: 'left',
                                  fontSize: 12,
                                  fontWeight: active ? 600 : 400,
                                  marginBottom: 2,
                                  opacity: unlocked ? 1 : 0.5,
                                }}
                              >
                                {getLessonIcon(lesson, done, unlocked)}
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: done ? 'line-through' : 'none' }}>{lesson.title}</span>
                                <span style={{ fontSize: 10, color: '#475569', flexShrink: 0 }}>{lesson.duration}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
