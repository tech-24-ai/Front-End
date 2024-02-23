import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={
              "https://www.googletagmanager.com/gtag/js?id=" +
              process.env.GOOGLE_ANALYTICS_ID
            }
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                    
                      gtag('config', ${process.env.GOOGLE_ANALYTICS_ID});`,
            }}
          />

          <script
            async
            src={
              "https://www.googletagmanager.com/gtag/js?id=" +
              process.env.GOOGLE_ADS_ID
            }
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                    
                      gtag('config', ${process.env.GOOGLE_ADS_ID});`,
            }}
          />

          <script
          // dangerouslySetInnerHTML={{
          //   __html: `function vqTrackId(){return '5ba38300-f9da-4732-8032-27126bdb5d1b';} (function(d, e) { var el = d.createElement(e); el.sa = function(an, av){this.setAttribute(an, av); return this;}; el.sa('id', 'vq_tracking').sa('src', '//t.visitorqueue.com/p/tracking.min.js?id='+vqTrackId()).sa('async', 1).sa('data-id', vqTrackId()); d.getElementsByTagName(e)[0].parentNode.appendChild(el); })(document, 'script');`,
          // }}
          />
        </Head>
        <body>
          <Main />
          <div id="portal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
