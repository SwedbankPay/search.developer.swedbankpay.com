# Developer Portal Search

This program is a search interface for use in the [Swedbank Pay Developer
Portal][devportal].

## Setup

The search portal consists of an [Express][express] frontend application that
performs searches towards an Elasticsearch backend. To spin up all required
parts on your local development machine, use Docker Compose:

```shell
docker compose up
```

This should bring up Elasticsearch, Kibana and the Express application on your
local machine. You can try out the application by visiting
`http://localhost:3000` in a browser.

[express]: https://expressjs.com/
[devportal]: https://developer.swedbankpay.com/
