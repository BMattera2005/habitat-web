import React, { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', empresa: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/5491100000000?text=${encodeURIComponent("Hola Estilo Capitana! Vengo del sitio web y quiero solicitar información comercial.")}`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
      
      {/* Columna Izquierda: Información de Contacto */}
      <div>
        <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: '700', marginBottom: '8px' }}>
          CANALES OFICIALES
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Hablemos de tu próximo pedido</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
          Atendemos consultas de empresas constructoras, corralones y talleres de todo el país. Contactanos por WhatsApp o completá el formulario.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ fontSize: '20px' }}>📍</div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Depósito Central</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Parque Industrial - Distribución Salteña</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ fontSize: '20px' }}>✉️</div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email Comercial</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>ventas@estilocapitana.com</div>
            </div>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#25D366',
            color: '#07090e',
            padding: '14px 24px',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '14px'
          }}
        >
          <span>📲</span> Chatear por WhatsApp Directo
        </a>
      </div>

      {/* Columna Derecha: Formulario de Mensaje */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-dim)',
        borderRadius: '16px',
        padding: '32px'
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '14px' }}>✓</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Consulta Registrada</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
              Un ejecutivo comercial de Estilo Capitana se comunicará con tu empresa en breve.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', empresa: '', email: '', message: '' }); }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            >
              Enviar otra consulta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>Envianos un mensaje</h3>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Nombre y Apellido</label>
              <input
                required
                type="text"
                placeholder="Ej. Martín Gómez"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-dim)', borderRadius: '8px', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Empresa / CUIT</label>
              <input
                required
                type="text"
                placeholder="Ej. Corralón del Este S.A."
                value={formData.empresa}
                onChange={e => setFormData({ ...formData, empresa: e.target.value })}
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-dim)', borderRadius: '8px', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Correo Electrónico</label>
              <input
                required
                type="email"
                placeholder="ejemplo@empresa.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-dim)', borderRadius: '8px', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Consulta / Lote requerido</label>
              <textarea
                required
                rows="4"
                placeholder="Detallá los productos de Salteña que estás buscando o volúmenes aproximados..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-dim)', borderRadius: '8px', fontSize: '13px', resize: 'none' }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                background: 'var(--gradient-brand)',
                color: '#07090e',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '14px'
              }}
            >
              Enviar Mensaje
            </button>
          </form>
        )}
      </div>

    </div>
  );
}