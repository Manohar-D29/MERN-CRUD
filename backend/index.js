const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
require("./db/conn");
const router = require("./Rautes/auth");

//set app as express
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// route
app.use(router);

//app listen on port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
