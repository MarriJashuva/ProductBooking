const express = require('express');
const app = express();
const cors = require("cors");
require("./db/conn");
const cookieParser = require('cookie-parser');
const router = require("./routes/router");
const port = 8009;


//app.get("/",(req,res)=>{
//         res.status(201).json("server created");
//})
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server running at port : ${port}`);
})