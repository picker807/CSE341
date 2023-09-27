//index.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

// json middleware handling
app.use(bodyParser.json());

//routes
app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
