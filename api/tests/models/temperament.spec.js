const {Temperament, conn} = require('../../src/db.js');
const {expect} = require('chai');

describe('Temperament model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Temperament.sync({force: true}));
        describe('name', () => {
            it('should throw an error if name is null', (done) => {
                Temperament.create({})
                    .then(() => done(new Error('It should throw error with empty object.')))
                    .catch(() => done());
            });
            it('should work when its a valid name', (done) => {
                Temperament.create({
                    name: 'Stubborn'
                })
                    .then(() => done())
                    .catch((error) => done(new Error(`There was an error creating the temperament: \n${error}`)));
            });
        });
    });
});
