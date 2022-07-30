/* eslint-disable import/no-extraneous-dependencies */
const {expect} = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const {Dog, conn} = require('../../src/db.js');

const agent = session(app);
const dogItem1 = {
    name: 'Pug',
    weight_min: 15,
    weight_max: 16,
    height_min: 18,
    height_max: 19,
    life_span: '12 years'
};

const dogItem2 = {
    name: 'Fox',
    weight_min: 25,
    weight_max: 26,
    height_min: 28,
    height_max: 29,
    life_span: '15 years'
};

describe('Dogs API routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    beforeEach(() => Dog.sync({force: true})
        .then(() => Dog.create(dogItem1)));

    //--------------------------------------------------------------------------------------------
    describe('Dogs API POST /dogs route.', () => {
        it('POST /dogs with null fields should get 400', () =>
            agent.post('/dogs')
                .send({
                    name: null,
                    weight_min: null,
                    weight_max: null,
                    height_min: null,
                    height_max: null,
                    life_span: null
                })
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('dog.name cannot be null')
                    expect(JSON.stringify(res.body)).contains('dog.weight_min cannot be null')
                    expect(JSON.stringify(res.body)).contains('dog.weight_max cannot be null')
                    expect(JSON.stringify(res.body)).contains('dog.height_min cannot be null')
                    expect(JSON.stringify(res.body)).contains('dog.height_max cannot be null')
                    expect(JSON.stringify(res.body)).contains('dog.life_span cannot be null')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /dogs with empty fields should get 400', () =>
            agent.post('/dogs')
                .send({
                    name: '',
                    weight_min: '',
                    weight_max: '',
                    height_min: '',
                    height_max: '',
                    life_span: ''
                })
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('Breed name can not be empty')
                    expect(JSON.stringify(res.body)).contains('Weight min can not be empty')
                    expect(JSON.stringify(res.body)).contains('Weight max can not be empty')
                    expect(JSON.stringify(res.body)).contains('Height min can not be empty')
                    expect(JSON.stringify(res.body)).contains('Height max can not be empty')
                    expect(JSON.stringify(res.body)).contains('Life span can not be empty')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /dogs with wrong values should get 400', () =>
            agent.post('/dogs')
                .send({
                    name: 'ab',
                    weight_min: 0,
                    weight_max: 0,
                    height_min: 0,
                    height_max: 0,
                    life_span: 'ef'
                })
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('Minimal length is 3 and the maximum is 150 characters')
                    expect(JSON.stringify(res.body)).contains('The value should be greater than zero')
                    expect(JSON.stringify(res.body)).contains('The value should be greater than zero')
                    expect(JSON.stringify(res.body)).contains('The value should be greater than zero')
                    expect(JSON.stringify(res.body)).contains('The value should be greater than zero')
                    expect(JSON.stringify(res.body)).contains('Minimal length is 3 and the maximum is 50 characters')
                })
        );

        //--------------------------------------------------------------------------------------------
        const newDog = {...dogItem1};
        newDog.name = '12345';
        newDog.life_span = '!@#$%';

        it('POST /dogs with numbers and alphanumerics should get 400', () =>
            agent.post('/dogs')
                .send(newDog)
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('Only letters are allowed')
                    expect(JSON.stringify(res.body)).contains('Only letters and numbers are allowed')
                })
        );
    });

    //--------------------------------------------------------------------------------------------
    describe('Dogs API GET /dogs route', () => {

        //--------------------------------------------------------------------------------------------
        it('GET /dogs should get 200 and return a list of one dog', () =>
            agent.get('/dogs')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body.length).to.equal(1)
                })
        );

        //--------------------------------------------------------------------------------------------
        it('GET /dogs should get 404 and return error message', () =>
            agent.get('/dogs/0')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('The requested dog was not found.')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('GET /dogs should get 200 and return one dogs', () =>
            agent.get('/dogs/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body.id).to.equal(1)
                    expect(res.body.name).to.equal('Pug')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /dogs should get 201 and create the second dog and GET /dogs should get 200 and return a list of two dogs', () =>
            agent.post('/dogs')
                .send(dogItem1)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body).to.eqls({dogId: 2})
                })
                .then(() => //should get 200 and return a list of two dogs
                    agent.get('/dogs')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .expect((res) => {
                            expect(res.body.length).to.equal(2)
                        })
                )
        );
    });

    //--------------------------------------------------------------------------------------------
    describe('Dogs API PUT /dogs route', () => {

        //--------------------------------------------------------------------------------------------
        it('PUT /dogs should get 404 and error message', () =>
            agent.put('/dogs/2')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('The requested dog was not found.')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('PUT /dogs should get 200 and return the updated dog', () =>
            agent.put('/dogs/1')
                .send(dogItem2)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body.id).to.equal(1)
                    expect(res.body.name).to.equal(dogItem2.name)
                    expect(res.body.weight_min).to.equal(dogItem2.weight_min)
                    expect(res.body.weight_max).to.equal(dogItem2.weight_max)
                    expect(res.body.height_min).to.equal(dogItem2.height_min)
                    expect(res.body.height_max).to.equal(dogItem2.height_max)
                })
        );
    });

    //--------------------------------------------------------------------------------------------
    describe('Dogs API DELETE /dogs route', () => {

        //--------------------------------------------------------------------------------------------
        it('DELETE /dogs hould get 404 and error message', () =>
            agent.delete('/dogs/2')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('The requested dog was not found.')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('DELETE /dogs should get 204 and and empty response', () =>
            agent.delete('/dogs/1')
                .send(dogItem2)
                .expect(204)
                .expect((res) => {
                    expect(res.body).to.eqls({})
                })
        );
    });
});
