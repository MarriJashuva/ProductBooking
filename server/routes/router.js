const express = require('express');
const {userdb,hall} = require('./userSchema');
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("./authenticate");



//for user registration

router.post("/register",async(req,res)=>{
     // console.log(req.body);

     const { fname, email, password, cpassword } = req.body;

     if (!fname || !email || !password || !cpassword) {
         res.status(422).json({ error: "fill all the details" })
      }
    
     try{

          const preuser = await userdb.findOne({email:email});
          if(preuser){
            res.status(422).json({error:"This Email is already exist"});
          }
          else if(password!==cpassword){

            res.status(422).json({error:"Password and Confirm Password Not Match"});

          }else{
            const finaluser = new userdb({fname,email,password,cpassword});
             // here password hasing 

          const storeData = await finaluser.save();
          // console.log(storeData);
          res.status(201).json({status:201,storeData});
          
          }

         

        }catch(e){
            console.log(e);
            console.log("catch block error");


        }

})

router.post("/login",async(req,res)=>{
    //  console.log(req.body);

     const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"});
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                // console.log(token);

               // cookiegenerate
               res.cookie("usercookie", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            });

                const result = {
                  userValid,
                  token
                }

                res.status(201).json({status:201,result});

      }
    }
    else{
      res.status(422).json({ error: "invalid details"});
    }

   }catch(e){
             res.status(401).json(error);
             console.log("catch block");
   }

});


// user valid

router.get("/validuser",authenticate,async(req,res)=>{
      try{
      
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});


      }catch(e){
        res.status(401).json({status:201,e});
      }
});

// user logout

router.get("/logout",authenticate,async(req,res)=>{
  try {
      req.rootuser.tokens =  req.rootuser.tokens.filter((curelem)=>{
          return curelem.token !== req.token
      });

      res.clearCookie("usercookie",{path:"/"});

      req.rootuser.save();

      res.status(201).json({status:201})

  } catch (error) {
      res.status(401).json({status:401,error})
  }
});


router.post("/hotel",authenticate,async(req,res)=>{
  const {name,capacity,imageUrl,cost,address} = req.body;
  const username = req.rootuser.fname;
  const email = req.rootuser.email;
  try{

      const redundancy =await  hall.findOne({name,capacity,imageUrl,cost,address});
      if(!redundancy){
      const newHall = new hall({name,capacity,imageUrl,cost,address,username,email});
      await newHall.save();
      return res.json(await hall.find())
    }
    if(redundancy.email===email){
         return res.status(201).json({error:"Already Booked By You"});
      }
    else{
       return res.status(201).json({error:"Already Booked By Other"});
    }

 }catch(err){
     console.log(err.message);
 }
});



router.get('/gethotel',authenticate,async (req, res) => {

  const username = req.rootuser.fname;
  const email = req.rootuser.email;

  try {

    const latestHotel = await hall.find({username,email}); // Find the latest hotel by sorting by _id in descending order

    if (latestHotel) {
      return res.json(latestHotel);
    } else {
      return res.status(404).json({ message: 'No hotels found.' });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ message: 'Internal Server Error' });
  }
});

router.delete("/deletehotel/:id", async (req, res) => {
  try {
    const deletedHotel = await hall.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).send("Hotel not found");
    }
    res.status(200).send("Hotel deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
});


// for admin

router.get("/gethalls", async (req, res) => {
  try {
    const halls = await hall.find();  // Fetch all halls
    res.json(halls); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching halls" });
  }
});

// Delete a hall by ID
router.delete("/deletehall/:id", async (req, res) => {
  try {
    const hallId = req.params.id;
    const deletedHall = await hall.findByIdAndDelete(hallId);

    if (!deletedHall) {
      return res.status(404).json({ message: "Hall not found" });
    }
    res.json({ message: "Hall deleted successfully", hall: deletedHall });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hall" });
  }
});



module.exports= router;


/*

//2 way connection
12345 --> jndksalak@3mc  (encryption)
jndksalak@3mc --> 12345 (decryption)

//1 way connection
//hasing
1234 --> jcjkxzklz@1
1234 -->(jcjkxzklz@1,jcjkxzklz@1)=>true



*/
