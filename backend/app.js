const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const itemsRoutes = require('./routes/items');

const app = express();

mongoose.connect("mongodb+srv://lilanka:xQ80UNWaPjbTCct5@cluster0-d5hq9.mongodb.net/resto?retryWrites=true")
  .then(() => {
    console.log("Conencted to database!");
  })
  .catch(() => {
    console.log("Conncetion failed!");
  });

app.use(bodyParser.json()); //This will return valid express midleware
app.use(bodyParser.urlencoded({ extended: false })); //This will not needed here.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/items", itemsRoutes);
module.exports = app;
