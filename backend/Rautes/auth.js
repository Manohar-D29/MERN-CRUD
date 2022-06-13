const router = require("express").Router();
const userModel = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const authanticate = require("../middleware/authanticate");

// register data
router.post("/register", async (req, res) => {
  const { name, username, email, password, number, department } = req.body;

  if (!name || !username || !email || !password || !number || !department) {
    return res.status(422).json({ message: "please insert the data" });
  }
  try {
    const userexist = await userModel.findOne({ email: email });
    if (userexist) {
      res.status(422).json({ massage: "Email already Present use new Email" });
    }
    const adduser = new userModel({
      name,
      username,
      email,
      password,
      number,
      department,
    });

    await adduser.save();
    res.status(201).json({ massage: "User Register Successfully" });
  } catch (error) {
    res.status(422).json({ massage: "Error Occured" });
  }
});

//get user data diplay data

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await userModel.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get induvisual data
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await userModel.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update data
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletuser = await userModel.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//login or signin
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "please insert the data" });
    }

    const userLogin = await userModel.findOne({ email: email }); //cheacking user exist or not

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password); //checking userdatabase password and intered password is correct or not

      //create the token
      token = await userLogin.generateAuthToken();
      console.log(token);

      //store in cookies
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(422).json({ massage: "Invalid Credential" });
      }
      res.status(201).json({ massage: "User Login Successfully" });
    } else {
      res.status(422).json({ massage: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", authanticate, (req, res) => {
  console.log(`Hello my register`);
  res.send(req.rootUser);
});

router.get("/about", authanticate, (req, res) => {
  console.log(`Hello my About`);
  res.status(201).send(req.rootUser);
});

router.get("/logout", authanticate, (req, res) => {
  console.log(`Hello my logout`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(201).send("user logout");
});

// register data
router.post("/signup", async (req, res) => {
  const { name, username, email, password, number, department } = req.body;

  if (!name || !username || !email || !password || !number || !department) {
    return res.status(422).json({ message: "please insert the data" });
  }
  try {
    const userexist = await userModel.findOne({ email: email });
    if (userexist) {
      res.status(422).json({ massage: "Email already Present use new Email" });
    }
    const adduser = new userModel({
      name,
      username,
      email,
      password,
      number,
      department,
    });

    await adduser.save();
    res.status(201).json({ massage: "User Register Successfully" });
  } catch (error) {
    res.status(422).json({ massage: "Error Occured" });
  }
});

module.exports = router;
