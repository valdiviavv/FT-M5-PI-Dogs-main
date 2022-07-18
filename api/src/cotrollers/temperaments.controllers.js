'use strict';
const { Temperament } = require('../db');

function getTemperamentList(req, res) {
    Temperament.findAll()
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

function getTemperamentById(req, res) {
    const temperamentId = req.params.id;
    Temperament.findByPk(temperamentId)
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
    getTemperamentList,
    getTemperamentById,
}
