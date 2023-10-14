const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Task Manager',
        description: 'Track tasks in a group. Keep up on due dates and collaborate.',
    },
    host: 'localhost:3030',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
require('./server.js')});