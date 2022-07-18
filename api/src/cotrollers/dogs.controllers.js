'use strict';
const { Dog } = require('../db');

function getDogList(req, res) {
    Dog.findAll({
        include: ['temperaments']
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        console.log("error: ", error);
        res.status(500).json({
            msg: "There was an error retrieving database information",
            error
        })
    })
}

module.exports = {
    getDogList,
}
