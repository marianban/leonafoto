import type { Metadata } from 'next';
import { Logo } from '../(components)/Logo/Logo';
import localFont from 'next/font/local';
import { Upload } from './Upload';
import { Images } from './Images';
import './page.css';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const bebasNeueFont = localFont({
  src: '../(fonts)/BebasNeue-RegularSubset.woff2',
  weight: '400',
});

export default function Home() {
  return (
    <div>
      <header>
        <h1 className={`logo ${bebasNeueFont.className}`}>
          <Link href="/">
            <Logo /> LeonaFoto
          </Link>
        </h1>
      </header>
      <main>
        <h1>Správa fotiek</h1>
        <Upload />
        <Images />
      </main>
    </div>
  );
}
