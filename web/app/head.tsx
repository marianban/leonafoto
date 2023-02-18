export default function Head() {
  return (
    <>
      <title>LeonaFoto</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="LeonaFoto" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://use.typekit.net/nrv5kao.css"
        precedence="default"
      />
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        async
      ></script>
    </>
  );
}
