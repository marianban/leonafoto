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

// Cache the generated homepage until a gallery mutation invalidates it.
export const dynamic = 'force-static';
export const revalidate = false;

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
            <Logo /> LeonaFoto
          </LogoWrapper>
          <span className="subtitle">Detská fotografka v Bratislave</span>
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
