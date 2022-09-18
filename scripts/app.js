const api = require("./api");
const errorWidget = require("./widget/error");
const emptyWidget = require("./widget/empty");
const smallWidget = require("./widget/small");
const mediumWidget = require("./widget/medium");
const accessoryRec = require("./widget/accessoryRec");
const accessoryInline = require("./widget/accessoryInline");
const accessoryCirc = require("./widget/accessoryCirc");
const { fetchCoingeckoLogo } = require("./utils");

const now = new Date();
const expireDate = new Date(now.getTime() + 5 * 60 * 1000);

const inputValue = $widget.inputValue;

exports.init = async() => {
  if ($app.env == $env.app) {
    await fetchCoingeckoLogo();
  }
  try {
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
          case $widgetFamily.accessoryInline:
            return accessoryInline(items);
          case $widgetFamily.accessoryCircular:
            return accessoryCirc(items);
          case $widgetFamily.accessoryRectangular:
            return accessoryRec(items, items.length == 1 ? 1 : 3);
          case $widgetFamily.small:
            return smallWidget(items);
          case $widgetFamily.medium:
            return mediumWidget(items, 3);
          case $widgetFamily.large:
            return mediumWidget(items, 6);
        }
      }
    });
  } catch (error) {
    console.log("looks like a internet connect problems");
    $widget.setTimeline({
      policy: {
        afterDate: expireDate
      },
      render: ctx => {
        return errorWidget(ctx);
      }
    });
  }
}