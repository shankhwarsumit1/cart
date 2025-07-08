const mongoose = require('mongoose');

const connectDB = async()=>{
   await mongoose.connect(`mongodb+srv://shankhwarsumit117:g911cCyAywMgjika@sumitdb.r1aimze.mongodb.net/mongodb`)
};

module.exports = connectDB;