const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
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

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/psikolog", require("./psikologRoute/psikologAction"));
app.use("/user", require("./userRoute/index"));
app.use("/home", require("./homeRoute/home"));
/// localhost:3000/psikolog/addPsikolog
/// localhost:3000/user/register

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
