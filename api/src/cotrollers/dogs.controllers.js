'use strict';
const { Dog, Temperament } = require('../db');

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

const updateDog = async (req, res) => {
    const dogId = req.params.id;
    const dogInstance = await Dog.findByPk(dogId);

    if (!dogInstance) {
        return res.status(404).json({
            msg: "The requested dog was not found."
        });
    }

    const {name, life_span, weight_min, weight_max, height_min, height_max, image_url} = req.body;
    dogInstance.update({
        name, life_span, weight_min, weight_max, height_min, height_max, image_url
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

const deleteDogById = async (req, res) => {
    const dogId = req.params.id;
    const dogInstance = await Dog.findByPk(dogId);

    if (!dogInstance) {
        return res.status(404).json({
            msg: "The requested dog was not found."
        });
    }

    dogInstance.destroy({
        where: {id: dogInstance}
    })
        .then(() => {
            res.status(204).end();
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
    updateDog,
    deleteDogById,
}
