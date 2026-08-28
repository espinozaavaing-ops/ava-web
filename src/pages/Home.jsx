import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import Carousel from '../components/Carousel';
import LineasProductosSlider from '../components/LineasProductosSlider';
import PartnersSlider from '../components/PartnersSlider';
import Documentacion from '../components/Documentacion'

import content from '../content.json';
import AliadosDestacados from '../components/AliadosDestacados';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Carousel /> */}
      <AboutSection /> 
      <LineasProductosSlider />           
      <AliadosDestacados/>
      <Documentacion />         
      {/* <ServicesSection /> */}

    </>
  );
}
