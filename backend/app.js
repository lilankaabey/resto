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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
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

app.put("/api/items/:itemId", (req, res, next) => {
  const item = new Item({
    _id: req.body.itemId,
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice.
    itemDescription: req.body.itemDescription
  });
  Item.updateOne({_id: req.params.itemId}, item).then(result => {
    res.status(200).json({message: 'Update Successful!'});
  });
});

app.get("/api/items", (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      message: 'Items fetched succesfully!',
      items: documents
    });
  });
});

app.get("/api/items/:itemId", (req, res, next) => {
  Item.findById(req.params.itemId).then(item => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found!' });
    }
  });
});

app.delete("/api/items/:itemId", (req, res, next) => {
  Item.deleteOne({_id: req.params.itemId}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!"});
  });
});

module.exports = app;
