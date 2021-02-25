var Express = require('express');
var router = Express.Router();
var Client = require('@elastic/elasticsearch');
var Fetch = require('node-fetch')
const elasticUrl = process.env.elasticUrl || 'http://192.168.1.175:9200'
const elasticUsername = process.env.elasticUsername || 'none'
const elasticPassword = process.env.elasticPassword || 'none'
const elasticIndex = process.env.elasticIndex || 'test-psp-developer-*'

const client = new Client.Client({
    node: elasticUrl,
    auth: {
        username: elasticUsername,
        password: elasticPassword
    },
})
let sidebar

Fetch('https://developer.stage.swedbankpay.com/sidebar.html')
    .then(response => response.text())
    .then(text => sidebar = text)

var asyncHandler = require('express-async-handler');
const results = {"hits":[{"title":"Checkout – Checkin","url":"/checkout/checkin.html","highlight":{"text":["Payer identification is done through the initiate-consumer-session operation. info Guest <em class=\"hlt1\">Checkout</em> Note: If the payer is using the Payment Menu as a guest, you can go directly to step 3, which you will find on the next page.","token=5a17c24e-d459-4567-bbad-aa0f17a76119\", \"contentType\": \"application/javascript\" } ] } Field Type Description token string A session token used to initiate <em class=\"hlt1\">Checkout</em> UI. operations array The array of operation objects to choose from, described in detail","DOCTYPE html&gt; &lt;html&gt; &lt;head&gt; &lt;title&gt;Swedbank Pay <em class=\"hlt1\">Checkout</em> is Awesome!&lt;/title&gt; &lt;/head&gt; &lt;body&gt; &lt;div id=\"checkin\"&gt;&lt;/div&gt; &lt;div id=\"payment-menu\"&gt;&lt;/div&gt; &lt;!"]}},{"title":"Release Notes","url":"/resources/release-notes.html","highlight":{"text":["Added documentation on guest <em class=\"hlt1\">checkout</em> in <em class=\"hlt1\">Checkout</em>. Updated information about logourl in <em class=\"hlt1\">Checkout</em>. Added a list of accepted banks in Trustly Payments.","on 3-D Secure 2 for <em class=\"hlt1\">Checkout</em> and Card Payments.","Added section about Authenticated Merchants in <em class=\"hlt1\">Checkout</em> section."]}},{"title":"Introduction","url":"/checkout/","highlight":{"text":["Swedbank Pay <em class=\"hlt1\">Checkout</em> allows your customers to be identified with Swedbank Pay, enabling existing Swedbank Pay <em class=\"hlt1\">Checkout</em> users to pay with their favorite payment methods in just a few simple steps.","Please observe that Swedbank Pay <em class=\"hlt1\">Checkout</em> encompass both the consumer and paymentmenu scope. Introduction To get started with Swedbank Pay <em class=\"hlt1\">Checkout</em>, you should learn about its different components and how they work together.","Connect these steps and you have Swedbank Pay <em class=\"hlt1\">Checkout</em>. While Checkin is a necessary component to store personal information and access features like storing cards, it is not a mandatory step for the <em class=\"hlt1\">Checkout</em> process to work."]}},{"title":"Introduction","url":"/modules-sdks/","highlight":{"text":["Platform Module Repository Swedbank Pay <em class=\"hlt1\">Checkout</em> for Episerver …episerver-<em class=\"hlt1\">checkout</em> Swedbank Pay <em class=\"hlt1\">Checkout</em> for Magento 2 …magento2-<em class=\"hlt1\">checkout</em> Swedbank Pay Payments for Magento 2 …magento2-payments Swedbank Pay <em class=\"hlt1\">Checkout</em> for WooCommerce …woocommerce-<em class=\"hlt1\">checkout</em>","Platform Library Repository Swedbank Pay <em class=\"hlt1\">Checkout</em> for Magento 2 Core …magento2-core Swedbank Pay SDK for .NET Extensions …sdk-dotnet-extensions"]}},{"title":"Introduction","url":"/modules-sdks/mobile-sdk/","highlight":{"text":["It generates any html pages required to show the Swedbank Pay UI internally; it does not support using a <em class=\"hlt1\">Checkout</em> or Payments web page that you host yourself.","Agreement that includes Swedbank Pay <em class=\"hlt1\">Checkout</em>. Obtained credentials (merchant Access Token) from Swedbank Pay through Swedbank Pay Admin. Please observe that Swedbank Pay <em class=\"hlt1\">Checkout</em> encompass both the consumer and paymentmenu scope.","Introduction As the Mobile SDK is built on top of <em class=\"hlt1\">Checkout</em>, it is a good idea to familiarize yourself with it first. The rest of this document will assume some familiarity with <em class=\"hlt1\">Checkout</em> concepts."]}},{"title":"Test Data","url":"/resources/test-data.html","highlight":{"text":["Swedbank Pay <em class=\"hlt1\">Checkout</em> Test Data During a Swedbank Pay <em class=\"hlt1\">Checkout</em> implementation, you can use the test data related to the different payment instruments listed below.","To see Swedbank Pay <em class=\"hlt1\">Checkout</em> in action, please visit our demoshop To test a checked-in user in the Demo Shop, please use the following test data: <em class=\"hlt1\">Checkout</em> test data for Norway Type Data Description Email olivia.nyhuus@payex.com The e-mail address of the","Format Sweden: XXXXX <em class=\"hlt1\">Checkout</em> test data for Denmark Type Data Description Mobile number +4522222222 The mobile phone number of the payer."]}},{"title":"Developer Portal","url":"/","highlight":{"text":["Start your integration shopping_cart <em class=\"hlt1\">Checkout</em> With our <em class=\"hlt1\">Checkout</em> you get the pre-built all-in-one payment solution, complete with a checkin interface and payment menu. arrow_forward credit_card Payment Instruments Payment Instruments gives you a one-by-one","method to build your own payment menu. arrow_forward card_giftcard Gift Cards Our Gift Cards API allows your customers to pay with prepaid gift cards issued by Swedbank Pay. arrow_forward Edit \"Developer Portal\" on GitHub Try our Demoshop See how our <em class=\"hlt1\">checkout</em>","Deleted Merchant Identified Payer in <em class=\"hlt1\">Checkout</em>. Renamed Merchant Authenticated Consumer to Delegated Strong Consumer Authentication. Updated payer/consumer/end-user naming for most sections. Updated expiry date for test cards in test data."]}},{"title":"Terminology","url":"/resources/terminology.html","highlight":{"text":["It is the fundament of Checkin in Swedbank Pay <em class=\"hlt1\">Checkout</em>. F Financing Consumer The FinancingConsumer Invoice API is the fundament for Swedbank Pay Invoice Payments service.","The Payment Menu is the second part of the Swedbank Pay <em class=\"hlt1\">Checkout</em> flow (after checkin). Payment Orders The Payment Orders resource is used when initiating a payment process using the Payment Menu and Swedbank Pay <em class=\"hlt1\">Checkout</em>.","Used in One-click payments and recurring payment scenarios (Card, Invoice and Swedbank Pay <em class=\"hlt1\">Checkout</em>). Payout The payment option that initiates a payout payment process. A Payout payment is a deposit directly to credit card."]}},{"title":"Process Diagrams","url":"/modules-sdks/mobile-sdk/process-diagrams.html","highlight":{"text":["&lt;/html&gt; WebView -&gt;&gt; User: Show checkin UI User -&gt;&gt; WebView: Enter personal details WebView -&gt;&gt; SDK: onConsumerIdentified({ \"consumerProfileRef\" : \"...\" }) SDK -&gt;&gt; SDK: store consumerProfileRef for <em class=\"hlt1\">checkout</em> Begin <em class=\"hlt1\">Checkout</em>","With the Payment Order ready, the SDK begins the “<em class=\"hlt1\">checkout</em>” flow, where the actual payment is made.","The <em class=\"hlt1\">checkout</em> flow begins similarly to the checkin flow: a request is made to create a Payment Order, then an html page is constructed and displayed to the user."]}},{"title":"Merchant Backend","url":"/modules-sdks/mobile-sdk/merchant-backend.html","highlight":{"text":["The main part of the API is designed as a transparent wrapper around the Swedbank Pay API, which is the same one used in <em class=\"hlt1\">Checkout</em>.","token=5a17c24e-d459-4567-bbad-aa0f17a76119\", \"contentType\": \"application/javascript\" } ] } Field Type Description token string A session token used to initiate <em class=\"hlt1\">Checkout</em> UI. operations array The array of operation objects to choose from, described in detail","See <em class=\"hlt1\">Checkout</em> Documentation for details. At this point, the Merchant Backend will preform necessary processing, and make a corresponding request to the Swedbank Pay API, using its secret access token."]}}],"total":25}
router.get('/', asyncHandler(async(req, res, next) => {
    var query = req.query.q + ''; //Force into a string
    
    if (query == null || query.length == 0) {
        query = "developer portal"
    }
    var startIndex = req.query.page;
    if (startIndex == null)
        startIndex = 0;
    var querySize = req.query.size;
    if (querySize == null)
        querySize = 5;

    if (startIndex != 0) {
        startIndex = querySize * startIndex;
    }
    
    var query_splitted = query.trim().split(' ')
    var final_query = query_splitted.map(x => `${x}~1 `).join('')
    res.render('search', { 
        results, 
        query, 
        page: req.query.page ? req.query.page : 0, 
        size: querySize, 
        originalUrl: req.originalUrl,
        sidebar
    })
  /*   const {
        body
    } = await client.search({
        index: elasticIndex,
        body: {
            from: startIndex,
            size: querySize,
            query: {
                query_string: {
                    fields: ["text", "title"],
                    query: final_query,
                    default_operator: "AND"
                }
            },
            highlight: {
                fields: {
                    text: {
                        fragment_size: 250,
                        number_of_fragments: 3
                    }
                },
                tags_schema: "styled"
            }
        }
    })
    
    let results = {};
    results.hits = body.hits.hits.map(x => {
        return {
            title: x._source.title,
            url: x._source.url,
            highlight: x.highlight
        }
    })
    results.total = body.hits.total.value;
    
    res.render('search', { 
        results, 
        query, 
        page: req.query.page ? req.query.page : 0, 
        size: querySize, 
        originalUrl: req.originalUrl,
        sidebar
    }) */
}));

exports.searchRouter = router;