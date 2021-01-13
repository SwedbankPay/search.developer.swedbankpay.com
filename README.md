# ELK node search proxy

This program is a simple proxy client for search used in
[SwedbankPay developer portal][swedbankPayPortal].

## Details

Spin up a [Express][express] with `npm run start`.
Search by sending request to:
`/search/?q=${value}&size=${value}&page=${value}`.
Response looks like the following:

```js
{
    "hits": [
        {
            "url": "/url-to-resource",
            "highlight": {
                "text": [
                    "Line 1, each is set to a limit of 150 characters",
                    "Line 2, they come preformated",
                    "Line 3"
                ]
            }
        },
        {
            "url": "/payment-instruments/card/after-payment.html",
            "highlight": {
                "text": [
                    "Line 1, each is set to a limit of 150 characters",
                    "Line 2, they come preformated",
                    "Line 3"
                ]
            }
        }
    ],
    "total": 2
}
```

## Configuration

1. `process.env.PORT` is what port this will listen to.
2. `process.env.elasticUrl` where to proxy the request to.

[express]: https://expressjs.com/
[swedbankPayPortal]: developer.swedbankpay.com/