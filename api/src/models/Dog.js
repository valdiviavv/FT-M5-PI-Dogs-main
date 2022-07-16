const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bread_for: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
