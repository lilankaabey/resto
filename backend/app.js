const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Item = require('./models/item');

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/items", (res, req, next) => {
  const item = new Item({
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription
  });
  item.save().then(createdItem => {
    res.status(201).json({
      message: 'Item added successfully',
      itemId: createdItem._id
    }); //This is a typical status code for everything
  });  // is okay a new resource was created
});

app.get("/api/items", (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      items: documents
    });
  });
});

app.delete("/api/items/:itemId", (req, res, next) => {
  Item.deleteOne({_id: req.params.itemId}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!"});
  });
});

module.exports = app;
