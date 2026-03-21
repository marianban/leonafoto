import './reset.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'LeonaFoto | Fotenie deti, rodiny, tehotenske fotenie',
  description:
    'Annamaria Banova, fotografka specializujuca sa na fotografovanie deti, rodin a tehotnych zien. Objavte krasu a emocie zachytene v jedinecnych portretoch a spomienkach, ktore si budete cenit navzdy.',
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
    <html lang="en">
      <head />
      <body>
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
