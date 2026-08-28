import { Carousel, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import content from "../content.json";
import images from "../images.json";

const { Title, Paragraph } = Typography;

const slideStyle = {
  position: "relative",
  height: "calc(100vh - 72px)",
  minHeight: 500,
  overflow: "hidden",
};

const imgStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  zIndex: 1,
};

const contentStyle = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: 24,
};

export default function Hero() {
  const navigate = useNavigate();

  const heroImages = Array.isArray(images.hero) ? images.hero : [images.hero];

  return (
    <Carousel autoplay autoplaySpeed={4500} effect="fade" dots>
      {heroImages.map((img, idx) => (
        <div key={idx}>
          <div style={slideStyle}>
            <img src={img} alt={`Hero-${idx + 1}-${img}`} style={imgStyle} />
            <div style={overlayStyle} />
            <div style={contentStyle}>
              <div style={{ maxWidth: 800, textAlign: "center" }}>
                  {content.home.hero.title}
                  {content.home.hero.subtitle}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}