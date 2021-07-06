FROM swedbankpay/jekyll-plantuml:2.2.2

ENV JEKYLL_ENV="${JEKYLL_ENV}"

COPY ./wait_for_elasticsearch.sh ${JEKYLL_VAR_DIR}/entrypoint/sh/
RUN chmod +x ${JEKYLL_VAR_DIR}/entrypoint/sh/wait_for_elasticsearch.sh

ENTRYPOINT ["/var/jekyll/entrypoint/sh/wait_for_elasticsearch.sh", "--verbose"]
