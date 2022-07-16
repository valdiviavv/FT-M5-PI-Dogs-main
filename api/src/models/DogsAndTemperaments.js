const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('dogs_and_temperaments', {
        dog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        temperament_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
