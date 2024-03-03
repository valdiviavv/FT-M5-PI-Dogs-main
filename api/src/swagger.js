require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        title: 'Dogs API',
        description: 'The Dogs Rest API maintains information regarding dogs breed.'
    },
    servers: [],
    tags: [
        {
            name: 'Signup',
            description: 'Manages the signup, email verification, and login tasks.'
        },
        {
            name: 'Users',
            description: 'Handles the user updates, and deletes. Also, retrieves the user list.'
        },
        {
            name: 'Dogs',
            description: 'Provides the CRUD endpoints for administering the dogs breed information.'
        },
        {
            name: 'Temperaments',
            description: `Provides the CRUD endpoints for administering the dog's temperaments information.`
        },
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    host: 'localhost:8081'
};

if (process.env.RENDER) {
    doc.servers.push({
        url: process.env.RENDER_EXTERNAL_URL
    });
} else {
    doc.servers.push({
        url: `http://localhost:${process.env.PORT}`
    });
}

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc)
    .then(() => {
        require('../index');
    });