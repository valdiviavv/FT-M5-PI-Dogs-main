const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperament', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Temperament name can not be empty"
                },
                is: {
                    args: ["^[A-Za-z\\s]*$"],
                    msg: "Only letters are allowed in Temperament name"
                },
                len: {
                    args: [3,50],
                    msg: "Minimal length is 3 and the maximum is 50 characters"
                },
            },
        },
    }, {
        timestamps: false
    });
};
