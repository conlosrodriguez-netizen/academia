import React from 'react';
import type { Course } from '../data';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

const ORANGE = '#F59B20';

interface CourseCardProps {
  course: Course;
  onViewDetail: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetail }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: 16,
      border: '1px solid #f3f4f6',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#e5e7eb' }}>
        <img
          src={course.image}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1), transparent)' }} />

        {/* Category */}
        <span style={{ position: 'absolute', left: 12, top: 12, borderRadius: 8, background: 'rgba(255,255,255,0.95)', padding: '4px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed' }}>
          {course.category}
        </span>

        {/* Price */}
        <span style={{ position: 'absolute', right: 12, top: 12, borderRadius: 8, background: ORANGE, padding: '5px 12px', fontSize: 14, fontWeight: 800, color: 'white', boxShadow: '0 2px 8px rgba(245,155,32,0.3)' }}>
          ${course.price} USD
        </span>

        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 14px' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>{course.subtitle}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{course.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, fontWeight: 500, color: '#6b7280' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <BookOpen style={{ width: 14, height: 14, color: '#a78bfa' }} />
            {course.masterclassCount} Masterclass
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock style={{ width: 14, height: 14, color: '#a78bfa' }} />
            {course.duration}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.description}
        </p>

        {/* Ver más button */}
        <button
          onClick={() => onViewDetail(course.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderRadius: 12,
            padding: '13px 16px',
            fontSize: 13,
            fontWeight: 700,
            background: 'white',
            color: ORANGE,
            border: `2px solid ${ORANGE}`,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = ORANGE; }}
        >
          Ver Programa del Curso <ArrowRight style={{ width: 16, height: 16 }} />
        </button>
      </div>
    </div>
  );
};
