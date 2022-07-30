/* eslint-disable import/no-extraneous-dependencies */
const {expect} = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const {Temperament, conn} = require('../../src/db.js');

const agent = session(app);
const temperamentItem1 = {
    name: 'Stubborn'
};

const temperamentItem2 = {
    name: 'Playful'
};

describe('Temperament API routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    beforeEach(() => Temperament.sync({force: true})
        .then(() => Temperament.create(temperamentItem1)));

    //--------------------------------------------------------------------------------------------
    describe('Temperaments API POST /temperaments route.', () => {
        it('POST /temperaments with null fields should get 400', () =>
            agent.post('/temperaments')
                .send({
                    name: null
                })
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('temperament.name cannot be null')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /temperaments with empty fields should get 400', () =>
            agent.post('/temperaments')
                .send({
                    name: ''
                })
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('Temperament name can not be empty')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /temperaments with wrong values should get 400', () =>
            agent.post('/temperaments')
                .send({
                    name: 'ab'
                })
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('Minimal length is 3 and the maximum is 50 characters')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /temperaments with numbers and alphanumerics should get 400', () =>
            agent.post('/temperaments')
                .send({name: '12345!@#$%'})
                .expect(400)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('Only letters are allowed in Temperament name')
                })
        );
    });

    //--------------------------------------------------------------------------------------------
    describe('Temperaments API GET /temperaments route', () => {

        //--------------------------------------------------------------------------------------------
        it('GET /temperaments should get 200 and return a list of one temperament', () =>
            agent.get('/temperaments')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body.length).to.equal(1)
                })
        );

        //--------------------------------------------------------------------------------------------
        it('GET /temperaments should get 404 and return error message', () =>
            agent.get('/temperaments/0')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('The requested temperament was not found.')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('GET /temperaments should get 200 and return one temperaments', () =>
            agent.get('/temperaments/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body.id).to.equal(1)
                    expect(res.body.name).to.equal('Stubborn')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /temperaments with an existing name should return error.', () =>
            agent.post('/temperaments')
                .send(temperamentItem1)
                .expect(400)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains("name must be unique")
                })
        );

        //--------------------------------------------------------------------------------------------
        it('POST /temperaments should get 201 and create the second temperament and GET /temperaments should get 200 and return a list of two temperaments', () =>
            agent.post('/temperaments')
                .send(temperamentItem2)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body).to.eqls({id: 2, name: 'Playful'})
                })
                .then(() => //should get 200 and return a list of two temperaments
                    agent.get('/temperaments')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .expect((res) => {
                            expect(res.body.length).to.equal(2)
                        })
                )
        );
    });

    //--------------------------------------------------------------------------------------------
    describe('Temperaments API PUT /temperaments route', () => {

        //--------------------------------------------------------------------------------------------
        it('PUT /temperaments should get 404 and error message', () =>
            agent.put('/temperaments/0')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('The requested temperament was not found.')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('PUT /temperaments should get 200 and return the updated temperament', () =>
            agent.put('/temperaments/1')
                .send(temperamentItem2)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(res.body.id).to.equal(1)
                    expect(res.body.name).to.equal(temperamentItem2.name)
                })
        );
    });

    //--------------------------------------------------------------------------------------------
    describe('Temperaments API DELETE /temperaments route', () => {

        //--------------------------------------------------------------------------------------------
        it('DELETE /temperaments hould get 404 and error message', () =>
            agent.delete('/temperaments/0')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    expect(JSON.stringify(res.body)).contains('The requested temperament was not found.')
                })
        );

        //--------------------------------------------------------------------------------------------
        it('DELETE /temperaments should get 204 and and empty response', () =>
            agent.delete('/temperaments/1')
                .send(temperamentItem2)
                .expect(204)
                .expect((res) => {
                    expect(res.body).to.eqls({})
                })
        );
    });
});
