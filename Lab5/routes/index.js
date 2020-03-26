const Router = require('express')();

const AuthorsController = require('../Authors/controllers.js');

Router.use('/authors', AuthorsController);

module.exports = Router;