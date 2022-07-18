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
    });
}

function getDogById(req, res) {
    const dogId = req.params.id;
    Dog.findByPk(dogId)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log("error: ", error);
            res.status(500).json({
                msg: "There was an error retrieving database information",
                error
            })
        });
}

function createDog(req, res) {
    const {name, life_span, weight_min, weight_max, height_min, height_max, image_url} = req.body;
    Dog.create({
        name, life_span, weight_min, weight_max, height_min, height_max, image_url
    })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            console.log("error: ", error);
            res.status(500).json({
                msg: "There was an error retrieving database information",
                error
            })
        });
}

module.exports = {
    getDogList,
    getDogById,
    createDog,
}
