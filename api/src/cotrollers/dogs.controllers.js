'use strict';
const { Dog, Temperament, DogsAndTemperaments } = require('../db');
const { Op } = require("sequelize");

function getDogList(req, res) {
    let options = {
        include: ['temperaments']
    }

    const dogName = req.query.name;
    if(dogName) {
        options['where'] = {
            name: {
                [Op.iLike]: `%${dogName}%`
            }
        }
    }

    Dog.findAll(options)
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
    Dog.findByPk(dogId, {
        include: ['temperaments']
    })
        .then(data => {
            if(!data) {
                return res.status(404).json({
                    msg: "The requested dog was not found."
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

const createDog = async (req, res) => {
    const {name, life_span, weight_min, weight_max, height_min, height_max, image_url, temperaments} = req.body;

    let dogInstance;
    try {
        dogInstance = await Dog.create({
            name, life_span, weight_min, weight_max, height_min, height_max, image_url
        });
    } catch (error) {
        res.status(400).json({error: error});
        return;
    }

    if (temperaments && typeof temperaments === 'object') {
        const errorList = []
        for (let index = 0; index < temperaments.length; index++) {
            let item = temperaments[index];
            if (item.name.length === 0) {
                continue; //the model will throw error with this condition.
            }
            try {
                const [tempInstance, created] = await Temperament.findOrCreate({where: {name: item.name}});
                await dogInstance.addTemperament(tempInstance, {through: DogsAndTemperaments})
            } catch (error) {
                errorList.push(error);
            }
        }

        if(errorList.length !== 0) {
            res.status(400).json(errorList);
        }
    }
    res.status(201).json({dogId: dogInstance.id});
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
