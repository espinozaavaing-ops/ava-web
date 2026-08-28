import { Row, Col, Typography } from 'antd';
import LineasProductosCard from './LineasProductosCard';
import content from '../content.json';
import images from '../images.json';
import Separador from './Separador';

const { Title } = Typography;

export default function ServicesSection() {
  return (
    <div className="section-container">
      <Title
        level={2}
        style={{ textAlign: 'center', color: '#0f3b6e', marginBottom: 48, fontWeight: 700, }}
      >
        {content.services.title}
      </Title>
      <Separador/>
      <Row gutter={[24, 24]}>
        {content.services.items.map((service, idx) => (
          <Col xs={24} sm={12} lg={8} key={idx}>
            <LineasProductosCard
              title={service.title}
              description={service.description}
              image={images.services?.[idx]}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
