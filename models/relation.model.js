const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    PhoneNumber: { type: DataTypes.STRING(20), allowNull: false},
    RelationId: { type: DataTypes.STRING(50), allowNull: false},
    RelationName: { type: DataTypes.STRING(100), allowNull: false}    
  };

  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("Relation", attributes, options);
}