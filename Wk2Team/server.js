
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

//static files
app.use(express.static('public'));

//routes
app.use('/', require('./routes'));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});