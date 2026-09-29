import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 380,
      width: '100%'
    }}>
      {toasts.map(t => (
        <div
          key={t.id}
          className="animate-fade-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '0.85rem 1.15rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: t.type === 'error' ? '#fef2f2' : t.type === 'info' ? '#eff6ff' : '#0f172a',
            color: t.type === 'error' ? '#991b1b' : t.type === 'info' ? '#1e40af' : '#ffffff',
            boxShadow: 'var(--shadow-xl)',
            border: t.type === 'error' ? '1px solid #fecaca' : t.type === 'info' ? '1px solid #bfdbfe' : '1px solid #334155',
            fontSize: '0.88rem',
            fontWeight: 600
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {t.type === 'error' ? (
              <AlertCircle size={18} color="#ef4444" />
            ) : t.type === 'info' ? (
              <Info size={18} color="#3b82f6" />
            ) : (
              <CheckCircle2 size={18} color="#34d399" />
            )}
            <span>{t.message}</span>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              opacity: 0.8,
              padding: 2
            }}
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};
