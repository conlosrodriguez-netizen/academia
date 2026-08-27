import React, { useState, useEffect, useCallback } from 'react';
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

type ViewState = 'home' | 'detail' | 'dashboard' | 'player' | 'about' | 'landing-tienda';

const getViewFromURL = (): ViewState => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  if (path === '/tienda-digital') return 'landing-tienda';
  if (path === '/conocenos') return 'about';
  return 'home';
};

export const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setViewState] = useState<ViewState>(getViewFromURL);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  // Navigation helper that saves to browser history
  const navigate = useCallback((newView: ViewState, courseId?: string) => {
    setViewState(newView);
    if (courseId) setSelectedCourseId(courseId);

    // Scroll to top
    window.scrollTo(0, 0);

    // Save to browser history
    let path = '/';
    if (newView === 'landing-tienda') path = '/tienda-digital';
    else if (newView === 'about') path = '/conocenos';
    else if (newView === 'detail' && courseId) path = '/curso/' + courseId;
    else if (newView === 'player') path = '/curso/' + courseId + '/clase';
    else if (newView === 'dashboard') path = '/mi-cuenta';

    window.history.pushState({ view: newView, courseId }, '', path);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state?.view) {
        setViewState(state.view);
        if (state.courseId) setSelectedCourseId(state.courseId);
      } else {
        setViewState(getViewFromURL());
        setSelectedCourseId(null);
      }
      // Scroll to top when navigating back/forward
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    window.history.replaceState({ view: getViewFromURL() }, '', window.location.pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
        onBack={() => navigate('dashboard')}
        allCourses={courses}
      />
    );
  }

  // About page
  if (view === 'about') {
    return <AboutPage onBack={() => navigate('home')} />;
  }

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
        onSelectCourse={(courseId) => navigate('player', courseId)}
        onLogout={() => { setCurrentUser(null); navigate('home'); }}
        onUpdateName={(name) => { setCurrentUser({ ...currentUser, name }); }}
      />
    );
  }

  // Detail view
  if (view === 'detail' && selectedCourse) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <Header
          currentUser={currentUser}
          onLogin={() => setIsAuthOpen(true)}
          onLogout={() => { setCurrentUser(null); navigate('home'); }}
          onAdminPanel={() => setIsAdminOpen(true)}
          onHome={() => navigate('home')}
          onAbout={() => navigate('about')}
        />
        <CourseDetail
          course={selectedCourse}
          currentUser={currentUser}
          allCourses={courses}
          onBack={() => navigate('home')}
          onCheckout={(course) => { setCheckoutCourse(course); setIsCheckoutOpen(true); }}
          onAccess={(courseId) => {
            if (currentUser) {
              navigate('player', courseId);
            } else {
              setIsAuthOpen(true);
            }
          }}
        />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={(user) => setCurrentUser(user)} />
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
              navigate('dashboard');
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
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: 'linear-gradient(90deg, #4c1d95, #6d28d9)', color: 'white', fontSize: 12, fontWeight: 600, padding: '10px 16px', textAlign: 'center' }}>
        ✨ CONLOSRODRIGUEZ • Únete a la comunidad:{' '}
        <a href="https://instagram.com/conlosrodriguez" target="_blank" rel="noreferrer" style={{ fontWeight: 700, textDecoration: 'underline', color: '#fde047' }}>
          @conlosrodriguez
        </a>
      </div>

      <Header
        currentUser={currentUser}
        onLogin={() => {
          if (currentUser) {
            navigate('dashboard');
          } else {
            setIsAuthOpen(true);
          }
        }}
        onLogout={() => { setCurrentUser(null); }}
        onAdminPanel={() => setIsAdminOpen(true)}
        onHome={() => {}}
        onAbout={() => navigate('about')}
      />

      <HeroSection />

      <Methodology />

      <CourseGrid
        courses={courses}
        onViewDetail={(courseId) => navigate('detail', courseId)}
        onViewLanding={() => navigate('landing-tienda')}
      />

      <footer style={{ background: '#111827', color: 'white' }}>
        <div className="container" style={{ padding: '48px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <img src="./logo-blue.png" alt="CONLOSRODRIGUEZ" style={{ width: 120, height: 'auto' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13 }}>
              <a href="https://instagram.com/conlosrodriguez" target="_blank" rel="noreferrer" style={{ color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>📷 Instagram</a>
              <a href="mailto:conlosrodriguez@gmail.com" style={{ color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>✉️ Soporte</a>
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
        const userWithCourse: User = { ...user, purchasedCourses: ['catalogos-sheets'] };
        setCurrentUser(userWithCourse);
        navigate('dashboard');
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
            navigate('dashboard');
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
