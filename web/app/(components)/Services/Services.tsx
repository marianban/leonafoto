import './Services.css';
import Image, { StaticImageData } from 'next/image';
import baby from './images/undraw_baby_p4dd 1.png';
import baby2x from './images/undraw_baby_p4dd 1-2.png';
import birthday from './images/undraw_birthday_girl_n46w 1.png';
import birthday2x from './images/undraw_birthday_girl_n46w 1-2.png';
import christmass from './images/undraw_christmas_tree_-56-sw 1.png';
import christmass2x from './images/undraw_christmas_tree_-56-sw 1-2.png';
import dollPlay from './images/undraw_doll_play_evbw 1.png';
import dollPlay2x from './images/undraw_doll_play_evbw 1-2.png';
import family from './images/undraw_family_vg76 1.png';
import family2x from './images/undraw_family_vg76 1-2.png';
import photoshoot from './images/undraw_fashion_photoshoot_mtq8 1.png';
import photoshoot2x from './images/undraw_fashion_photoshoot_mtq8 1-2.png';

type ServiceItemProps = {
  title: string;
  description: string;
  image: StaticImageData;
  width: number;
  height: number;
};

const ServiceItem = ({
  title,
  description,
  image,
  width,
  height,
}: ServiceItemProps) => {
  return (
    <div className="service-item">
      <h3>{title}</h3>
      <picture>
        <Image src={image} alt="" width={width} height={height} />
      </picture>
      <p>{description}</p>
    </div>
  );
};

export const Services = () => {
  return (
    <section id="ponuka" className="services">
      <div className="content">
        <h2>Ponuka</h2>
        <div className="service-items">
          <ServiceItem
            title="Novorodenecké fotenie"
            description="Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých  najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a nabíja ma energiou. "
            image={baby2x}
            width={77}
            height={113}
          />
          <ServiceItem
            title="Rodinné fotenie"
            description="Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých  najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a nabíja ma energiou. "
            image={family2x}
            width={113}
            height={118}
          />
          <ServiceItem
            title="Detské fotenie"
            description="Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých  najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a nabíja ma energiou. "
            image={dollPlay2x}
            width={99}
            height={72}
          />
          <ServiceItem
            title="Portréty"
            description="Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých  najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a nabíja ma energiou. "
            image={photoshoot2x}
            width={112}
            height={101}
          />
          <ServiceItem
            title="Vianočné fotenie"
            description="Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých  najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a nabíja ma energiou. "
            image={christmass2x}
            width={115}
            height={106}
          />
          <ServiceItem
            title="Narodeninové fotenie"
            description="Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých  najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a nabíja ma energiou. "
            image={birthday2x}
            width={93}
            height={89}
          />
        </div>
      </div>
    </section>
  );
};
