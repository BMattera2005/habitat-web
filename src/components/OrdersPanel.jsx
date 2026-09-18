import React, { useState } from 'react';
import { quickArticles } from '../data/portalData';

export function OrdersPanel({ client }) {
  const [items, setItems] = useState([
    { sku: quickArticles[0].sku, name: quickArticles[0].name, qty: 10, unitPrice: quickArticles[0].basePrice },
    { sku: quickArticles[1].sku, name: quickArticles[1].name, qty: 25, unitPrice: quickArticles[1].basePrice }
  ]);
  const [selectedSku, setSelectedSku] = useState(quickArticles[2].sku);
  const [orderMode, setOrderMode] = useState('manual');
  const [orderStatus, setOrderStatus] = useState(null);

  const discountRate = client ? (100 - client.discountPercent) / 100 : 1;

  const handleAddItem = () => {
    const art = quickArticles.find(a => a.sku === selectedSku);
    if (!art) return;
    setItems([...items, { sku: art.sku, name: art.name, qty: 5, unitPrice: art.basePrice }]);
  };

  const calculateSubtotal = () => items.reduce((acc, curr) => acc + (curr.unitPrice * curr.qty), 0);
  const total = calculateSubtotal() * discountRate;

  const handleSendOrder = () => {
    setOrderStatus('processing');
    setTimeout(() => {
      setOrderStatus('success');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Selector de Método 3.1 vs 3.2 */}
      <div style={{
        display: 'flex',
        gap: '12px',
        backgroundColor: 'var(--bg-surface)',
        padding: '6px',
        borderRadius: '10px',
        border: '1px solid var(--border-dim)',
        width: 'fit-content'
      }}>
        <button
          onClick={() => setOrderMode('manual')}
          style={{
            padding: '8px 18px',
            borderRadius: '6px',
            backgroundColor: orderMode === 'manual' ? 'var(--bg-card)' : 'transparent',
            color: orderMode === 'manual' ? 'var(--accent-cyan)' : 'var(--text-muted)',
            fontWeight: '700',
            fontSize: '13px'
          }}
        >
          3.1 Carga Manual de Pedidos
        </button>
        <button
          onClick={() => setOrderMode('api')}
          style={{
            padding: '8px 18px',
            borderRadius: '6px',
            backgroundColor: orderMode === 'api' ? 'var(--bg-card)' : 'transparent',
            color: orderMode === 'api' ? 'var(--accent-green)' : 'var(--text-muted)',
            fontWeight: '700',
            fontSize: '13px'
          }}
        >
          3.2 Interfase Automática (ERP Salteña)
        </button>
      </div>

      {orderMode === 'api' ? (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-dim)',
          borderRadius: '12px',
          padding: '32px'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Integración de Pedidos por Webhook / API</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
            Este módulo conecta con el software de gestión o ERP de Salteña mediante JSON para transmitir pedidos de manera desatendida.
          </p>
          <div className="mono" style={{
            backgroundColor: 'var(--bg-deep)',
            border: '1px solid var(--border-dim)',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--accent-cyan)'
          }}>
            ENDPOINT: https://api.saltena.com/v1/orders/ingest<br />
            AUTH_HEADER: Bearer capitana_live_token_77a9<br />
            STATUS: Interfase en espera de órdenes confirmadas.
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-dim)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Armado de Nota de Pedido</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                Seleccione artículos para enviar la solicitud directa al depósito de Salteña.
              </p>
            </div>
            {client && (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--accent-green)', fontWeight: '700' }}>
                  Bonificación cuenta activa: {client.discountPercent}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Selector de nuevo artículo */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              style={{
                flex: 1,
                minWidth: '280px',
                padding: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-dim)',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            >
              {quickArticles.map(art => (
                <option key={art.sku} value={art.sku}>
                  [{art.sku}] {art.name} - Base: ${art.basePrice.toLocaleString('es-AR')}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddItem}
              style={{
                padding: '12px 20px',
                backgroundColor: 'rgba(0, 210, 255, 0.1)',
                border: '1px solid var(--accent-cyan)',
                color: 'var(--accent-cyan)',
                fontWeight: '700',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            >
              + Agregar al Pedido
            </button>
          </div>

          {/* Tabla de Artículos */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-dim)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '12px' }}>
                <th style={{ padding: '12px' }}>SKU</th>
                <th style={{ padding: '12px' }}>DESCRIPCIÓN</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>CANTIDAD</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>P. UNITARIO</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '13px' }}>
                  <td className="mono" style={{ padding: '12px', color: 'var(--accent-cyan)' }}>{it.sku}</td>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{it.name}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{it.qty} u.</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>${(it.unitPrice * discountRate).toLocaleString('es-AR')}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700' }}>
                    ${(it.unitPrice * it.qty * discountRate).toLocaleString('es-AR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Resumen Final */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-dim)', paddingTop: '20px' }}>
            <div style={{ minWidth: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>Subtotal Lista:</span>
                <span>${calculateSubtotal().toLocaleString('es-AR')}</span>
              </div>
              {client && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--accent-green)' }}>
                  <span>Descuento ({client.discountPercent}%):</span>
                  <span>- ${(calculateSubtotal() * (client.discountPercent / 100)).toLocaleString('es-AR')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', marginTop: '12px' }}>
                <span>Total Estimado:</span>
                <span style={{ color: 'var(--accent-cyan)' }}>${total.toLocaleString('es-AR')}</span>
              </div>

              <button
                onClick={handleSendOrder}
                disabled={orderStatus === 'processing'}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '14px',
                  background: 'var(--gradient-capitana)',
                  color: '#05070a',
                  fontWeight: '800',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                {orderStatus === 'processing' ? 'Procesando...' : orderStatus === 'success' ? '✓ Pedido Enviado a Salteña' : 'Confirmar y Enviar Pedido'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}