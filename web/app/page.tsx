import { Footer } from './(components)/Footer/Footer';
import { Gallery } from './(components)/Gallery/Gallery';
import { Hero } from './(components)/Hero/Hero';
import { Logo } from './(components)/Logo/Logo';
import { LogoWrapper } from './(components)/Logo/LogoWrapper';
import { Photography } from './(components)/Photography/Photography';
import { PriceList } from './(components)/PriceList/PriceList';
import { Services } from './(components)/Services/Services';
import { WhoAmI } from './(components)/WhoAmI/WhoAmI';
import { HamburgerMenu } from './(components)/HamburgerMenu/HamburgerMenu';

import localFont from 'next/font/local';
import { ClientMenu } from './ClientMenu';
import Link from 'next/link';

const bebasNeueFont = localFont({
  src: './(fonts)/BebasNeue-RegularSubset.woff2',
  weight: '400',
});

export default function Home() {
  return (
    <div className="page-container">
      <header>
        <h1 className={`logo ${bebasNeueFont.className}`}>
          <LogoWrapper>
            <>
              <Logo /> LeonaFoto
            </>
          </LogoWrapper>
        </h1>
        <HamburgerMenu />
        <menu>
          <li>
            <Link href="/#o-mne">O mne</Link>
          </li>
          <li>
            <Link href="/#ponuka">Ponuka</Link>
          </li>
          <li>
            <Link href="/#fotenie">Fotenie</Link>
          </li>
          <li>
            <Link href="/#cennik">Cenník</Link>
          </li>
          <li>
            <Link href="/#galeria">Galéria</Link>
          </li>
          <li className="contact">
            <Link href="/#kontakt">Kontakt</Link>
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
