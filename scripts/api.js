const nomicsEndpoint = "https://api.nomics.com/v1";
const cachePath = "assets/cache-nomics.json";
const nomicsAPIKEY = "REPLACE WITH YOUR OWN NOMICS API KEY";

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


async function fetchMarkets(input) {
  const inputSymbols = input.split(",");
  const ids = inputSymbols.map(inputSymbol => inputSymbol.toUpperCase()).join(',');
  const resp = await $http.get(nomicsEndpoint + '/currencies/ticker?interval=1d&convert=USD&ids=' + ids + '&key=' + nomicsAPIKEY);
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