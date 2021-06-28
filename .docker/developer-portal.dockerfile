FROM swedbankpay/jekyll-plantuml:2.2.2

RUN git \
    clone https://github.com/SwedbankPay/developer.swedbankpay.com.git \
    --depth 1 \
    --branch develop \
    --single-branch \
    .

RUN bundle install
