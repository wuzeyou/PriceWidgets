module.exports = (markets) => {
  if (markets && markets.length > 0) {
    const market = markets[0]
    return {
      type: "hstack",
      props: {
        spacing: 2,
        alignment: $widget.verticalAlignment.center,
      },
      views: [{
          type: "image",
          props: {
            frame: {
              width: 8,
              height: 8
            },
            symbol: market.price_change_percentage_24h >= 0 ? "arrowtriangle.up.fill" : "arrowtriangle.down.fill",
            // symbol: market["1d"].price_change_pct >= 0 ? "arrowtriangle.up.fill" : "arrowtriangle.down.fill",
            resizable: true
          }
        },
        {
          type: "text",
          props: {
            text: market.symbol.toUpperCase() + " " + (market.price_change_percentage_24h >= 0 ? "+" : "") + market.price_change_percentage_24h.toFixed(2) + "%",
            // text: market.symbol.toUpperCase() + " " + (market["1d"].price_change_pct >= 0 ? "+" : "") + (market["1d"].price_change_pct * 100).toFixed(2) + "%",
          }
        }
      ]
    }
  } else {
    return {
      type: "hstack",
      props: {
        alignment: $widget.verticalAlignment.center,
        spacing: 8,
        frame: {
          maxHeight: Infinity
        }
      },
      view: []
    }
  }
}