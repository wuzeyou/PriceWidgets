module.exports = (ctx) => {
  return {
    type: "text",
    props: {
      text: $l10n("NETWORK_ERROR"),
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