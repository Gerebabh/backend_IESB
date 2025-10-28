require('dotenv').config(); 
const produtosRouter = require('./routes/produtosRouter'); 

const mongoose = require('mongoose'); 
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

mongoose
.connect(url)
.then(() => { 
    console.log("Conectado no MONGODB!")
})
.catch((err) => { 
    console.log("Erro ao conectador no MONGODB", err.message); 
})

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/produtos', produtosRouter);



module.exports = app;