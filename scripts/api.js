const nomicsEndpoint = "https://api.nomics.com/v1";
// const cachePath = "assets/cache-nomics.json";
const nomicsAPIKEY = "REPLACE WITH YOUR OWN NOMICS API KEY";

const endpoint = "https://api.coingecko.com/api/v3";
const cachePath = "assets/cache.json";
const idsPath = "shared://all_coingecko_ids.json";

function requestFailed(resp) {
  return resp == null || resp.response == null || resp.response.statusCode != 200;
}

function readCache() {
  const data = $file.read(cachePath);
  if (data) {
    return JSON.parse(data.string);
  } else {
    return [];
  }
}

function getAllCoinGeckoIds() {
  const data = $file.read(idsPath);
  if (data) {
    return JSON.parse(data.string);
  } else {
    return [];
  }
}

const SPECIAL_LIST = {
  "uni": "uniswap"
}

function findCoinGeckoId(inputSymbol) {
  if (SPECIAL_LIST[inputSymbol.toLowerCase()]) {
    return SPECIAL_LIST[inputSymbol.toLowerCase()];
  }
  const allIds = getAllCoinGeckoIds();
  const find = allIds.find(({ symbol }) => symbol.toLowerCase() === inputSymbol.toLowerCase())
  if (find) {
    return find.id;
  } else {
    return undefined;
  }
}

async function fetchMarkets(input) {
  const inputSymbols = input.split(",");
  const ids = inputSymbols.map(inputSymbol => findCoinGeckoId(inputSymbol)).join(',');
  const resp = await $http.get(endpoint + '/coins/markets?vs_currency=usd&ids=' + ids);
  // const ids = inputSymbols.map(inputSymbol => inputSymbol.toUpperCase()).join(',');
  // const resp = await $http.get(nomicsEndpoint + '/currencies/ticker?interval=1d&convert=USD&ids=' + ids + '&key=' + nomicsAPIKEY);
  if (requestFailed(resp)) {
    return readCache();
  }

  //在此处将接口数据包装为统一数据结构
  //如要更换API，请相应更新此处代码
  const items = [];
  resp.data.forEach(it => {
    items.push({
      "id": it.id,
      "symbol": it.symbol,
      "name": it.name,
      "image": it.image,
      "current_price": "" + it.current_price,
      "high_24h": it.high_24h,
      "low_24h": it.low_24h,
      "price_change_percentage_24h": it.price_change_percentage_24h,
      "last_updated": it.last_updated
    })
  });

  if (items) {
    $file.write({
      path: cachePath,
      data: $data({
        "string": JSON.stringify(items)
      })
    });
  }

  return items;
}

exports.fetchMarkets = fetchMarkets;