import React, { useState } from 'react';
import type { Course, User } from './data';
import { INITIAL_COURSES } from './data';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Methodology } from './components/Methodology';
import { AboutPage } from './components/AboutPage';
import { CourseGrid } from './components/CourseGrid';
import { CourseDetail } from './components/CourseDetail';
import { CoursePlayer } from './components/CoursePlayer';
import { StudentDashboard } from './components/StudentDashboard';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LandingTienda } from './components/LandingTienda';

export const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'detail' | 'dashboard' | 'player' | 'about' | 'landing-tienda'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  // Player view
  if (view === 'player' && selectedCourse && currentUser) {
    return (
      <CoursePlayer
        course={selectedCourse}
        userCompletedLessons={currentUser.completedLessons}
        onCompleteLesson={(lessonId) => {
          if (!currentUser.completedLessons.includes(lessonId)) {
            setCurrentUser({ ...currentUser, completedLessons: [...currentUser.completedLessons, lessonId] });
          }
        }}
        onBack={() => { setView('dashboard'); setSelectedCourseId(null); }}
        allCourses={courses}
      />
    );
  }

  // About page
  if (view === 'about') {
    return <AboutPage onBack={() => setView('home')} />;
  }

  // Landing Tienda - accessible via /tienda-digital
  React.useEffect(() => {
    if (window.location.pathname === '/tienda-digital') {
      setView('landing-tienda');
    }
  }, []);

  // Landing Tienda
  if (view === 'landing-tienda') {
    return <LandingTienda />;
  }

  // Dashboard view (logged in)
  if (view === 'dashboard' && currentUser) {
    return (
      <StudentDashboard
        user={currentUser}
        courses={courses}
        onSelectCourse={(courseId) => { setSelectedCourseId(courseId); setView('player'); }}
        onLogout={() => { setCurrentUser(null); setView('home'); setSelectedCourseId(null); }}
        onUpdateName={(name) => { setCurrentUser({ ...currentUser, name }); }}
      />
    );
  }

  // Detail view (no login required)
  if (view === 'detail' && selectedCourse) {
    return (
      <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
        <Header
          currentUser={currentUser}
          onLogin={() => setIsAuthOpen(true)}
          onLogout={() => { setCurrentUser(null); setView('home'); setSelectedCourseId(null); }}
          onAdminPanel={() => setIsAdminOpen(true)}
          onHome={() => { setView('home'); setSelectedCourseId(null); }}
        />
        <CourseDetail
          course={selectedCourse}
          currentUser={currentUser}
          allCourses={courses}
          onBack={() => { setView('home'); setSelectedCourseId(null); }}
          onCheckout={(course) => { setCheckoutCourse(course); setIsCheckoutOpen(true); }}
          onAccess={(courseId) => {
            if (currentUser) {
              setSelectedCourseId(courseId);
              setView('player');
            } else {
              setIsAuthOpen(true);
            }
          }}
        />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={(user) => {
          const userWithCourse: User = {
            ...user,
            purchasedCourses: ['catalogos-sheets'],
          };
          setCurrentUser(userWithCourse);
          setView('dashboard');
        }} />
        <CheckoutModal
          isOpen={isCheckoutOpen}
          course={checkoutCourse}
          onClose={() => { setIsCheckoutOpen(false); setCheckoutCourse(null); }}
          onSuccess={(courseId) => {
            if (checkoutCourse) {
              const newUser: User = {
                id: 'usr-' + Date.now(),
                name: 'Estudiante',
                email: '',
                role: 'student',
                completedLessons: [],
                purchasedCourses: [courseId],
              };
              setCurrentUser(newUser);
              setView('dashboard');
            }
          }}
        />
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          courses={courses}
          onCreateCourse={(course) => setCourses([...courses, course])}
          onDeleteCourse={(courseId) => setCourses(courses.filter((c) => c.id !== courseId))}
        />
      </div>
    );
  }

  // Home view
  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div style={{ background: '#4c1d95', color: 'white', fontSize: 12, fontWeight: 600, padding: '10px 16px', textAlign: 'center' }}>
        ✨ CONLOSRODRIGUEZ • Únete a la comunidad:{' '}
        <a href="https://instagram.com/conlosrodriguez" target="_blank" rel="noreferrer" style={{ fontWeight: 700, textDecoration: 'underline', color: '#fde047' }}>
          @conlosrodriguez
        </a>
      </div>

      <Header
        currentUser={currentUser}
        onLogin={() => {
          if (currentUser) {
            setView('dashboard');
          } else {
            setIsAuthOpen(true);
          }
        }}
        onLogout={() => { setCurrentUser(null); }}
        onAdminPanel={() => setIsAdminOpen(true)}
        onHome={() => {}}
        onAbout={() => { setView('about'); }}
      />

      <HeroSection />

      <CourseGrid
        courses={courses}
        onViewDetail={(courseId) => { setSelectedCourseId(courseId); setView('detail'); }}
        onViewLanding={(courseId) => { setSelectedCourseId(courseId); setView('landing-tienda'); }}
      />

      <Methodology />

      <footer style={{ background: '#111827', color: 'white' }}>
        <div className="container" style={{ padding: '48px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <img src="./logo-blue.png" alt="CONLOSRODRIGUEZ" style={{ width: 120, height: 'auto' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13 }}>
              <a href="https://instagram.com/conlosrodriguez" target="_blank" rel="noreferrer" style={{ color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}>
                📷 Instagram
              </a>
              <a href="mailto:conlosrodriguez@gmail.com" style={{ color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}>
                ✉️ Soporte
              </a>
            </div>
            <div style={{ maxWidth: 400, textAlign: 'center', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic', lineHeight: 1.6 }}>
                "El corazón del inteligente busca el conocimiento; los ojos del insensato vagan por la tierra." — Proverbios 18:15
              </p>
            </div>
            <div style={{ borderTop: '1px solid #1f2937', paddingTop: 16, width: '100%', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#4b5563' }}>© 2026 CONLOSRODRIGUEZ. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={(user) => {
        // Auto-asignar el curso de Google Sheets a todos los usuarios
        const userWithCourse: User = {
          ...user,
          purchasedCourses: ['catalogos-sheets'],
        };
        setCurrentUser(userWithCourse);
        setView('dashboard');
      }} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        course={checkoutCourse}
        onClose={() => { setIsCheckoutOpen(false); setCheckoutCourse(null); }}
        onSuccess={(courseId) => {
          if (checkoutCourse) {
            const newUser: User = {
              id: 'usr-' + Date.now(),
              name: 'Estudiante',
              email: '',
              role: 'student',
              completedLessons: [],
              purchasedCourses: [courseId],
            };
            setCurrentUser(newUser);
            setView('dashboard');
          }
        }}
      />
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        courses={courses}
        onCreateCourse={(course) => setCourses([...courses, course])}
        onDeleteCourse={(courseId) => setCourses(courses.filter((c) => c.id !== courseId))}
      />

      <WhatsAppButton />
    </div>
  );
};
