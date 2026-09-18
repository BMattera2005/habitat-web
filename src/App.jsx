import React, { useState } from 'react';
import { companyProfile, priceLists, catalogItems } from './data/portalData';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { OrdersPanel } from './components/OrdersPanel';
import { LoginModal } from './components/LoginModal';
import logoImg from './assets/Logo.estilo.jpeg';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [client, setClient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro para Catálogo
  const filteredCatalog = catalogItems.filter(item => {
    const matchesCat = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ['Todas', 'Seguridad Laboral', 'Maquinaria', 'Fijaciones', 'Obras Civiles'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-deep)' }}>
      
      {/* NAVBAR SUPERIOR ELEGANTE */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(7, 9, 14, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-dim)',
        padding: '0 32px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px' }}>
          
          {/* Logo & Marca */}
          <div 
            onClick={() => setActiveTab('inicio')}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
          >
            <img 
              src={logoImg} 
              alt="Estilo Capitana" 
              style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.8px', color: '#fff' }}>
                ESTILO CAPITANA
              </div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: '700' }}>
                DISTRIBUIDOR OFICIAL SALTEÑA
              </div>
            </div>
          </div>

          {/* Navegación por Solapas */}
          <nav style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'catalogo', label: 'Catálogo & Listas' },
              { id: 'nosotros', label: 'Quiénes Somos' },
              { id: 'contacto', label: 'Contacto' },
              { id: 'pedidos', label: 'Carga de Pedidos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: activeTab === tab.id ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  border: activeTab === tab.id ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid transparent'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Acceso Clientes */}
          <div>
            {client ? (
              <button
                onClick={() => setClient(null)}
                style={{
                  backgroundColor: 'rgba(0, 230, 118, 0.1)',
                  border: '1px solid var(--accent-green)',
                  color: 'var(--accent-green)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}
              >
                {client.name.split(' ')[0]} ({client.discountPercent}% OFF) • Salir
              </button>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                style={{
                  background: 'var(--gradient-brand)',
                  color: '#07090e',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '800'
                }}
              >
                Ingreso Clientes
              </button>
            )}
          </div>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL SEGÚN SOLAPA SELECCIONADA */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '48px 32px' }}>
        
        {/* SOLAPA 1: INICIO */}
        {activeTab === 'inicio' && (
          <div>
            {/* HERO SECTION */}
            <section style={{ textAlign: 'center', padding: '40px 0 60px' }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '30px',
                backgroundColor: 'rgba(0, 210, 255, 0.08)',
                border: '1px solid rgba(0, 210, 255, 0.3)',
                color: 'var(--accent-cyan)',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                ✦ Catálogos y Despacho Mayorista de Salteña
              </div>

              <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1.15', maxWidth: '850px', margin: '0 auto 20px' }}>
                Abastecimiento industrial directo, trazable y sin intermediarios.
              </h1>

              <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: '1.6' }}>
                Portal exclusivo de Estilo Capitana para clientes y corralones. Descargá listas actualizadas, consultá especificaciones técnicas y gestioná tus pedidos comerciales.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                <button
                  onClick={() => setActiveTab('catalogo')}
                  style={{
                    padding: '14px 28px',
                    background: 'var(--gradient-brand)',
                    color: '#07090e',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '14px'
                  }}
                >
                  Explorar Catálogos y Precios
                </button>
                <button
                  onClick={() => setActiveTab('contacto')}
                  style={{
                    padding: '14px 28px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-dim)',
                    color: '#fff',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Atención Comercial
                </button>
              </div>
            </section>

            {/* BARRA DE ESTADÍSTICAS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-dim)',
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '60px'
            }}>
              {companyProfile.stats.map((st, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{st.label}</div>
                </div>
              ))}
            </div>

            {/* SECCIÓN PREVIA DE ARTÍCULOS DESTACADOS */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Líneas de Producto Salteña</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Fichas y suministros de alta rotación en obra.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('catalogo')} 
                  style={{ background: 'transparent', color: 'var(--accent-cyan)', fontSize: '13px', fontWeight: '700' }}
                >
                  Ver todo el catálogo →
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {catalogItems.slice(0, 3).map(item => (
                  <div key={item.id} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    <div style={{ padding: '20px' }}>
                      <div className="mono" style={{ fontSize: '10px', color: 'var(--accent-cyan)', marginBottom: '6px' }}>{item.category}</div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>{item.name}</h3>
                      <button
                        onClick={() => setActiveTab('catalogo')}
                        style={{ width: '100%', padding: '10px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-dim)', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}
                      >
                        Ver Ficha Técnica
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SOLAPA 2: CATÁLOGO Y LISTAS */}
        {activeTab === 'catalogo' && (
          <div>
            {/* LISTAS DE PRECIOS OFICIALES */}
            <section style={{ marginBottom: '56px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Listas de Precios Mayoristas</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Archivos oficiales actualizados para presupuestación.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
                {priceLists.map(pl => (
                  <div key={pl.id} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '12px',
                    padding: '22px',
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
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>{pl.rubro}</div>
                    </div>

                    <a
                      href={pl.downloadUrl}
                      onClick={(e) => { e.preventDefault(); alert(`Descargando ${pl.title}`); }}
                      style={{
                        padding: '10px',
                        backgroundColor: 'rgba(0, 210, 255, 0.08)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        color: 'var(--accent-cyan)',
                        borderRadius: '6px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      Descargar PDF Oficial ↓
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* GRILLA DE CATÁLOGOS CON FILTROS */}
            <section>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Catálogo Digital de Insumos Salteña</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Explorá fichas técnicas, tolerancias y disponibilidad.</p>
              </div>

              {/* Filtros */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Buscar por artículo o especificación..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    width: '320px',
                    padding: '11px 16px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: selectedCategory === cat ? 'var(--accent-cyan)' : 'var(--bg-card)',
                        color: selectedCategory === cat ? '#07090e' : 'var(--text-muted)',
                        border: '1px solid var(--border-dim)'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tarjetas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {filteredCatalog.map(item => (
                  <div key={item.id} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
                      <div style={{ padding: '20px' }}>
                        <div className="mono" style={{ fontSize: '10px', color: 'var(--accent-cyan)', marginBottom: '4px' }}>{item.category}</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{item.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>{item.desc}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border-dim)', paddingTop: '12px' }}>
                          {item.specs.map((sp, idx) => (
                            <div key={idx} style={{ fontSize: '11px', color: 'var(--accent-green)' }}>
                              ✓ {sp}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '0 20px 20px' }}>
                      <button
                        onClick={() => { setActiveTab('pedidos'); }}
                        style={{
                          width: '100%',
                          padding: '11px',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border-dim)',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}
                      >
                        Cotizar / Agregar a Pedido →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SOLAPA 3: QUIÉNES SOMOS */}
        {activeTab === 'nosotros' && (
          <AboutSection 
            onNavigateToCatalog={() => setActiveTab('catalogo')}
            onNavigateToContact={() => setActiveTab('contacto')}
          />
        )}

        {/* SOLAPA 4: CONTACTO */}
        {activeTab === 'contacto' && (
          <ContactSection />
        )}

        {/* SOLAPA 5: PEDIDOS (ERP SALTEÑA) */}
        {activeTab === 'pedidos' && (
          <OrdersPanel client={client} />
        )}

      </main>

      {/* FOOTER CORPORATIVO */}
      <footer style={{
        borderTop: '1px solid var(--border-dim)',
        padding: '36px 32px',
        backgroundColor: 'var(--bg-surface)',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '14px', color: '#fff' }}>Estilo Capitana • Distribución Mayorista</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Catálogos oficiales Salteña. Todos los derechos reservados.</div>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('inicio')}>Inicio</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('catalogo')}>Catálogo</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('nosotros')}>Nosotros</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('contacto')}>Contacto</span>
          </div>
        </div>
      </footer>

      {/* MODAL DE LOGIN (DESCUENTOS B2B) */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(authClient) => setClient(authClient)}
      />

    </div>
  );
}