FROM swedbankpay/jekyll-plantuml:2.2.2

ENV JEKYLL_ENV="${JEKYLL_ENV}" \
    JEKYLL_SITE_DIR="/usr/jekyll"

RUN mkdir -p ${JEKYLL_SITE_DIR}

WORKDIR ${JEKYLL_SITE_DIR}

RUN git \
    clone https://github.com/SwedbankPay/developer.swedbankpay.com.git \
    --depth 1 \
    --branch develop \
    --single-branch \
    ${JEKYLL_SITE_DIR}

COPY ./wait_for_elasticsearch.sh ${JEKYLL_VAR_DIR}/entrypoint/sh/
RUN chmod +x ${JEKYLL_VAR_DIR}/entrypoint/sh/wait_for_elasticsearch.sh

ENTRYPOINT ["/var/jekyll/entrypoint/sh/wait_for_elasticsearch.sh", "--verbose"]
