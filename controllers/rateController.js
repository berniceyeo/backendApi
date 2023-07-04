const { Op } = require("sequelize");
const { ALL_CURRENCY } = require("../utils/constants");

class RateController {
  constructor(db) {
    this.model = db.rate;
  }

  getHistoricalRates = async (req, res) => {
    try {
      if (
        !req.query.base_currency ||
        !req.query.target_currency ||
        !req.query.start
      ) {
        return res
          .send(400)
          .json({ error: true, msg: "Missing require params" });
      }

      const baseCurrency = req.query.base_currency;
      const targetCurrency = req.query.target_currency;

      if (!ALL_CURRENCY.includes(baseCurrency)) {
        return res.status(400).json({ error: true, msg: "Invalid params" });
      }

      const start = Number(req.query.start);
      const end = req.query.end ? Number(req.query.end) : new Date().getTime();
      const output = await this.model.findAll({
        attributes: [
          ["conversion", "value"],
          ["created_at", "timestamp"],
        ],
        where: {
          baseCurrency,
          targetCurrency,
          createdAt: {
            [Op.gt]: start,
            [Op.lt]: end,
          },
        },
      });
      return res.json({
        results: output,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = RateController;
