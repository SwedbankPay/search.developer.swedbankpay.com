import React from 'react';

export default (props) => {
  return (
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#000" />
            <meta name="application-name" content="Developer Portal Search" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={props.title} />
            <meta name="msapplication-TileColor" content="#000" />
            <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
            <meta property="og:type" value="website" />
            <meta property="og:url" value="https://search.developer.swedbankpay.com/" />
            <meta property="og:title" value={props.title} />
            <meta name="title" content={props.title} />
            <meta property="og:description" value="Swedbank Pay Developer Portal Search" />
            <meta name="description" content="Swedbank Pay Developer Portal Search" />
            <meta property="og:image" value="https://developer.swedbankpay.com/assets/img/swedbank-pay-developer-portal.png" />
            <title>{props.title}</title>
            <link rel="stylesheet" href="https://design.swedbankpay.com/v/5.0.2/styles/dg-style.css" />
            <link rel="stylesheet" type="text/css" href="stylesheet/style.css" />
            <link rel="shortcut icon" href="https://design.swedbankpay.com/v/5.0.2/icons/favicon.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="https://design.swedbankpay.com/v/5.0.2/icons/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="https://design.swedbankpay.com/v/5.0.2/icons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="228x228" href="https://design.swedbankpay.com/v/5.0.2/icons/coast-228x228.png" />
            <link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined" rel="stylesheet" />
            <link rel="apple-touch-icon" sizes="57x57" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="167x167" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-167x167.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-180x180.png" />
            <link rel="apple-touch-icon" sizes="1024x1024" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-icon-1024x1024.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and  (-webkit-device-pixel-ratio: 1)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-320x460.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and  (-webkit-device-pixel-ratio: 2)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-640x920.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and  (-webkit-device-pixel-ratio: 2)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-640x1096.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and  (-webkit-device-pixel-ratio: 2)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-750x1294.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-1182x2208.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-1242x2148.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-748x1024.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-768x1004.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-1496x2048.png" />
            <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" href="https://design.swedbankpay.com/v/5.0.2/icons/apple-touch-startup-image-1536x2008.png" />
        </head>
        <body className="documentation">
          <div className="row mr-0">
            {props.children}
          </div>
          <script src="https://design.swedbankpay.com/v/5.0.2/scripts/dg.js" />
        </body>
    </html>
  );
};
