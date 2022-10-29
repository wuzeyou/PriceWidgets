const colors = require("../constants/colors");
const fonts = require("../constants/fonts");
const { displayPrice, getLocalLogoUrl } = require("../utils");

module.exports = (markets) => {
  if (markets && markets.length > 0) {
    const market = markets[0]
    const urlSuffix = market.id.toLowerCase() + '-' + market.name.replaceAll(/\s+/g, '-').toLowerCase();
    return {
      type: "zstack",
      props: {
        alignment: "topLeading",
        frame: {
          maxWidth: Infinity,
          maxHeight: Infinity
        },
        widgetURL: "https://www.coingecko.com/en/coins/" + market.id,
        // widgetURL: "https://nomics.com/assets/" + urlSuffix,
      },
      views: [{
          type: "image",
          props: {
            resizable: true,
            scaledToFill: true,
            uri: market.image,
            // uri: /\.(jpg|png)$/.test(market.logo_url) ? market.logo_url : getLocalLogoUrl(market.symbol, market.logo_url),
            position: $point(30, 30),
            frame: {
              width: 180,
              height: 180
            },
            // cornerRadius: 90,
            opacity: 0.3,
          }
        },
        {
          type: "vstack",
          props: {
            alignment: "trailing",
            frame: {
              maxWidth: Infinity,
            },
            spacing: 0,
            padding: $insets(8, 15, 15, 10)
          },
          views: [{
              type: "text",
              props: {
                text: market.symbol.toUpperCase(),
                font: { size: 24, weight: "heavy" },
                color: $color("systemText"),
                lineLimit: 1,
                bold: true,
              }
            },
            {
              type: "text",
              props: {
                text: market.name,
                font: { size: 10 },
                color: $color("systemTertiaryLabel"),
                lineLimit: 1,
              }
            },
            {
              type: "spacer",
              props: {
                minLength: 1,
              }
            },
            {
              type: "text",
              props: {
                text: (market.price_change_percentage_24h >= 0 ? "+" : "") + market.price_change_percentage_24h.toFixed(2) + "%",
                color: market.price_change_percentage_24h >= 0 ? colors.upGreen : colors.downRed,
                // text: (market["1d"].price_change_pct >= 0 ? "+" : "") + (market["1d"].price_change_pct * 100).toFixed(2) + "%",
                // color: market["1d"].price_change_pct >= 0 ? colors.upGreen : colors.downRed,
                bold: true,
                layoutPriority: 1,
                font: { size: 16 },
                lineLimit: 1,
                minimumScaleFactor: 0.5
              }
            },
            {
              type: "hstack",
              props: {
                spacing: 0,
                alignment: "center"
              },
              views: [{
                  type: "spacer",
                  props: {
                    minLength: 1,
                  }
                },
                {
                  type: "text",
                  props: {
                    text: "$ " + market.current_price,
                    // text: "$ " + displayPrice(market.price),
                    font: {
                      size: 28,
                      weight: "bold",
                      monospaced: true,
                    },
                    color: $color("primaryText"),
                    lineLimit: 1,
                    minimumScaleFactor: 0.01,
                    layoutPriority: 1,
                  }
                }
              ]
            },
            {
              type: "hstack",
              props: {
                spacing: 0,
                alignment: "center"
              },
              views: [{
                  type: "spacer",
                  props: {
                    minLength: 1,
                  }
                },
                {
                  type: "text",
                  props: {
                    text: "H: " + market.high_24h + ", L: " + market.low_24h,
                    // text: new Date(market.price_timestamp).toLocaleTimeString('en-US'),
                    font: {
                      size: 10,
                    },
                    color: $color("secondaryText"),
                    lineLimit: 1,
                    minimumScaleFactor: 0.01,
                    layoutPriority: 1,
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  } else {
    return {
      type: "text",
      props: {
        text: $l10n("PLEASE_INPUT"),
        bold: true,
        color: $color("secondaryText"),
        font: {
          size: 24,
          monospaced: true
        },
        frame: {
          maxWidth: ctx.displaySize.width - 30
        },
        lineLimit: 2,
        minimumScaleFactor: 0.01
      }
    }
  }
}