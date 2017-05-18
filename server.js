var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/urls');
global.config = 'qwertyuiop'

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);



app.listen(8080, function(){
console.log('server listening at port 8080');
})