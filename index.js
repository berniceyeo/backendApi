const express = require("express");
const routerApi = require("./routes/numbers.routes");
const db = require("./db/models/index");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/exchange-rates", routerApi);

app.listen(port, () => {
  console.log("App is listening on port 5000");
});
