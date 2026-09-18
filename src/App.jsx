import React, { useState } from 'react';
import { companyInfo, priceLists, saltenaCatalogs } from './data/portalData';
import { LoginModal } from './components/LoginModal';
import { OrdersPanel } from './components/OrdersPanel';
import logoImg from './assets/Logo.estilo.jpeg';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalogos');
  const [searchFilter, setSearchFilter] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [client, setClient] = useState(null);

  const filteredLists = priceLists.filter(pl => 
    pl.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    pl.family.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredCatalogs = saltenaCatalogs.filter(cat =>
    cat.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    cat.rubro.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-deep)' }}>
      
      {/* SIDEBAR LATERAL INDUSTRIAL */}
      <aside style={{
        width: '280px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-dim)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 18px',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* IDENTIDAD DE MARCA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px', paddingLeft: '6px' }}>
            <img 
              src={logoImg} 
              alt="Logo Capitana" 
              style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.6px', color: '#fff' }}>
                {companyInfo.brand}
              </div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: '700' }}>
                {companyInfo.descriptor}
              </div>
            </div>
          </div>

          {/* BOTONES DE NAVEGACIÓN */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('catalogos')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'catalogos' ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                borderLeft: activeTab === 'catalogos' ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                color: activeTab === 'catalogos' ? '#fff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'left'
              }}
            >
              📚 Catálogos y Listas
            </button>

            <button
              onClick={() => setActiveTab('pedidos')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'pedidos' ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                borderLeft: activeTab === 'pedidos' ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                color: activeTab === 'pedidos' ? '#fff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'left'
              }}
            >
              📦 Carga de Pedidos
            </button>
          </nav>
        </div>

        {/* TARJETA CUENTA CLIENTE */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-dim)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          {client ? (
            <div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: '700', marginBottom: '4px' }}>
                CLIENTE ACTIVO
              </div>
              <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px', color: '#fff' }}>{client.name}</div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>CUIT: {client.cuit}</div>
              <div style={{
                backgroundColor: 'rgba(0, 230, 118, 0.1)',
                color: 'var(--accent-green)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '10px'
              }}>
                Bonificación: {client.discountPercent}% OFF
              </div>
              <button
                onClick={() => setClient(null)}
                style={{ width: '100%', background: 'transparent', color: 'var(--text-muted)', fontSize: '12px' }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-cyan)', marginBottom: '6px' }}>ÁREA EXCLUSIVA</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '14px', lineHeight: '1.4' }}>
                Iniciá sesión para liquidar pedidos con tu lista de descuentos propia.
              </p>
              <button
                onClick={() => setIsLoginOpen(true)}
                style={{
                  width: '100%',
                  background: 'var(--gradient-capitana)',
                  color: '#05070a',
                  fontWeight: '800',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              >
                Ingreso Clientes
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main style={{ flex: 1, padding: '36px 48px', overflowY: 'auto' }}>
        
        {/* HEADER SUPERIOR */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-dim)',
          paddingBottom: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>
              Portal B2B Salteña
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
              Canal oficial de abastecimiento industrial de Estilo Capitana
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input 
              type="text"
              placeholder="Filtrar por rubro, catálogo o material..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '320px',
                padding: '10px 16px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-dim)',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            />
            {!client && (
              <button
                onClick={() => setIsLoginOpen(true)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-dim)',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                Acceder
              </button>
            )}
          </div>
        </header>

        {/* VISTAS DINÁMICAS */}
        {activeTab === 'catalogos' && (
          <div>
            {/* SECCIÓN LISTAS */}
            <section style={{ marginBottom: '44px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Listas de Precios de Distribución</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Archivos oficiales para cotización y despacho continuo.</p>
                </div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-green)' }}>
                  ACTUALIZADO: {companyInfo.systemStatus}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {filteredLists.map((pl) => (
                  <div key={pl.id} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="mono" style={{ fontSize: '11px', color: 'var(--accent-cyan)' }}>{pl.id}</span>
                        <span className="mono" style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{pl.size}</span>
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>{pl.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '16px' }}>
                        Rubro: {pl.family} • {pl.articlesCount} SKU
                      </p>
                    </div>

                    <a 
                      href={pl.pdfUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 210, 255, 0.08)',
                        border: '1px solid var(--accent-cyan)',
                        color: 'var(--accent-cyan)',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        display: 'block'
                      }}
                    >
                      Descargar Lista PDF ↓
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* SECCIÓN CATÁLOGOS SALTEÑA */}
            <section>
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Catálogos Salteña Vigentes</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Fichas de producto, tolerancias y especificaciones de fabricación.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {filteredCatalogs.map((cat) => (
                  <div key={cat.id} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                      <div>
                        <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                          {cat.rubro}
                        </div>
                        <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>{cat.title}</h4>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>{cat.skuCount}</div>
                      </div>

                      <a 
                        href={cat.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textAlign: 'center',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border-dim)',
                          color: '#fff',
                          padding: '8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'block'
                        }}
                      >
                        Visualizar Catálogo Digital →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'pedidos' && (
          <OrdersPanel client={client} />
        )}

      </main>

      {/* MODAL DE LOGIN */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(authClient) => setClient(authClient)}
      />

    </div>
  );
}