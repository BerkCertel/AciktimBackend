const express = require("express");
const path = require('path')
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require('./auth');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require("sequelize"); 
const db = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//testing api
app.get("/", (req, res) => {
    res.json({ message: "hello from api" });
});

// Database ve server
const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log("Connected to the database");
        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
        });
    })
    .catch(err => {
        console.error("Error:", err);
    });
