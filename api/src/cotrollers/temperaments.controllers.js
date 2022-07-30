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
            if(!data) {
                return res.status(404).json({
                    msg: "The requested temperament was not found."
                });
            }
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

function createTemperament(req, res) {
    const {name} = req.body;
    Temperament.create({
        name
    })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            console.log("error: ", error);
            res.status(400).json({
                msg: "There was an error retrieving database information",
                error
            })
        });
}

const updateTemperament = async (req, res) => {
    const temperamentId = req.params.id;
    const temperamentInstance = await Temperament.findByPk(temperamentId);

    if (!temperamentInstance) {
        return res.status(404).json({
            msg: "The requested temperament was not found."
        });
    }

    const {name} = req.body;
    temperamentInstance.update({
        name
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

const deleteTemperamentById = async (req, res) => {
    const temperamentId = req.params.id;
    const temperamentInstance = await Temperament.findByPk(temperamentId);

    if (!temperamentInstance) {
        return res.status(404).json({
            msg: "The requested temperament was not found."
        });
    }

    temperamentInstance.destroy({
        where: {id: temperamentInstance}
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
    getTemperamentList,
    getTemperamentById,
    createTemperament,
    updateTemperament,
    deleteTemperamentById,
}
