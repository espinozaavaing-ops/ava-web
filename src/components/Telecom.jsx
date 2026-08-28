import React from 'react';
import { Row, Col, Typography, Menu, Card, Button } from 'antd';
import { RightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import content from '../content.json';
import { useQuoteCart } from '../context/QuoteContext';
import '../index.css';

const { Title, Paragraph } = Typography;

export default function Telecom() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useQuoteCart();

  const telecomData = content.telecom;
  const activeCategory = category || 'dmr';

  const currentCategoryData = telecomData.categoriesData?.[activeCategory] || {
    title: "Sección en Desarrollo",
    desc: "Próximamente se incorporarán los productos correspondientes a esta categoría.",
    brandLogo: "",
    products: []
  };

  const handleCategoryClick = ({ key }) => {
    navigate(`/services/telecomunicaciones/${key}`);
  };

  const handleAddToCart = (product) => {
    addToCart({
      name: product.title || product.name,
      image: product.img || product.image,
      description: product.desc || product.description,
      category: currentCategoryData.title
    });
    alert(`¡${product.title || product.name} agregado a la lista de cotización!`);
  };

  return (
    <div className="telecom-page">
      <div className="catalog-container">
        <Row gutter={[32, 32]}>
          
          {/* Menú Lateral Izquierdo */}
          <Col xs={24} md={6}>
            <div className="sidebar-categories">
              <div className="categories-header">Categorías</div>
              <Menu
                mode="vertical"
                selectedKeys={[activeCategory]}
                onClick={handleCategoryClick}
                className="custom-side-menu"
              >
                {telecomData.subCategories.map((cat) => (
                  <Menu.Item key={cat.key} icon={<RightOutlined className="menu-arrow-icon" />}>
                    {cat.label}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </Col>

          {/* Área de Contenido Derecha */}
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
              {currentCategoryData.brandLogo && (
                <div className="brand-logo-container">
                  <img src={currentCategoryData.brandLogo} alt="Brand Logo" className="brand-logo" />
                </div>
              )}
            </div>

            <hr className="section-divider-line" />

            {/* Rejilla de Tarjetas de Productos */}
            {currentCategoryData.products.length > 0 ? (
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
                      <div className="product-card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Title level={5} className="product-card-title">
                          {product.title}
                        </Title>
                        <Paragraph className="product-card-desc" ellipsis={{ rows: 4 }}>
                          {product.desc}
                        </Paragraph>
                        
                        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px' }}>
                          <Button 
                            type="primary" 
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart(product)}
                            style={{ backgroundColor: '#059669', borderColor: '#059669', fontWeight: 'bold' }}
                          >
                            Agregar a Cotización
                          </Button>
                          <Button type="default" className="product-view-more-btn">
                            Ver más
                          </Button>
                        </div>
                      </div>
                    </Card>
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