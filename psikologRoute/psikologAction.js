const express = require("express");
const mongoose = require("mongoose");
const psikologSchema = require("../schema/psikologSchema");
const router = express.Router();
const cors = require("cors");

//create psikolog
router.post("/addPsikolog", cors(), (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
    nama: req.body.nama,
    alamat: req.body.alamat,
    patients: req.body.patients,
  };

  return psikologSchema.create(payload, (err, data) => {
    if (err) {
      res.json({
        msg: "tabel gagal dibuat",
      });
    } else {
      data.save((err, result) => {
        if (err) {
          res.json({
            msg: "Data gagal dimasukan",
          });
        } else {
          res.json({
            msg: result,
          });
        }
      });
    }
  });
});

//get psikolog
router.get("/getPsikolog", (req, res) => {
  return psikologSchema.find({}, (err, result) => {
    if (err) {
      res.json({
        msg: "data tidak ditemukan",
      });
    } else {
      res.json({
        msg: result,
      });
    }
  });
});

module.exports = router;
