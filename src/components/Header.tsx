import React, { useState } from 'react';
import type { User } from '../data';
import { LogOut, PlusCircle, User as UserIcon, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onAdminPanel: () => void;
  onHome: () => void;
  onAbout?: () => void;
}

const ORANGE = '#F59B20';

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogin, onLogout, onAdminPanel, onHome, onAbout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: ORANGE, boxShadow: '0 2px 8px rgba(245,155,32,0.3)' }}>
      {/* Main bar */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        {/* Logo */}
        <button onClick={onHome} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}>
          <img src="./logo-header.png" alt="CONLOSRODRIGUEZ" style={{ height: 44, maxWidth: 180, objectFit: 'contain' }} />
        </button>

        {/* Desktop buttons */}
        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {currentUser ? (
            <>
              {currentUser.role === 'admin' && (
                <button onClick={onAdminPanel} style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)', padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
                  <PlusCircle style={{ width: 14, height: 14 }} /> Crear Curso
                </button>
              )}
              <span style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{currentUser.name}</span>
              <button onClick={onLogout} style={{ padding: 6, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: 6, cursor: 'pointer' }}>
                <LogOut style={{ width: 16, height: 16 }} />
              </button>
            </>
          ) : (
            <>
              <button onClick={onAbout} style={{ borderRadius: 8, background: 'rgba(255,255,255,0.15)', padding: '8px 14px', fontSize: 12, fontWeight: 600, color: 'white', border: 'none', cursor: 'pointer' }}>
                Conócenos
              </button>
              <button onClick={onLogin} style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8, background: 'white', padding: '8px 16px', fontSize: 12, fontWeight: 700, color: ORANGE, border: 'none', cursor: 'pointer' }}>
                <UserIcon style={{ width: 14, height: 14 }} /> Iniciar Sesión
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', padding: 8, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: 8, cursor: 'pointer' }}>
          {menuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="show-mobile" style={{ display: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', padding: '12px 16px', background: 'rgba(0,0,0,0.1)' }}>
          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'white', padding: '4px 0' }}>{currentUser.name}</span>
              {currentUser.role === 'admin' && (
                <button onClick={() => { onAdminPanel(); setMenuOpen(false); }} style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                  Crear Curso
                </button>
              )}
              <button onClick={() => { onLogout(); setMenuOpen(false); }} style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => { onAbout?.(); setMenuOpen(false); }} style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                Conócenos
              </button>
              <button onClick={() => { onLogin(); setMenuOpen(false); }} style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'white', border: 'none', color: ORANGE, fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      )}

      {/* CSS for responsive */}
      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
};
