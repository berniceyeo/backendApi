class RateController {
  constructor(db) {
    this.model = db.rate;
  }

  getAll = async (req, res) => {
    try {
      console.log("Getting all rates");
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = RateController;
