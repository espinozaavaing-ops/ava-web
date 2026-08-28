import React from 'react';
import { Typography, Card, Image, Empty, Button } from 'antd';
import { CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import content from '../content.json';
import images from '../images.json';
import '../index.css';

const { Title, Paragraph, Text } = Typography;

export default function Blog() {
  const navigate = useNavigate();
  const blogData = content.blog;
  const articlesFromJSON = blogData?.articles || [];

  // Mapeamos los artículos leyendo la propiedad 'image' directa del JSON de blogs
  const articles = articlesFromJSON.map((article) => ({
    ...article,
    image: article.image || images.blog, 
  }));

  return (
    <div className="section-container section-white" style={{ padding: '60px 24px', maxWidth: 1200, margin: '0 auto' }}>
      
      <Title level={2} style={{ textAlign: 'center', color: 'var(--ava-primary-color)', marginBottom: 8 }}>
        {blogData?.title || "Blogs y Noticias"}
      </Title>
      
      <Paragraph
        type="secondary"
        style={{ textAlign: 'center', fontSize: 16, marginBottom: 48, maxWidth: 700, margin: '0 auto 48px auto' }}
      >
        {blogData?.intro}
      </Paragraph>

      {articles.length > 0 ? (
        /* 💡 CONTENEDOR GRID: Controla que las tarjetas se ubiquen en filas horizontales y sean responsivas */
        <div 
          className="blog-grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            width: '100%',
            padding: 0
          }}
        >
          {articles.map((article, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                width: '100%', 
                height: '100%' 
              }}
            >
              <Card
                hoverable
                style={{ 
                  borderRadius: 12, 
                  overflow: 'hidden', 
                  width: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                  margin: 0
                }}
                onClick={() => navigate(`/blog/${article.slug}`)}
                bodyStyle={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  flex: 1, 
                  padding: 20 
                }}
                cover={
                  /* 💡 CONTROL DE IMAGEN: Forzamos la altura fija y el recorte proporcional al centro */
                  <div style={{ height: 200, overflow: 'hidden', background: '#f5f5f5' }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      width="100%"
                      height={200}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      preview={false}
                    />
                  </div>
                }
              >
                <Text type="secondary" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                  <CalendarOutlined style={{ color: 'var(--ava-primary-color)' }} /> {article.date}
                </Text>
                
                <Title level={4} style={{ marginTop: 12, marginBottom: 12, color: 'var(--ava-primary-color)', fontSize: 17, lineHeight: 1.4 }}>
                  {article.title}
                </Title>
                
                <Paragraph type="secondary" ellipsis={{ rows: 3 }} style={{ flex: 1, marginBottom: 20, fontSize: 14 }}>
                  {article.excerpt}
                </Paragraph>

                {/* El botón se ancla magnéticamente abajo gracias a Flexbox */}
                <div style={{ marginTop: 'auto' }}>
                  <Button 
                    type="link" 
                    icon={<ArrowRightOutlined />} 
                    style={{ padding: 0, display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: 8, fontWeight: 600, color: 'var(--ava-primary-color)' }}
                  >
                    Leer noticia
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Empty description="Próximamente artículos y novedades de la industria." style={{ padding: 60 }} />
      )}
    </div>
  );
}