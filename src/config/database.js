const mongoose = require('mongoose');

const connectDB = async()=>{
 await mongoose.connect('mongodb+srv://admin:XdcLNQSTbe2HTSAL@nodedev.ospdc.mongodb.net/devTinder');
}

module.exports = {connectDB}