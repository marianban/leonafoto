import { Footer } from './(components)/Footer/Footer';
import { Gallery } from './(components)/Gallery/Gallery';
import { Hero } from './(components)/Hero/Hero';
import { Logo } from './(components)/Logo/Logo';
import { LogoWrapper } from './(components)/Logo/LogoWrapper';
import { Photography } from './(components)/Photography/Photography';
import { PriceList } from './(components)/PriceList/PriceList';
import { Services } from './(components)/Services/Services';
import { WhoAmI } from './(components)/WhoAmI/WhoAmI';

import localFont from '@next/font/local';
import { ClientMenu } from './ClientMenu';

const bebasNeueFont = localFont({
  src: './(fonts)/BebasNeue-RegularSubset.woff2',
  weight: '400',
});

export default function Home() {
  return (
    <div>
      <header>
        <h1 className={`logo ${bebasNeueFont.className}`}>
          <LogoWrapper>
            <>
              <Logo /> LeonaFoto
            </>
          </LogoWrapper>
        </h1>
        <menu>
          <li>
            <a href="/#o-mne">O mne</a>
          </li>
          <li>
            <a href="/#ponuka">Ponuka</a>
          </li>
          <li>
            <a href="/#fotenie">Fotenie</a>
          </li>
          <li>
            <a href="/#cennik">Cenník</a>
          </li>
          <li>
            <a href="/#galeria">Galéria</a>
          </li>
          <li className="contact">
            <a href="/#kontakt">Kontakt</a>
          </li>
        </menu>
        <ClientMenu />
      </header>
      <main>
        <Hero />
        <WhoAmI />
        <Services />
        <Photography />
        <PriceList />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
