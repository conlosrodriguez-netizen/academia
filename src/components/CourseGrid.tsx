import React from 'react';
import type { Course } from '../data';
import { CATEGORIES } from '../data';
import { CourseCard } from './CourseCard';
import { Flame, BookOpen } from 'lucide-react';

interface CourseGridProps {
  courses: Course[];
  onViewDetail: (courseId: string) => void;
  onViewLanding?: (courseId: string) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  onViewDetail,
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('Todos');

  const filteredCourses = activeCategory === 'Todos'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  const recentCourses = filteredCourses.filter((c) => c.isRecent);
  const otherCourses = filteredCourses.filter((c) => !c.isRecent);

  return (
    <main id="cursos" style={{ padding: '48px 0 64px' }}>
      <div className="container">
        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                borderRadius: 999,
                padding: '10px 20px',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.02em',
                border: activeCategory === cat ? 'none' : '1px solid #e5e7eb',
                background: activeCategory === cat ? '#7c3aed' : 'white',
                color: activeCategory === cat ? 'white' : '#6b7280',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(124,58,237,0.2)' : 'none',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recent Courses */}
        {recentCourses.length > 0 && (
          <section style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5f3ff', border: '1px solid #ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <Flame style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>Cursos Destacados</h2>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>Los más populares de la plataforma</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {recentCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onViewDetail={onViewDetail}
                  onViewLanding={course.id === 'tienda-gemini-sheets' ? () => onViewLanding?.(course.id) : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* Other Courses */}
        {otherCourses.length > 0 && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5f3ff', border: '1px solid #ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <BookOpen style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>Catálogo Completo</h2>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>Explora todos los programas disponibles</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {otherCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onViewDetail={onViewDetail}
                  onViewLanding={course.id === 'tienda-gemini-sheets' ? () => onViewLanding?.(course.id) : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af', fontSize: 14 }}>
            No hay cursos en esta categoría.
          </div>
        )}
      </div>
    </main>
  );
};
