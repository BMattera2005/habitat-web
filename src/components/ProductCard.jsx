import React from 'react';

export function ProductCard({ product, onSelectProduct }) {
  return (
    <div 
      className="card-hover"
      onClick={() => onSelectProduct(product)}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '320px',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden', backgroundColor: '#0d0e12' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        {product.badge && (
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(8, 9, 12, 0.85)',
            border: '1px solid var(--border-accent)',
            color: 'var(--accent)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {product.badge}
          </span>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.category}
          </span>
          <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: '600' }}>
            ● Stock disponible
          </span>
        </div>

        <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.3' }}>
          {product.name}
        </h3>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', flexGrow: 1, marginBottom: '18px' }}>
          {product.description}
        </p>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid var(--border-accent)',
            color: 'var(--accent)',
            fontWeight: '600',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            transition: 'all 0.2s ease',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent)';
            e.currentTarget.style.color = '#08090c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
        >
          Ver Detalle y Pedir →
        </button>
      </div>
    </div>
  );
}