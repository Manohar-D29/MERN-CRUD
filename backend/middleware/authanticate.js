const Jwt = require("jsonwebtoken");
const userModel = require("../model/userSchema");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const authanticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = Jwt.verify(token, process.env.SECRETE_KEY);

    const rootUser = await userModel.findOne({
      id: verifyToken._id,
      "tokens.token": token,
    });

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(422).send("Unauthorized:No token provided");
    console.log(error);
  }
};

module.exports = authanticate;
