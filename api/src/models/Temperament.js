const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperament', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: false
    });
};
