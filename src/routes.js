const express = require('express');
const routes = express.Router();

const SearchController = require('./controllers/SearchController');

routes.get('/', (req,res)=>{
  res.status(200).send();
});

routes.post('/search', SearchController.search);


module.exports = routes;