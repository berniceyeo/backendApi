const express = require("express");

const getExchangeRates = require("../services/exchangeRates");

const router = express.Router();

router.get("/exchange-rates", async (req, res) => {
  try {
    const base = req.query.base;
    const rates = await getExchangeRates(base);
    console.log(rates);
    res.send(rates);
  } catch (error) {
    console.error(error);
    res.send("Error getting exchange rates");
  }
});

module.exports = router;
