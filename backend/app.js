const express = require('express');

const app = express();

app.use('/api/items', (req, res, next) => {
  const items = [
    {
      id: 'fadf14253l',
      itemName: 'First server-side post',
      itemPrice: 550.00,
      itemDescription: 'This is coming from the server'
    },
    {
      id: 'osiada541po',
      itemName: 'Second server-side post',
      itemPrice: 650.00,
      itemDescription: 'This is coming from the server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    items: items
  });
});


module.exports = app;
