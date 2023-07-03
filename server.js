const express = require("express");
const routerApi = require("./routes/numbers");

const port = process.env.PORT || 5000;
const app = express();

app.use("/", routerApi);

app.listen(port, () => {
  console.log("App is listening on port 5000");
});
