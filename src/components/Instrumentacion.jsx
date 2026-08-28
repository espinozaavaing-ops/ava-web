import React from 'react';
import { Row, Col, Typography, Menu, Card, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import content from '../content.json'; 
import '../index.css';

const { Title, Paragraph } = Typography;

export default function Instrumentacion() {
  const { category } = useParams();
  const navigate = useNavigate();

  const instrumentacionData = content.instrumentacion;

  const activeCategory = category || 'presion';

  const currentCategoryData = instrumentacionData.categoriesData?.[activeCategory] || {
    title: "Sección en Desarrollo",
    desc: "Próximamente se incorporará el catálogo correspondiente a esta categoría.",
    products: []
  };

  // Función para cambiar de subruta al hacer clic en el menú lateral
  const handleCategoryClick = ({ key }) => {
    navigate(`/services/instrumentacion/${key}`);
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
                {instrumentacionData.subCategories.map((cat) => (
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
                <img 
                  src={currentCategoryData.brandLogo} 
                  alt={`${currentCategoryData.title} Logo`} 
                  className="brand-logo" 
                />
              </div>
            </div>

            <hr className="section-divider-line" />

            {/* Rejilla de Tarjetas de Productos Filtrados */}
            <Row gutter={[20, 20]}>
              {currentCategoryData.products.map((product, idx) => (
                <Col xs={24} sm={12} lg={8} key={idx}>
                  <Card
                    hoverable
                    className="product-catalog-card"
                    cover={
                      <div className="product-image-wrapper">
                        <img alt={product.title} src={product.img} />
                      </div>
                    }
                  >
                    <div className="product-card-body">
                      <Title level={5} className="product-card-title">
                        {product.title}
                      </Title>
                      <Paragraph className="product-card-desc" ellipsis={{ rows: 4 }}>
                        {product.desc}
                      </Paragraph>
                      <Button 
                        type="primary" 
                        className="product-view-more-btn"
                        onClick={() => navigate(`/producto/${product.id}`)} 
                      >
                        Ver más
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

          </Col>

        </Row>
      </div>
    </div>
  );
}