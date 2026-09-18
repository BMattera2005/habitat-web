import React, { useState } from 'react';

export function ProductDetail({ product, onBack }) {
  const [quantity, setQuantity] = useState(1);
  const numeroWhatsApp = "5491100000000"; // Número oficial de Habitat

  const handleOrderWhatsApp = () => {
    const texto = `Hola Habitat! Quiero solicitar el siguiente pedido:\n\n` +
                  `📦 Producto: ${product.name}\n` +
                  `🏷️ Categoría: ${product.category}\n` +
                  `🔢 Cantidad: ${quantity} unidad(es)\n\n` +
                  `¿Tienen disponibilidad para coordinar la entrega o cotización?`;
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
      {/* Botón Volver */}
      <button 
        onClick={onBack}
        style={{
          background: 'transparent',
          color: 'var(--accent)',
          fontSize: '14px',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '24px'
        }}
      >
        ← Volver al catálogo
      </button>

      {/* Tarjeta Contenedora Principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '32px',
        backdropFilter: 'blur(16px)'
      }}>
        
        {/* Columna Izquierda: Imagen Grande */}
        <div>
          <div style={{
            width: '100%',
            height: '420px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            backgroundColor: '#0d0e12',
            position: 'relative'
          }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(8, 9, 12, 0.9)',
                border: '1px solid var(--border-accent)',
                color: 'var(--accent)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Columna Derecha: Información y Acción de Compra */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {product.category}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>• Importación Oficial</span>
            </div>

            <h1 style={{ fontSize: '30px', fontWeight: '900', lineHeight: '1.2', marginBottom: '16px', color: '#fff' }}>
              {product.name}
            </h1>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
              <span>●</span> Stock físico verificado para despacho
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
              {product.description}
            </p>

            {/* Garantías de confianza estilo Mercado Libre */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '18px 0',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🛡️</span>
                <span><strong>Garantía Habitat:</strong> Cobertura por desperfectos de origen.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🚚</span>
                <span><strong>Envíos:</strong> Retiro en depósito o despacho nacional vía expreso.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)', fontSize: '16px' }}>📄</span>
                <span><strong>Facturación:</strong> Emitimos comprobantes A y B.</span>
              </div>
            </div>
          </div>

          {/* Selector de Cantidad y Botón de Pedido */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>Cantidad:</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', padding: '8px 14px', fontSize: '16px', fontWeight: 'bold' }}
                >
                  -
                </button>
                <span style={{ padding: '8px 18px', fontWeight: '700', fontSize: '15px', color: '#fff' }}>
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', padding: '8px 14px', fontSize: '16px', fontWeight: 'bold' }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleOrderWhatsApp}
              style={{
                width: '100%',
                backgroundColor: 'var(--accent)',
                color: '#08090c',
                padding: '16px',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px var(--accent-glow)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Pedir {quantity} unidad(es) vía WhatsApp 📲
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}