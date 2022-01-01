const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.post("/register", (req, res) => {
  const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
  const userModel = new userSchema();
  userModel.username = req.body.username;
  userModel.password = encryptedPassword;

  return userModel.save((err, data) => {
    if (err) {
      res.json({
        msg: "user gagal dimasukan",
      });
    } else {
      res.json({
        msg: "user berhasil dimasukan",
        data,
      });
    }
  });
});

router.post("/login", cors(), (req, res) => {
  payload = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log(payload);

  return userSchema.findOne({ username: payload.username }, (err, result) => {
    if (err) {
      res.json({
        msg: "salah email",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        jwt.sign({ payload }, "luthfi", (err, token) => {
          if (token) {
            res.json({
              msg: "berhasil login",
              result,
              token,
            });
          }
        });
      } else {
        res.json({
          msg: "salah password",
        });
      }
    }
  });
});

module.exports = router;
