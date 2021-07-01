#!/bin/bash

is_ready() {
    [ "$(curl --write-out '%{http_code}' --silent --output /dev/null "$ELASTICSEARCH_URL"/_cat/health?h=st)" = 200 ]
}

echo "$(date) - Checking whether <$ELASTICSEARCH_URL> is ready..."

i=0
while ! is_ready; do
    i=$((i + 1))

    if [ "$i" -ge 30 ]; then
        echo "$(date) - <$ELASTICSEARCH_URL> still not ready, giving up!"
        exit 1
    fi
    echo "$(date) - waiting for <$ELASTICSEARCH_URL> to be ready."
    sleep 2
done

echo "$(date) - Done checking for <$ELASTICSEARCH_URL>."
echo "$(date) - Running the Developer Portal in $JEKYLL_ENV."

exec /var/jekyll/entrypoint/sh/entrypoint.sh build
