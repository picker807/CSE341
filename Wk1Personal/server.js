//index.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

// json middleware handling
app
	.use(bodyParser.json())

	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
		);
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow_methods', 'GET, POST, PUT, DELETE, OPTIONS');
		next();
	})

	.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
