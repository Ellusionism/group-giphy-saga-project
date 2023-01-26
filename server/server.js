const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// App PORT set with production check
const PORT = process.env.PORT || 5000;

// Route includes
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

// Routes
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);

app.get('/search', (req, res) => {
  // Here is where we will ask the Giphy API
  // for data:
  let searchTerm = req.params 
  axios({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?api_key=${giphy_api_key}&q=${searchTerm}`
  }).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    console.log('GET /gifs fail:', error);
    res.sendStatus(500);
  })
})

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
