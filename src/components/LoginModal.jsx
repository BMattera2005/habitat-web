import React, { useState } from 'react';

export function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [cuit, setCuit] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cuit || !password) {
      setError('Por favor complete todos los datos.');
      return;
    }

    // Perfiles simulados con niveles de descuento B2B
    let discount = 15;
    let clientName = 'Distribuidora del Norte S.A.';
    
    if (cuit.startsWith('30')) {
      discount = 25;
      clientName = 'Corralón Central S.R.L.';
    }

    onLoginSuccess({
      name: clientName,
      cuit: cuit,
      discountPercent: discount
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 6, 8, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-active)',
        borderRadius: '16px',
        padding: '36px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-cyan)' }}>ACCESO RESTRINGIDO B2B</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Portal de Clientes</h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '22px' }}
          >
            ×
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '24px' }}>
          Identifíquese con su número de CUIT para visualizar sus listas de precios con descuento convenido.
        </p>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>CUIT de la Empresa</label>
            <input 
              type="text" 
              placeholder="30-XXXXXXXX-X"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-dim)',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Contraseña Corporativa</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-dim)',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '8px',
              padding: '14px',
              background: 'var(--gradient-capitana)',
              color: '#05070a',
              fontWeight: '800',
              fontSize: '14px',
              borderRadius: '8px'
            }}
          >
            Verificar Cuenta & Precios
          </button>
        </form>
      </div>
    </div>
  );
}