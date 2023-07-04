const { Op } = require("sequelize");

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
        res.status(400).json({ error: true, msg: "Missing require params" });
      }

      const baseCurrency = req.query.base_currency;
      const targetCurrency = req.query.target_currency;
      const start = new Date(Number(req.query.start));
      const end = req.query.end ? new Date(Number(req.query.end)) : new Date();
      const output = await this.model.findAll({
        where: {
          baseCurrency,
          targetCurrency,
          createdAt: {
            [Op.gt]: start,
            [Op.lt]: end,
          },
        },
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = RateController;
