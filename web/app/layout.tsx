import './reset.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import authorPhoto from './(components)/WhoAmI/images/FotoAnnamaria2.jpg';

const siteUrl = 'https://leonafoto.sk';
const siteTitle =
  'LeonaFoto | Fotenie detí, rodiny, tehotenské fotenie v Bratislave';
const siteDescription =
  'Annamária Bánová, fotografka špecializujúca sa na fotografovanie detí, rodín a tehotných žien. Objavte krásu a emócie zachytené v jedinečných portrétoch a spomienkach, ktoré si budete ceniť navždy.';
const siteImage = new URL(authorPhoto.src, siteUrl).toString();

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteTitle,
  description: siteDescription,
  url: siteUrl,
  telephone: '+421911397538',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Údernícka 6',
    addressLocality: 'Bratislava',
    addressRegion: 'Bratislavský kraj',
    postalCode: '851 01',
    addressCountry: 'SK',
  },
  image: siteImage,
  priceRange: 'EUR 45-60',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Hotovosť, Prevod na účet',
  areaServed: 'Slovakia',
  sameAs: ['https://www.facebook.com/profile.php?id=100085023186786'],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'LeonaFoto',
    locale: 'sk_SK',
    type: 'website',
    images: [
      {
        url: siteImage,
        width: authorPhoto.width,
        height: authorPhoto.height,
        alt: 'Annamária Bánová - fotografka LeonaFoto',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="sk">
      <head />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {recaptchaSiteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        ) : null}
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
