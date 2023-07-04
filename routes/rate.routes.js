const express = require("express");

const db = require("../db/models/index");

const RateController = require("../controllers/rateController");

const rateController = new RateController(db);

const router = express.Router();

router.get("/", rateController.getHistoricalRates);

module.exports = router;
