const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('myimage');

const port = 4200;

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req,res) => {
    res.render('index');
});

app.post('/upload', (req,res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index',{
                msg: err
            });            
        } else{
            console.log(req.file);
            res.send('test');
        }
    });
});

app.listen(port, () =>{
    console.log('server started at port: ' +port);
});