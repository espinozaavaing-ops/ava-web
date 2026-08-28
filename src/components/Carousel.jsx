import { Carousel, Image, Typography } from 'antd';
import content from '../content.json';

const { Title } = Typography;

export default function ImageCarousel() {
  if (!content.home.carousel?.length) return null;

  return (
    <div style={{ padding: '64px 24px', background: '#f5f5f500' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Title
          level={2}
          style={{ textAlign: 'center', marginBottom: 32, color: 'var(--ava-primary-color)' }}
        >
          {content.home.servicesOverview || 'Conoce nuestros servicios'}
        </Title>
        <Carousel autoplay autoplaySpeed={3500} dots={{ className: 'custom-dots' }}>
          {content.home.carousel.map((slide, idx) => (
            <div key={idx}>
              <div
                style={{
                  position: 'relative',
                  height: 420,
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.caption}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                  preview={false}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    padding: '40px 32px 24px',
                  }}
                >
                  <Title
                    level={3}
                    style={{ color: '#ffffff', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                  >
                    {slide.caption}
                  </Title>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
