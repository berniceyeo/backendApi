"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    static associate(models) {}
  }

  Rate.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      baseCurrency: { type: DataTypes.STRING, field: "base_currency" },
      targetCurrency: { type: DataTypes.STRING, field: "target_currency" },
      conversion: DataTypes.STRING,
      createdAt: DataTypes.BIGINT,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "rate",
      underscored: true,
    }
  );
  return Rate;
};
