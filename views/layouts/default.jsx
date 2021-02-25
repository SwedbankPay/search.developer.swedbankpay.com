var React = require('react');
function DefaultLayout(props) {
  return (
    <html>
        <head>
            <title>Search results {props.title}</title>
            <link rel="stylesheet" href="https://design.swedbankpay.com/v/5.0.2/styles/dg-style.css" />
            <link rel="stylesheet" type="text/css" href="stylesheet/style.css" />
        </head>
        <body className="documentation">
          <div class="row mr-0">
            {props.children}
          </div>
          <script src="https://design.swedbankpay.com/v/5.0.2/scripts/dg.js"></script>
        </body>
    </html>
  );
}

module.exports = DefaultLayout;