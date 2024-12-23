const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/HallWebsite").then(
    ()=>console.log('DB connenction established')
).catch((e)=>console.log(e))