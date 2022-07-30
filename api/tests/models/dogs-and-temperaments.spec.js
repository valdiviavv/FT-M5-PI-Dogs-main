const {Dog, Temperament, DogsAndTemperaments, conn} = require('../../src/db.js');
const {expect} = require('chai');

describe('Dogs and Temperaments model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Temperament.sync({force: true}));
        describe('name', () => {
            it('should work when a temperament is added to the dog', (done) => {
                Dog.create({
                    name: 'Pug',
                    weight_min: 5,
                    weight_max: 6,
                    height_min: 8,
                    height_max: 9,
                    life_span: '12 years'
                })
                    .catch((error) => done(new Error(`There was an error creating the dog: \n${error}`)))
                    .then((dogInstance) => {
                        console.log('The dogInstance was created: ', dogInstance);
                        Temperament.create({
                            name: 'Stubborn'
                        })
                            .catch((error) => done(new Error(`There was an error creating the temperament: \n${error}`)))
                            .then((tempInstance) => {
                                console.log('The tempInstance was created: ', tempInstance);
                                dogInstance.addTemperament(tempInstance, {through: DogsAndTemperaments})
                                    .catch((error) => done(new Error(`There was an error adding the temperament to the dog: \n${error}`)))
                                    .then((dogAndTemperamentInstance) => {
                                        if(dogAndTemperamentInstance)   {
                                            console.log('The dogAndTemperamentInstance: was created:', dogAndTemperamentInstance);
                                            done();
                                        } else {
                                            done(new Error('The dog-temperament relation was not created.'));
                                        }
                                    });
                            });
                    });
            });
        });
    });
});
