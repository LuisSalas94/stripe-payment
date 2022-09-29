const express = require("express");
const cors = require("cors");
const products = require("./products");
const app = express();
//Authentification
const mongoose = require("mongoose");
//Authentification
const register = require("./routes/register");
//Authentification
const login = require("./routes/login");
//Payment
const stripe = require("./routes/stripe");

//Authentification
require("dotenv").config();

app.use(express.json());
app.use(cors());
//Authentification
app.use("/api/register", register);
//Authentification
app.use("/api/login", login);
//Payment
app.use("/api/stripe", stripe);

app.get("/", (req, res) => {
	res.send("Welcome to our online Shop API");
});

app.get("/products", (req, res) => {
	res.send(products);
});

const port = process.env.PORT || 5000;
//Authentification
const uri = process.env.DB_URI;

app.listen(port, console.log(`Server started on port ${port}`));

//Authentification
mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB successfully");
	})
	.catch((err) => console.log("MongoDB connection error", err.message));
