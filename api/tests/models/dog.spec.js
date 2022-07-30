const {Dog, conn} = require('../../src/db.js');
const {expect} = require('chai');

describe('Dog model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Dog.sync({force: true}));
        describe('name', () => {
            it('should throw an error if name is null', (done) => {
                Dog.create({})
                    .then(() => done(new Error('It requires a valid name')))
                    .catch(() => done());
            });
            it('should work when its a valid name, weight, height and life-span', (done) => {
                Dog.create({
                    name: 'Pug',
                    weight_min: 5,
                    weight_max: 6,
                    height_min: 8,
                    height_max: 9,
                    life_span: '12 years'
                })
                    .then(() => done())
                    .catch((error) => done(new Error(`There was an error creating the dog: \n${error}`)));
            });
        });
    });
});
