const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecrect = "Secrectkeyprivate";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cpassword: {
      type: String,
      required: true,
      minlength: 6,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: "version", // Specify the version key field
  }
);

// hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }

  next();
});

// token generate

userSchema.methods.generateAuthtoken = async function () {
  try {
    // ... (your existing code)

    const token = jwt.sign({ _id: this._id }, keysecrect, {
      expiresIn: "1d",
    });

    this.tokens.push({ token }); // Push to the tokens array
    await this.save(); // Save the document with the updated tokens array

    return token;
  } catch (error) {
    console.error(error); // Log any errors
    throw error; // Re-throw the error for proper error handling in the route
  }
};

// creating model

const userdb = new mongoose.model("userdb", userSchema);
// coll name      //model name


const hallSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    capacity:{
        type:String,
        required:true
    },
    imageUrl: {
        type: String, // Store the image address (URL) as a string
        required: true
      },
    cost:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true 
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

});


const hall = mongoose.model("hall", hallSchema);

module.exports = {userdb,hall};
