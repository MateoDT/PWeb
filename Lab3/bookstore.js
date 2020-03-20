const express = require('express');
const bookRouter = require('./bookRouter.js');
 
const app = express();
 
app.use('/books', bookRouter);
 
app.listen(3000, () => console.log('App is listening on port 3000'));