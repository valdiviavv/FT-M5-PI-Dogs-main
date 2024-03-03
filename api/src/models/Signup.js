const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('signup', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetTokenExpiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};
