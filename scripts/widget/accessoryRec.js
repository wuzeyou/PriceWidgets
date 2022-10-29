const { displayPrice } = require("../utils");

function listItem(market) {
  if (market) {
    // const urlSuffix = market.id.toLowerCase() + '-' + market.name.replaceAll(/\s+/g, '-').toLowerCase();
    return {
      type: "hstack",
      props: {
        alignment: $widget.verticalAlignment.center,
        spacing: 4,
        frame: {
          maxWidth: Infinity,
          maxHeight: Infinity
        },
        // link: "https://nomics.com/assets/" + urlSuffix,
        link: "https://www.coingecko.com/en/coins/" + market.id,
      },
      views: [{
          type: "image",
          props: {
            frame: {
              width: 9,
              height: 9
            },
            symbol: market.price_change_percentage_24h >= 0 ? "arrowtriangle.up.fill" : "arrowtriangle.down.fill",
            // symbol: market["1d"].price_change_pct >= 0 ? "arrowtriangle.up.fill" : "arrowtriangle.down.fill",
            resizable: true
          }
        },
        {
          type: "text",
          props: {
            layoutPriority: 2,
            text: market.symbol.toUpperCase(),
            bold: true,
            font: { size: 15 },
            lineLimit: 1,
          }
        },
        {
          type: "spacer",
          props: {
            // minLength: 1
          }
        },
        {
          type: "text",
          props: {
            layoutPriority: 1,
            text: "" + market.current_price,
            // text: displayPrice(market.price),
            font: { size: 15 },
            // bold: true,
            lineLimit: 1,
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

module.exports = (markets, lines) => {
  if (lines == 1) {
    const market = markets[0]
    return {
      type: "hstack",
      props: {
        spacing: 0,
        alignment: $widget.verticalAlignment.center,
      },
      views: [{
          type: "vstack",
          props: {
            alignment: $widget.horizontalAlignment.leading,
            spacing: 0,
            layoutPriority: 1,
          },
          views: [{
              type: "hstack",
              props: {
                spacing: 4,
                alignment: $widget.verticalAlignment.center,
                padding: $insets(0, 0, 0, 0),
              },
              views: [{
                  type: "image",
                  props: {
                    frame: {
                      width: 8,
                      height: 8
                    },
                    padding: $insets(0, 0, 0, 0),
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
                    font: { size: 15 },
                    padding: $insets(0, 0, 0, 0),
                    bold: true,
                    lineLimit: 1,
                  }
                }
              ]
            },
            {
              type: "text",
              props: {
                text: "" + market.current_price,
                // text: displayPrice(market.price),
                font: { size: 43 },
                padding: $insets(0, 0, 0, 0),
                lineLimit: 1,
                minimumScaleFactor: 0.5
              }
            }
          ]
        },
        {
          type: "spacer",
          props: {
            minLength: 0
          }
        }
      ]
    }
  } else {
    return {
      type: "vstack",
      props: {
        alignment: "leading",
        spacing: 0,
        padding: $insets(5, 3, 5, 3)
      },
      views: (() => {
        const result = [];
        for (let idx = 0; idx < lines; ++idx) {
          result.push(listItem(idx < markets.length ? markets[idx] : undefined));
        }
        return result;
      })()
    }
  }
}