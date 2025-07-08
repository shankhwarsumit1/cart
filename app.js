const express = require('express');
const app = express();
const connectDB = require('./utils/database');


connectDB()
     .then(()=>{
        console.log('connection made');
        app.listen(3000,()=>{
            console.log('server is running');
        })
     })
     .catch((err)=>{
        console.log('database not connected',err.message);
     })