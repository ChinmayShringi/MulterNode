const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const app = express();

const port = 4200;

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req,res) => {
    res.render('index');
});

app.listen(port, () =>{
    console.log('server started at port: ' +port);
});