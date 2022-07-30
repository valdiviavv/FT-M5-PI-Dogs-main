const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: "Breed name can not be empty"
        },
        is:{
          args: ["^[A-Za-z\\s]*$"],
          msg: "Only letters are allowed"
        },
        len: {
          args: [3,150],
          msg: "Minimal length is 3 and the maximum is 150 characters"
        },
      }
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Life span can not be empty"
        },
        is:{
          args: ["^[\\dA-Za-z\\s-]*$"],
          msg: "Only letters and numbers are allowed"
        },
        len: {
          args: [3,50],
          msg: "Minimal length is 3 and the maximum is 50 characters"
        },
      },
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Weight min can not be empty"
        },
        min:{
          args:[1],
          msg:"The value should be greater than zero"
        }
      },
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Weight max can not be empty"
        },
        min:{
          args:[1],
          msg:"The value should be greater than zero"
        }
      },
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Height min can not be empty"
        },
        min:{
          args:[1],
          msg:"The value should be greater than zero"
        }
      },
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Height max can not be empty"
        },
        min:{
          args:[1],
          msg:"The value should be greater than zero"
        }
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false
  });
};
