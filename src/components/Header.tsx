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
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: ORANGE, boxShadow: '0 2px 8px rgba(245,155,32,0.3)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0, flexShrink: 0 }}>
            <img src="./logo-header.png" alt="CONLOSRODRIGUEZ" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
          </button>

          {/* Desktop right side */}
          <div className="header-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <button onClick={onAdminPanel} style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 10, border: '2px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.15)', padding: '8px 14px', fontSize: 12, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
                    <PlusCircle style={{ width: 16, height: 16 }} /> Crear Curso
                  </button>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 10, border: '2px solid rgba(255,255,255,0.3)', padding: '6px 12px', background: 'rgba(255,255,255,0.15)' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ORANGE, fontWeight: 700, fontSize: 12 }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{currentUser.name}</span>
                </div>
                <button onClick={onLogout} style={{ padding: 8, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: 8, cursor: 'pointer' }}>
                  <LogOut style={{ width: 16, height: 16 }} />
                </button>
              </>
            ) : (
              <>
                <button onClick={onAbout} style={{ borderRadius: 10, background: 'rgba(255,255,255,0.15)', padding: '10px 16px', fontSize: 12, fontWeight: 600, color: 'white', border: 'none', cursor: 'pointer' }}>
                  Conócenos
                </button>
                <button onClick={onLogin} style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 10, background: 'white', padding: '10px 20px', fontSize: 12, fontWeight: 700, color: ORANGE, border: 'none', cursor: 'pointer' }}>
                  <UserIcon style={{ width: 16, height: 16 }} /> Iniciar Sesión
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="header-mobile-btn" style={{ display: 'none', padding: 8, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: 8, cursor: 'pointer' }}>
            {menuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="header-mobile-menu" style={{ display: 'none', position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 49, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMenuOpen(false)}>
          <div style={{ background: ORANGE, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }} onClick={(e) => e.stopPropagation()}>
            {currentUser ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ORANGE, fontWeight: 700, fontSize: 14 }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{currentUser.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' }}>{currentUser.role}</div>
                  </div>
                </div>
                {currentUser.role === 'admin' && (
                  <button onClick={() => { onAdminPanel(); setMenuOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, background: 'rgba(255,255,255,0.15)', padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'white', border: 'none', cursor: 'pointer' }}>
                    <PlusCircle style={{ width: 16, height: 16 }} /> Crear Curso
                  </button>
                )}
                <button onClick={() => { onLogout(); setMenuOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, background: 'rgba(255,255,255,0.15)', padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'white', border: 'none', cursor: 'pointer' }}>
                  <LogOut style={{ width: 16, height: 16 }} /> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { onAbout?.(); setMenuOpen(false); }} style={{ width: '100%', padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'white', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, cursor: 'pointer' }}>
                  Conócenos
                </button>
                <button onClick={() => { onLogin(); setMenuOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 10, background: 'white', padding: '14px 16px', fontSize: 14, fontWeight: 700, color: ORANGE, border: 'none', cursor: 'pointer' }}>
                  <UserIcon style={{ width: 18, height: 18 }} /> Iniciar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .header-desktop { display: none !important; }
          .header-mobile-btn { display: flex !important; }
          .header-mobile-menu { display: block !important; }
        }
      `}</style>
    </>
  );
};
