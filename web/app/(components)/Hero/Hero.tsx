import './Hero.css';
import { HeroContent } from './HeroContent';

export const Hero = () => {
  return (
    <section className="hero">
      <a href="#galeria">
        <div className="content">
          <HeroContent />
        </div>
      </a>
    </section>
  );
};
