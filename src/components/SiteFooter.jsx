import { Layout, Row, Col, Typography, Space, Divider, Button, Image } from 'antd';
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  YoutubeOutlined,
  TikTokOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import content from '../content.json';
import images from '../images.json';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

export default function SiteFooter() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Nosotros', path: '/about' },
    { label: 'Servicios', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contacto', path: '/contact' },
  ];

  return (
    <Footer style={{ background: 'var(--ava-primary-color)', color: '#5591b4', padding: '60px 48px 24px' }}>
      <Row gutter={[48, 32]}>
        <Col xs={24} md={8}>
          <Space direction="vertical" size="small">
            <Image
              src={images.logo}
              alt="AVA Ingeniería"
              preview={false}
              height={40}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <Text style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}>
              Soluciones integrales en automatización, telecomunicaciones, instrumentación y más.
            </Text>
          </Space>
        </Col>

        <Col xs={24} md={8}>
          <Title level={5} style={{ color: '#9ac931', marginBottom: 16 }}>
            Enlaces rápidos
          </Title>
          <Space direction="vertical" size="small">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                style={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Link>
            ))}
          </Space>
        </Col>

        <Col xs={24} md={8}>
  <Title level={5} style={{ color: '#9ac931', marginBottom: 16 }}>
    Ubicación
  </Title>
  <Space direction="vertical" size="small">
    {content.contact.address.map((item, index) => (
      <Space key={index} align="start">
        <EnvironmentOutlined style={{ color: '#9ac931', marginTop: '4px' }} />
        {/* Usamos Typography.Link para mantener el estilo del Footer */}
        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
          <a 
            href={item.mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {item.place}
          </a>
        </Text>
      </Space>
    ))}
  </Space>
</Col>
      </Row>

      <Divider style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '32px 0 24px' }} />

      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            {content.footer.text}
          </Text>
        </Col>
        <Col>
          <Space>
            <Button
              shape="circle"
              ghost
              icon={<YoutubeOutlined />}
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Button
              shape="circle"
              ghost
              icon={<TikTokOutlined />}
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Button
              shape="circle"
              ghost
              icon={<InstagramOutlined />}
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
            />
          </Space>
        </Col>
      </Row>
    </Footer>
  );
}
