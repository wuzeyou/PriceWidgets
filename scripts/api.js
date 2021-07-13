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

function findCoinGeckoId(inputSymbol) {
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
  if (requestFailed(resp)) {
    return readCache();
  }

  const items = resp.data || [];

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