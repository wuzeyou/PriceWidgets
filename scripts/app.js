const api = require("./api");
const emptyWidget = require("./widget/empty");
const smallWidget = require("./widget/small");
const mediumWidget = require("./widget/medium");

const now = new Date();
const expireDate = new Date(now.getTime() + 5 * 60 * 1000);

const inputValue = $widget.inputValue;

const sharedPath = "shared://all_coingecko_ids.json";
const coinGeckoIdAPI = "https://api.coingecko.com/api/v3/coins/list";

exports.init = async() => {
  if ($app.env == $env.app) {
    const resp = await $http.get(coinGeckoIdAPI);
    if (resp != null && resp.response != null && resp.response.statusCode == 200) {
      const data = resp.data;
      const success = $file.write({
        data: $data({ string: JSON.stringify(data) }),
        path: sharedPath
      });
      console.log("Update CoinGeckoId: " + (success ? "Success" : "Fail"));
    }
  }
  const items = await api.fetchMarkets(inputValue ? inputValue : "BTC,ETH,BNB");
  $widget.setTimeline({
    policy: {
      afterDate: expireDate
    },
    render: ctx => {
      if (items.length === 0) {
        return emptyWidget(ctx);
      }
      switch (ctx.family) {
        case $widgetFamily.small:
          return smallWidget(items);
        case $widgetFamily.medium:
          return mediumWidget(items, 3);
        case $widgetFamily.large:
          return mediumWidget(items, 6);
      }
    }
  });
}