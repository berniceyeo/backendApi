const axios = require("axios");

const getExchangeRate = async (currency, type) => {
  const response = await axios.get(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  );
  const returnResponse = {};
  const { rates } = response.data.data;

  if (type === "crypto") {
    returnResponse[`${currency}`] = {
      USD: rates.USD,
      SGD: rates.SGD,
      EUR: rates.EUR,
    };
  } else if (type === "fiat") {
    returnResponse[`${currency}`] = {
      BTC: rates.BTC,
      DOGE: rates.DOGE,
      ETH: rates.ETH,
    };
  }

  return returnResponse;
};

const getExchangeRates = async (type) => {
  const currencies =
    type === "crypto" ? ["BTC", "DOGE", "ETC"] : ["USD", "SGD", "EUR"];
  let rates = {};
  for (const currency of currencies) {
    const rate = await getExchangeRate(currency, type);
    rates = { ...rates, ...rate };
  }

  return rates;
};

module.exports = getExchangeRates;
