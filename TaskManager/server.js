const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3030;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./models');

app
    .use(cors())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      })
    .use("/", require("./routes"));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port, () => {
        console.log(`DB connected and Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Cannot connect to database.', err);
        process.exit();
    })
