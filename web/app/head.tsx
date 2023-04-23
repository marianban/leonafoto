const structuredData = `{
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'LeonaFoto | Fotenie detí, rodiny, tehotenské fotenie',
  description:
    'Annamária Bánová,  fotografka špecializujúca sa na fotografovanie detí, rodín a tehotných žien. Objavte krásu a emócie zachytené v jedinečných portrétoch a spomienkach, ktoré si budete ceniť navždy.',
  url: 'https://www.leonafoto.sk',
  telephone: '+421911397538',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Údernícka 6',
    addressLocality: 'Bratislava',
    addressRegion: 'Bratislavský kraj',
    postalCode: '851 01',
    addressCountry: 'SK',
  },
  image: 'https://www.leonafoto.sk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFotoAnnamaria2.09a92960.jpg&w=640&q=75',
  priceRange: '€30-€60',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Hotovosť, Prevod na účet',
  areaServed: 'Slovakia',
  sameAs: [
    'hhttps://www.facebook.com/profile.php?id=100085023186786',
  ],
}`;

export default function Head() {
  return (
    <>
      <title>LeonaFoto | Fotenie detí, rodiny, tehotenské fotenie</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Annamária Bánová fotografka špecializujúca sa na fotografovanie detí, rodín a tehotných žien. Objavte krásu a emócie zachytené v jedinečných portrétoch a spomienkach, ktoré si budete ceniť navždy."
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://use.typekit.net/nrv5kao.css"
        // @ts-ignore:
        precedence="default"
      />
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        async
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </>
  );
}
