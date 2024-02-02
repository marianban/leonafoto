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
import love from './images/undraw_Love_it_7c9l.png';

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
        <Image src={image} alt={title} width={width} height={height} />
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
            title="Tehotenské fotenie"
            description="Tehotenské fotenie zaznamenáva krásu a radostné očakávanie prírastku do rodiny. Fotenie je možné realizovať podľa želania budúcej mamičky v interiéri alebo exteriéri. Zapojenie partnera, detičiek alebo domáceho miláčika dodá fotografiám osobitný rozmer. Ideálny čas pre tento typ fotenia je v 7-8. mesiaci tehotenstva, keď je bruško mamičky pekne zaoblené."
            image={love}
            width={128}
            height={161}
          />
          <ServiceItem
            title="Novorodenecké fotenie"
            description="Zachyťte prvé chvíle vášho novorodenca s naším novorodeneckým fotografovaním. Je dôležité objednať si tento typ fotenia ešte pred pôrodom, pretože sa realizuje v prvých 7-14 dňoch života. Fotenie je časovo náročnejšie, najmä ak sa s novorodencom chcú fotiť aj ostatní členovia rodiny."
            image={baby2x}
            width={77}
            height={113}
          />
          <ServiceItem
            title="Rodinné fotenie"
            description="Rodinné fotenie je skvelý spôsob, ako zaznamenať spoločné chvíle a posilniť rodinné väzby. Ponúkame rôzne štýly fotografovania, od klasických záberov až po zábavné a neformálne momentky. Naše rodinné fotenie je prispôsobené potrebám a želaniam každého klienta."
            image={family2x}
            width={113}
            height={118}
          />
          <ServiceItem
            title="Detské portréty"
            description="Ak ste nestihli novorodenecké fotenie svojho dieťaťa, nevadí. Každé obdobie života vášho dieťaťa je krásne a hodné zaznamenania, či ide o oslavu narodením, nástup do škôlky alebo školy. To všetko sú dôležité míľniky v živote dieťaťa a rodiča, ktoré stoja za  zachytenie na fotografiách a založenie si fotiek do rodinného albumu."
            image={dollPlay2x}
            width={99}
            height={72}
          />
          <ServiceItem
            title="Portréty"
            description="Zameriavam sa na zachytávanie radosti, pôvabu a jedinečnosti malých detí, ktoré majú schopnosť vniesť do fotografií neopakovateľnú energiu a emócie. Ich nevinnosť, prirodzená hravosť a bezstarostnosť sú pre mňa nekonečným zdrojom inšpirácie pri fotografovaní. Snažím sa vytvárať prirodzené a autentické portréty, ktoré odzrkadľujú osobnosť a charakter každého malého modela, a zároveň približujú ich svet plný zábavy, objavovania a radosti z maličkostí."
            image={photoshoot2x}
            width={112}
            height={101}
          />
          <ServiceItem
            title="Vianočné fotenie"
            description="Vianočné fotenie patrí medzi najobľúbenejšie rodinné fotenie v rámci roka. Pre veľký záujem je potrebné objednať si tento typ fotenia v dostatočnom predstihu (október, november). Vianočná scéna je prispôsobená v jednoduchom, modernom a sviatočnom duchu. Ukážky z vianočnou kulisou zverejňujem v skorších termínoch na mojej Facebook stránke Leonafoto."
            image={christmass2x}
            width={115}
            height={106}
          />
          <ServiceItem
            title="Narodeninové fotenie"
            description="Narodeninové fotenie je veselým spôsobom, ako zachytiť oslavu vášho dieťaťa. Fotografie môžu byť realizované v exteriéri alebo interiéri, a môžete si vybrať farbu scény, aranžmán a svoje predstavy o oslave. Je na vás, či chcete priniesť aj vlastnú tortu. Niet krajšej spomienky pre rodiča, ako záznam z narodeninovej oslavy dieťaťa, ktorý odzrkadľuje plynúci čas a ako sa ich ratolesť mení."
            image={birthday2x}
            width={93}
            height={89}
          />
        </div>
      </div>
    </section>
  );
};
