const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.Promise = global.Promise;

dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.task = require('./taskModel.js');
db.user = require('./userModel.js');

module.exports = db; 