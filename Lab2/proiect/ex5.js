const express = require('express');

const app = express();
    
app.get('/', (req, res) => {
    const moment = require('moment');
    var date = moment(new Date());
    res.send(date.format('YYYY-LL-ZZThh:mm'));
});
    
app.listen(3000);