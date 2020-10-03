const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const port = 5000;

app.get('/',(res, req)=>{
    req.send('Works!!!')
})

app.listen(port);