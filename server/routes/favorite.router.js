const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
router.post('/', (req, res) => {
  const gif = req.body
  console.log(gif);
  const sqlQuery = `
  INSERT INTO "likes" ("url", "title")
  VALUES ($1, $2)
  `;
  sqlValues = [gif.url, gif.title]
  pool.query(sqlQuery, sqlValues)
  .then((response) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.error('Error in POST (favorite.router.js):', error);
  });
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
