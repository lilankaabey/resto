const express = require("express");
const router = express.Router();

const Item = require('../models/item');

router.post("", (res, req, next) => {
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

router.put("/:itemId", (req, res, next) => {
  const item = new Item({
    _id: req.body.itemId,
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription
  });
  Item.updateOne({_id: req.params.itemId}, item).then(result => {
    res.status(200).json({message: 'Update Successful!'});
  });
});

router.get("", (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      message: 'Items fetched succesfully!',
      items: documents
    });
  });
});

router.get("/:itemId", (req, res, next) => {
  Item.findById(req.params.itemId).then(item => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found!' });
    }
  });
});

router.delete("/:itemId", (req, res, next) => {
  Item.deleteOne({_id: req.params.itemId}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!"});
  });
});

module.exports = router;