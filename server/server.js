const path = require('path');
const express = require('express');

const publicPath =  path.join(__dirname, '../public');

var app = express();
var port = process.env.PORT || 3000; //required for heroku 
// console.log(__dirname  + '/../public');
// console.log(publicPath);

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});