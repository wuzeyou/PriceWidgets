module.exports = (markets) => {
  if (markets && markets.length > 0) {
    const market = markets[0]
    return {
      type: "zstack",
      props: {},
      views: [{
          type: "color",
          props: {
            color: $color("#000000")
          }
        },
        {
          type: "vstack",
          props: {
            spacing: 0,
            alignment: $widget.horizontalAlignment.center,
          },
          views: [{
              type: "image",
              props: {
                frame: {
                  width: 9,
                  height: 9
                },
                symbol: market["1d"].price_change_pct >= 0 ? "arrowtriangle.up.fill" : "arrowtriangle.down.fill",
                resizable: true
              }
            },
            {
              type: "text",
              props: {
                text: market.symbol.toUpperCase(),
                font: { size: 15 },
                bold: true,
                lineLimit: 1,
                padding: $insets(3, 0, 0, 0)
              }
            },
            {
              type: "text",
              props: {
                text: (market["1d"].price_change_pct >= 0 ? "+" : "-") + (market["1d"].price_change_pct * 100).toFixed(2),
                font: { size: 11 },
                // bold: true,
                lineLimit: 1,
              }
            }
          ]
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