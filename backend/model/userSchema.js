const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number, required: true },
  department: { type: String, required: true },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

//hash password logic
userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//genarate token function
userschema.methods.generateAuthToken = async function () {
  try {
    let token = Jwt.sign({ _id: this._id }, process.env.SECRETE_KEY); //sign uses payload-unique key and secret key
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
    //
  } catch (error) {
    console.log(error);
  }
};

const usermanagement = new mongoose.model("usermanagement", userschema);
module.exports = usermanagement;
