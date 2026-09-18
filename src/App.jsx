import React, { useState, useMemo } from 'react';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto abierto
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todas', 'Equipamiento', 'Bazar', 'Hogar & Deco', 'Tecnología'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Manejador para abrir un producto
  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejador para volver a la lista
  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header flotante */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(8, 9, 12, 0.8)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div 
          onClick={() => { setCurrentPage('home'); setSelectedProduct(null); }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '2px', color: '#fff' }}>
            HABITAT
          </span>
          <span style={{ 
            fontSize: '10px', 
            fontWeight: '700', 
            background: 'var(--accent)', 
            color: '#08090c', 
            padding: '2px 6px', 
            borderRadius: '4px', 
            letterSpacing: '1px' 
          }}>
            IMPORT
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'home', label: 'Inicio' },
            { id: 'catalog', label: 'Catálogo' },
            { id: 'about', label: 'Empresa' },
            { id: 'contact', label: 'Contacto' },
            { id: 'bio', label: 'Social / Links' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentPage(tab.id);
                setSelectedProduct(null); // Si cambia de pestaña, cerramos el detalle
              }}
              style={{
                background: currentPage === tab.id && !selectedProduct ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                color: currentPage === tab.id && !selectedProduct ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '6px',
                border: currentPage === tab.id && !selectedProduct ? '1px solid var(--border-subtle)' : '1px solid transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Contenido Principal */}
      <main style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 24px', flexGrow: 1 }}>
        
        {/* SI HAY UN PRODUCTO SELECCIONADO, MOSTRAMOS SU VISTA DE DETALLE */}
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBack} />
        ) : (
          <>
            {/* VISTA: HOME */}
            {currentPage === 'home' && (
              <div>
                <section style={{ textAlign: 'center', padding: '60px 0 80px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '30px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--accent)',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '24px'
                  }}>
                    ✦ Soluciones integrales de abastecimiento
                  </div>

                  <h1 style={{ fontSize: '50px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1.15', marginBottom: '24px', maxWidth: '850px', margin: '0 auto 24px' }}>
                    Importación estratégica y distribución mayorista directa.
                  </h1>

                  <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: '1.6' }}>
                    Gestionamos logística aduanera, control de calidad y disponibilidad de inventario para acercar productos de alto estándar al mercado argentino.
                  </p>

                  <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                    <button 
                      onClick={() => setCurrentPage('catalog')}
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: '#08090c',
                        padding: '13px 28px',
                        fontWeight: '700',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxShadow: '0 4px 14px var(--accent-glow)'
                      }}
                    >
                      Explorar Catálogo Completo
                    </button>
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        color: '#fff',
                        padding: '13px 28px',
                        fontWeight: '600',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    >
                      Canal de Ventas
                    </button>
                  </div>
                </section>

                {/* Credenciales */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                  padding: '24px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  marginBottom: '70px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '4px' }}>📦 Stock Garantizado</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Mercadería nacionalizada lista para retiro o despacho.</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '4px' }}>⚡ Despacho Ágil</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Envíos directos a todo el país vía expresos seleccionados.</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '4px' }}>🧾 Facturación Oficial</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Emisión de Factura A y B con cumplimiento impositivo total.</p>
                  </div>
                </div>

                {/* Destacados */}
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Productos Destacados</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Hacé clic en cualquier artículo para armar tu pedido.</p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('catalog')}
                    style={{ background: 'transparent', color: 'var(--accent)', fontSize: '13px', fontWeight: '700' }}
                  >
                    Ver todos →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', justifyItems: 'center' }}>
                  {products.slice(0, 3).map((item) => (
                    <ProductCard key={item.id} product={item} onSelectProduct={handleOpenProduct} />
                  ))}
                </div>
              </div>
            )}

            {/* VISTA: CATÁLOGO */}
            {currentPage === 'catalog' && (
              <div>
                <div style={{ marginBottom: '36px' }}>
                  <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px' }}>Catálogo de Importaciones</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
                    Seleccioná un producto para ver características completas y hacer tu encargo.
                  </p>
                </div>

                {/* Controles de búsqueda y filtros */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                  <input 
                    type="text"
                    placeholder="Buscar por nombre o característica..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      maxWidth: '480px',
                      padding: '12px 18px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: selectedCategory === cat ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                          color: selectedCategory === cat ? '#08090c' : 'var(--text-muted)',
                          border: '1px solid',
                          borderColor: selectedCategory === cat ? 'var(--accent)' : 'var(--border-subtle)',
                          transition: '0.2s'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grilla de productos con clic habilitado */}
                {filteredProducts.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', justifyItems: 'center' }}>
                    {filteredProducts.map((item) => (
                      <ProductCard key={item.id} product={item} onSelectProduct={handleOpenProduct} />
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    No encontramos productos que coincidan con tu búsqueda.
                  </div>
                )}
              </div>
            )}

            {/* VISTA: SOBRE HABITAT */}
            {currentPage === 'about' && (
              <div style={{ maxWidth: '780px', margin: '40px auto' }}>
                <span style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Nuestra Trayectoria
                </span>
                <h1 style={{ fontSize: '36px', fontWeight: '900', margin: '12px 0 24px', letterSpacing: '-0.5px' }}>
                  Eficiencia logística para un mercado dinámico.
                </h1>
                <div style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: '12px', 
                  padding: '36px', 
                  lineHeight: '1.8', 
                  color: 'var(--text-muted)',
                  fontSize: '16px'
                }}>
                  <p style={{ marginBottom: '16px' }}>
                    <strong style={{ color: '#fff' }}>Habitat</strong> se fundó con una meta concreta: resolver la brecha entre los fabricantes más innovadores del exterior y las demandas de consumo del mercado nacional.
                  </p>
                  <p>
                    Entendemos que el valor de una importadora no reside únicamente en traer un producto, sino en asegurar la cadena completa: desde el control de calidad en origen y el despacho legal hasta la garantía posventa.
                  </p>
                </div>
              </div>
            )}

            {/* VISTA: CONTACTO */}
            {currentPage === 'contact' && (
              <div style={{ maxWidth: '600px', margin: '40px auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '32px', fontWeight: '900' }}>Iniciá tu Consulta</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
                    Respondemos consultas comerciales y cotizaciones por mayor en el día.
                  </p>
                </div>

                <form 
                  onSubmit={(e) => e.preventDefault()}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px'
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Nombre / Razón Social</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Distribuidora Norte o Juan Pérez"
                      style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>WhatsApp o Correo</label>
                    <input 
                      type="text" 
                      placeholder="Ej: +54 9 11... o contacto@mail.com"
                      style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Consulta / Pedido</label>
                    <textarea 
                      rows="4" 
                      placeholder="Especificá qué productos o volumen te interesan..."
                      style={{ width: '100%', padding: '12px', backgroundColor: '#090a0f', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', resize: 'none' }}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#08090c',
                      padding: '14px',
                      fontWeight: '700',
                      borderRadius: '6px',
                      marginTop: '10px'
                    }}
                  >
                    Enviar Mensaje Comercial
                  </button>
                </form>
              </div>
            )}

            {/* VISTA: REDES */}
            {currentPage === 'bio' && (
              <div style={{ maxWidth: '420px', margin: '30px auto', textAlign: 'center' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  border: '2px solid var(--accent)',
                  boxShadow: '0 0 25px var(--accent-glow)',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  fontWeight: '900'
                }}>
                  H
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Habitat Importaciones</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '6px 0 28px' }}>
                  Abastecimiento internacional y distribución directa.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <button 
                    onClick={() => setCurrentPage('catalog')}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    📦 Ver Catálogo Web con Stock
                  </button>

                  <button 
                    onClick={() => setCurrentPage('contact')}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    💼 Cotizaciones Mayoristas
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '30px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '13px',
        backgroundColor: '#050608'
      }}>
        © {new Date().getFullYear()} Habitat Import. Todos los derechos reservados.
      </footer>
    </div>
  );
}