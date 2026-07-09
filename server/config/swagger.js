const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API',
            version: '1.0.0',
            description: 'API REST du portfolio professionnel d\'Aboubacar Sidiki Doumbouya',
            contact: {
                name: 'Aboubacar Sidiki Doumbouya',
                email: 'sidiki940917@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Serveur local',
            },
            {
                url: 'https://portfolio-projet.onrender.com',
                description: 'Serveur de production',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);