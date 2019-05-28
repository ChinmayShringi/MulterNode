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
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myimage');

function checkFileType(file, cb){
    // file extension
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mine type
    const  mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else{
        cb('Error Images Only!');
    }
}

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