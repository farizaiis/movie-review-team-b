const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const validation = require('./middlewares/validation');

// localhost:8080/
const port = 8080;
const router = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

// error handling
// app.use(validation);

app.get('*', function(req,res) {
    res.status(404).send('not found');
});

app.listen(port, () => {console.log(` server aktif di port: ${port}`)});



//TODO
//Uploadfile biar bisa set default pas create awal user & admin
//Uploadfile pas update/change ava data ga duplicate?
//Uploadfile poster
//Uploadfile poster ga duplicate
//Relasi semua