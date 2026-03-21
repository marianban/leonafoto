export default function Head() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.typekit.net/nrv5kao.css"
        precedence="default"
      />
      {process.env.NODE_ENV === 'production' && (
        <script
          async
          src="https://umami.closure.sk/script.js"
          data-website-id="2faaf711-5864-4ea1-91d5-c02f1b16d19a"
        ></script>
      )}
    </>
  );
}
