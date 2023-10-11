const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3030;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

try {
    // Connect to MongoDB using the environment variable
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require(swaggerDocument)));
app.use(bodyParser.json());
app.use("/", require("./routes"));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});