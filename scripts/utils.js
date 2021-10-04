exports.displayPrice = (price) => {
  const priceFloat = parseFloat(price);
  if (priceFloat >= 10) {
    return priceFloat.toFixed(2);
  } else if (priceFloat >= 1) {
    return priceFloat.toPrecision(5)
  } else if (priceFloat >= 0.00001) {
    return priceFloat.toPrecision(6);
  } else {
    return priceFloat.toPrecision(4);
  }
}

const savePath = "shared://coingecko-logo.json";
exports.fetchCoingeckoLogo = async() => {
  const resp = await $http.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
  if (resp != null && resp.response != null && resp.response.statusCode == 200) {
    const result = {};
    for (const market of resp.data) {
      result[market["symbol"]] = market["image"];
    }
    const success = $file.write({
      data: $data({ string: JSON.stringify(result) }),
      path: savePath
    });
    console.log("Update CoinGeckoId: " + (success ? "Success" : "Fail"));
  }
}

exports.getLocalLogoUrl = (symbol, originUrl) => {
  const symb = symbol.toLowerCase();
  const data = $file.read(savePath);
  const allLogos = JSON.parse(data.string);
  let url = originUrl;
  if (allLogos[symb]) {
    url = allLogos[symb];
  }
  return url;
}