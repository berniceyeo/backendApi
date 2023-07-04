const axios = require("axios");
const db = require("../db/models/index");
const {
  CRYPTO,
  CRYPTO_CURRENCY,
  FIAT_CURRENCY,
  FIAT,
} = require("../utils/constants");

const { rate } = db;

const getExchangeRate = async (currency, type) => {
  const response = await axios.get(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  );
  const returnResponse = {};
  const { rates } = response.data.data;

  if (type === CRYPTO) {
    returnResponse[`${currency}`] = {
      USD: rates.USD,
      SGD: rates.SGD,
      EUR: rates.EUR,
    };
  } else if (type === FIAT) {
    returnResponse[`${currency}`] = {
      BTC: rates.BTC,
      DOGE: rates.DOGE,
      ETH: rates.ETH,
    };
  }

  return returnResponse;
};

const getExchangeRates = async (type) => {
  const currencies = type === CRYPTO ? CRYPTO_CURRENCY : FIAT_CURRENCY;
  let rates = {};
  for (const currency of currencies) {
    const rate = await getExchangeRate(currency, type);
    rates = { ...rates, ...rate };
  }

  return rates;
};

const updateExchangeRates = async () => {
  try {
    const cryptoRates = await getExchangeRates(CRYPTO);
    const fiatRates = await getExchangeRates(FIAT);
    const cryptoCurrencies = Object.keys(cryptoRates);
    const fiatCurrencies = Object.keys(fiatRates);
    const timestamp = new Date().getTime();

    for (const cryptoCurrency of cryptoCurrencies) {
      for (const fiat of FIAT_CURRENCY) {
        console.log(cryptoCurrency);
        await rate.create({
          baseCurrency: cryptoCurrency,
          targetCurrency: fiat,
          conversion: cryptoRates[`${cryptoCurrency}`][`${fiat}`],
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
    }
    for (const fiatCurrency of fiatCurrencies) {
      for (const crypto of CRYPTO_CURRENCY) {
        console.log(fiatCurrency);
        await rate.create({
          baseCurrency: fiatCurrency,
          targetCurrency: crypto,
          conversion: fiatRates[`${fiatCurrency}`][`${crypto}`],
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateExchangeRates;
