import React from 'react';
import { Row, Col, Typography, Menu } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import content from '../content.json'; 
import ProductCard from './ProductCard';
import '../index.css';

const { Title, Paragraph } = Typography;

export default function AutomatizacionControl() {
  const { category } = useParams();
  const navigate = useNavigate();

  const automatizacionData = content.automation;

  const activeCategory = category || 'hardware';

  const currentCategoryData = automatizacionData.categoriesData?.[activeCategory] || {
    title: "Sección en Desarrollo",
    desc: "Próximamente se incorporará el catálogo correspondiente a esta categoría.",
    products: []
  };

  // Función para cambiar de subruta al hacer clic en el menú lateral
  const handleCategoryClick = ({ key }) => {
    navigate(`/services/automatizacion/${key}`);
  };

  return (
    <div className="automation-page">
      <div className="catalog-container">
        <Row gutter={[32, 32]}>
          
          {/* Menú Lateral Izquierdo (Categorías) */}
          <Col xs={24} md={6}>
            <div className="sidebar-categories">
              <div className="categories-header">Categorías</div>
              <Menu
                mode="vertical"
                selectedKeys={[activeCategory]}
                onClick={handleCategoryClick} 
                className="custom-side-menu"
              >
                {automatizacionData.subCategories.map((cat) => (
                  <Menu.Item key={cat.key} icon={<RightOutlined className="menu-arrow-icon" />}>
                    {cat.label}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </Col>

          {/* Área de Contenido Derecha (Productos Dinámicos) */}
          <Col xs={24} md={18}>
            <div className="content-header-block">
              <div className="text-block">
                <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                  {currentCategoryData.title}
                </Title>
                <Paragraph style={{ color: '#444', fontSize: '15px', lineHeight: 1.7, marginTop: 12 }}>
                  {currentCategoryData.desc}
                </Paragraph>
              </div>
              <div className="brand-logo-container">
                <img src="/assets/allen-bradley-logo.png" alt="Allen Bradley Logo" className="brand-logo" />
              </div>
            </div>

            <hr className="section-divider-line" />

            {/* Rejilla de Tarjetas de Productos Filtrados con Carrito */}
            {currentCategoryData.products.length > 0 ? (
              <Row gutter={[20, 20]}>
                {currentCategoryData.products.map((product, idx) => (
                  <Col xs={24} sm={12} lg={8} key={idx}>
                    <ProductCard product={{
                      ...product,
                      category: currentCategoryData.title
                    }} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                No hay productos cargados actualmente para esta categoría.
              </div>
            )}

          </Col>

        </Row>
      </div>
    </div>
  );
}