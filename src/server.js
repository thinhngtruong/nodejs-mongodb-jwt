const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const initAPIs = require("./routes");
const { DB_URI } = require("./config/DB.config");

dotenv.config();

mongoose.connect(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
	console.log("Connected to MongoDB");
});

const app = express();

app.use(express.json());

initAPIs(app);

const port = process.env.PORT || 8017;

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});