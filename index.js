require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const routerApi = require("./routes/numbers.routes");
const db = require("./db/models/index");
const getExchangeRates = require("./services/exchangeRates");
const updateExchangeRates = require("./services/exchangeRates");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/exchange-rates", routerApi);

app.listen(port, () => {
  console.log("App is listening on port 5000");
});

cron.schedule(" * * * * *", async () => {
  console.log("Calling to update table");
  await updateExchangeRates();
});
