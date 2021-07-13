const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

function listItem(market) {
  if (market) {
    return {
      type: "hstack",
      props: {
        alignment: $widget.verticalAlignment.center,
        spacing: 8,
        frame: {
          maxWidth: Infinity,
          maxHeight: Infinity
        },
        link: "https://www.coingecko.com/en/coins/" + market.id,
      },
      views: [{
          type: "image",
          props: {
            resizable: true,
            scaledToFill: true,
            uri: market.image,
            frame: {
              width: 28,
              height: 28
            },
            cornerRadius: 14,
          }
        },
        {
          type: "vstack",
          props: {
            alignment: "leading",
            layoutPriority: 1
          },
          views: [{
              type: "text",
              props: {
                text: market.symbol.toUpperCase(),
                bold: true,
                font: fonts.primary,
                lineLimit: 1,
              }
            },
            {
              type: "text",
              props: {
                text: market.name,
                font: fonts.secondary,
                color: $color("systemSecondaryLabel"),
                lineLimit: 1,
              }
            },
          ]
        },
        {
          type: "spacer",
          props: {
            minLength: 1
          }
        },
        {
          type: "vstack",
          props: {
            alignment: "trailing",
            layoutPriority: 2
          },
          views: [{
              type: "text",
              props: {
                text: "$ " + market.current_price,
                font: { size: 15 },
                bold: true,
                lineLimit: 1,
                minimumScaleFactor: 0.01
              }
            },
            {
              type: "text",
              props: {
                text: "H: " + market.high_24h + ", L: " + market.low_24h,
                font: { size: 10 },
                color: $color("systemTertiaryLabel"),
                lineLimit: 1,
              }
            },
          ]
        },
        {
          type: "zstack",
          props: {
            alignment: "center",
            cornerRadius: 4,
            frame: {
              width: 72,
              height: 28
            },
          },
          views: [
            market.price_change_percentage_24h >= 0 ? colors.upGreen : colors.downRed,
            {
              type: "text",
              props: {
                text: (market.price_change_percentage_24h >= 0 ? "+" : "") + market.price_change_percentage_24h.toFixed(2) + "%",
                bold: true,
                color: $color("white"),
                padding: $insets(0, 4, 0, 4),
                font: {
                  size: 14,
                  monospaced: true
                },
                lineLimit: 1,
                minimumScaleFactor: 0.01
              }
            }
          ]
        },
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
  return {
    type: "vstack",
    props: {
      alignment: "leading",
      spacing: 0,
      padding: $insets(5, 15, 5, 15)
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