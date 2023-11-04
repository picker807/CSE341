const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3030;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./models');
const middleware = require("./middleware/middleware");
const passport = require('./config/passport');
const session = require('express-session');
const crypto = require('crypto');
 
const secret = crypto.randomBytes(64).toString('hex');
const corsOptions = {origin: '*'};

app
    .use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
    }))

    // Passport Initialization Middleware
    .use(passport.initialize())
    .use(passport.session())

    .use(cors(corsOptions))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .get('/', (req, res) => {
        res.send('Welcome to the home page');
    })
    .use("/users", middleware.ensureAuthenticated, require("./routes/users"))
    .use("/tasks", middleware.ensureAuthenticated, require("./routes/tasks"))
    .use("/auth", require("./routes/auth"))
    // Local login route
    /*.post('/login', passport.authenticate('local', {
        successRedirect: '/', // Redirect on success
        failureRedirect: '/', // Redirect on failure
        failureFlash: true // Enable flash messages for login failures
    }))
    .get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    }) */
    .use(middleware.errorHandler);

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
