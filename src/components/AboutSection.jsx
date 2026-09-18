import React from 'react';
import { companyProfile } from '../data/portalData';

export function AboutSection({ onNavigateToCatalog, onNavigateToContact }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Encabezado */}
      <div style={{ maxWidth: '820px' }}>
        <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: '700', marginBottom: '8px' }}>
          SOLIDEZ & EXPERIENCIA
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px' }}>
          Abasteciendo el motor productivo junto a Salteña
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6' }}>
          En <strong>Estilo Capitana</strong> articulamos soluciones logísticas para industrias, corralones y obras de gran envergadura. Centralizamos los catálogos y listas oficiales de Salteña para que cada empresa adquiera insumos con previsibilidad y precio mayorista.
        </p>
      </div>

      {/* Tarjetas de Pilares */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {companyProfile.values.map((val, idx) => (
          <div key={idx} style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-dim)',
            borderRadius: '12px',
            padding: '28px',
            position: 'relative'
          }}>
            <div className="mono" style={{ fontSize: '20px', color: 'var(--accent-green)', fontWeight: '800', marginBottom: '12px' }}>
              0{idx + 1}.
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '10px' }}>{val.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>{val.desc}</p>
          </div>
        ))}
      </div>

      {/* Faja de Llamado a la Acción */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-dim)',
        borderRadius: '14px',
        padding: '36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>¿Necesitás una cotización a medida para tu empresa?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Coordiná un plan de entregas periódicas con nuestro equipo técnico.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onNavigateToCatalog}
            style={{
              padding: '12px 22px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-dim)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Ver Catálogos
          </button>
          <button
            onClick={onNavigateToContact}
            style={{
              padding: '12px 22px',
              background: 'var(--gradient-brand)',
              color: '#07090e',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '13px'
            }}
          >
            Contactar Ventas
          </button>
        </div>
      </div>

    </div>
  );
}