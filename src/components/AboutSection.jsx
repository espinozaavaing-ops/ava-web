import { Row, Col, Typography, Button, Image } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'; // 💡 Importamos useLocation
import content from '../content.json';
import images from '../images.json';
import Separador from './Separador';

const { Title, Paragraph } = Typography;

export default function AboutSection() {
  const navigate = useNavigate();
  const location = useLocation(); // 💡 Inicializamos el hook para detectar la ruta actual

  // 💡 Evaluamos si el usuario se encuentra exactamente en la página de inicio
  const isHomePage = location.pathname === '/';

  return (
    <div className="section-container">

      <Row gutter={[48, 48]} align="middle">
        <Col xs={24}>
          <Title level={2} style={{ color: 'var(--ava-primary-color)', marginBottom: 20, textAlign: 'center', fontWeight:700 }}>
            {content.about.title}
          </Title>

          <Separador/>
        </Col>
      </Row>

      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} md={12}>
          <Image
            src={images.about}
            alt="Equipo AVA Ingeniería"
            width="100%"
            style={{ borderRadius: 16, objectFit: 'cover' }}
            preview
          />
        </Col>

        <Col xs={24} md={12}>         
          <Paragraph
            style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 24, textAlign: 'justify' }}
          >
            {content.about.content}
          </Paragraph>

          {/* 💡 RENDERIZADO CONDICIONAL: El botón solo se dibuja si 'isHomePage' es verdadero */}
          {isHomePage && (
            <Button
              type="default"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate('/about')}
              style={{
                borderColor: 'var(--ava-secondary-color)',
                color: 'var(--ava-primary-color)',
                backgroundColor:'var(--ava-secondary-color)',
                fontWeight: 500,
                borderRadius: 8,
              }}
            >
              Conoce más sobre nosotros
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}