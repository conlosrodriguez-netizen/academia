import React, { useState } from 'react';
import type { User } from '../data';
import { X, Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ORANGE = '#F59B20';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
        setLoading(false);
        return;
      }

      if (data.user) {
        // Check if user has a profile in our custom table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          name: profile?.name || data.user.email?.split('@')[0] || 'Estudiante',
          email: data.user.email || '',
          role: profile?.role || 'student',
          completedLessons: profile?.completed_lessons || [],
          purchasedCourses: profile?.purchased_courses || ['catalogos-sheets'],
        };

        onLogin(user);
        onClose();
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', borderRadius: 12, border: '1px solid #e5e7eb', background: '#f9fafb', padding: '12px 12px 12px 40px', fontSize: 13, color: '#111827', outline: 'none' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: 16 }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: 400, background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.15)', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, padding: 6, background: '#f3f4f6', border: 'none', borderRadius: 8, color: '#6b7280', cursor: 'pointer' }}>
          <X style={{ width: 18, height: 18 }} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <LogIn style={{ width: 26, height: 26, color: 'white' }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>Iniciar Sesión</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Ingresa con las credenciales que recibiste por correo</p>
        </div>

        {error && (
          <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca', fontSize: 12, color: '#dc2626' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
            <input type="email" placeholder="Tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
            <input type={showPassword ? 'text' : 'password'} placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...inputStyle, paddingRight: 40 }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
              {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
            </button>
          </div>
          <button type="submit" disabled={loading} style={{ borderRadius: 12, background: ORANGE, padding: '13px 16px', fontSize: 14, fontWeight: 700, color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(245,155,32,0.3)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Ingresando...</> : 'Ingresar'}
          </button>
        </form>

        <div style={{ marginTop: 20, padding: 14, borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
          <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', lineHeight: 1.5 }}>
            ¿No tienes cuenta? <strong style={{ color: '#111827' }}>Inscríbete en un curso</strong> y recibirás tus credenciales por correo.
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
