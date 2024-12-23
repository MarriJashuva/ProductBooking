const jwt = require("jsonwebtoken");
const {userdb} = require("./userSchema");
const keysecrect = "Secrectkeyprivate";

const authenticate = async(req,res,next)=>{
       try{

        const token = req.headers.authorization;
        //  console.log(token);
        const verifytoken = jwt.verify(token,keysecrect);
        // console.log(verifytoken);

        const rootuser = await userdb.findOne({_id:verifytoken._id});
        // console.log(rootuser);

        if(!rootuser){throw new Error("user not found")}

        req.token = token;
        req.rootuser = rootuser;
        req.userId = rootuser._id;

        next();

        

       }catch(e){
               res.status(401).json({status:401,message:"Unauthorizing no token provide"});
       }
}

module.exports = authenticate;