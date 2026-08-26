import React, { useRef } from 'react';
import type { Course } from '../data';
import { Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ORANGE = '#F59B20';

interface CertificateProps {
  course: Course;
  studentName: string;
  completionDate: string;
  onClose: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ course, studentName, completionDate, onClose }) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Constancia_${studentName.replace(/\s/g, '_')}_${course.title.replace(/\s/g, '_')}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: 16 }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: 700, background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Tu Constancia</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 10, background: ORANGE, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
              <Download style={{ width: 14, height: 14 }} /> Descargar PDF
            </button>
            <button onClick={onClose} style={{ padding: 8, background: '#f3f4f6', border: 'none', borderRadius: 8, color: '#6b7280', cursor: 'pointer' }}>
              <X style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div style={{ padding: 24 }}>
          <div ref={certRef} style={{
            width: '100%',
            aspectRatio: '1.414/1',
            background: 'white',
            border: '3px solid #f59e0b',
            borderRadius: 8,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative corners */}
            <div style={{ position: 'absolute', top: 12, left: 12, width: 40, height: 40, borderTop: '3px solid #f59e0b', borderLeft: '3px solid #f59e0b' }} />
            <div style={{ position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderTop: '3px solid #f59e0b', borderRight: '3px solid #f59e0b' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 12, width: 40, height: 40, borderBottom: '3px solid #f59e0b', borderLeft: '3px solid #f59e0b' }} />
            <div style={{ position: 'absolute', bottom: 12, right: 12, width: 40, height: 40, borderBottom: '3px solid #f59e0b', borderRight: '3px solid #f59e0b' }} />

            {/* Logo */}
            <img src="./logo.png" alt="CONLOSRODRIGUEZ" style={{ width: 140, height: 'auto', marginBottom: 12 }} />

            {/* Title */}
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: 4 }}>Constancia de Finalización</div>
            <div style={{ width: 60, height: 2, background: '#f59e0b', marginBottom: 20 }} />

            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Se certifica que</p>

            {/* Student name */}
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', marginBottom: 8, lineHeight: 1.2 }}>
              {studentName}
            </div>

            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>ha completado satisfactoriamente el curso</p>

            {/* Course name */}
            <div style={{ fontSize: 18, fontWeight: 700, color: ORANGE, marginBottom: 4 }}>
              "{course.title}"
            </div>

            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>
              con una duración de {course.duration} y {course.masterclassCount} masterclass
            </p>

            {/* Date */}
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 20 }}>
              Fecha de finalización: {completionDate}
            </div>

            {/* Signature */}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 32, color: '#111827', marginBottom: 2, lineHeight: 1, transform: 'rotate(-2deg)' }}>
                Sol Cardozo
              </div>
              <div style={{ width: 160, borderBottom: '1px solid #d1d5db', margin: '0 auto 4px' }} />
              <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Ing. Sol Cardozo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
