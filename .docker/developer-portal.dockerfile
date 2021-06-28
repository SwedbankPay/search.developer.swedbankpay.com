FROM swedbankpay/jekyll-plantuml:2.2.2

RUN git \
    clone https://github.com/SwedbankPay/developer.swedbankpay.com.git \
    --depth 1 \
    --branch develop \
    --single-branch \
    .

COPY ./wait_for_elasticsearch.sh /var/jekyll/entrypoint/sh/wait_for_elasticsearch.sh
RUN chmod +x /var/jekyll/entrypoint/sh/wait_for_elasticsearch.sh

ENTRYPOINT ["/var/jekyll/entrypoint/sh/wait_for_elasticsearch.sh"]
