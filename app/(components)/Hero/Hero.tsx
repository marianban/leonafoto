import './Hero.css';
import { HeroContent } from './HeroContent';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="content">
        <HeroContent />
      </div>
    </section>
  );
};
