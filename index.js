const express = require("express");
const app = express();
const mongoose = require("mongoose");
//import ini
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.url_db || 3000, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("tersambung ke db");
  })
  .catch((err) => console.log(err));

//nambah ini
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/psikolog", require("./psikologRoute/psikologAction"));
app.use("/user", require("./userRoute/index"));
app.use("/home", require("./homeRoute/home"));
/// localhost:3000/psikolog/addPsikolog
/// https://gocure.herokuapp.com/psikolog/addPsikolog
/// localhost:3000/user/register

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT || 3001, "0.0.0.0", () => {
  console.log(`sukses`);
});
