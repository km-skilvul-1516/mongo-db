const express = require("express");
const mongoose = require("mongoose");
const homeSchema = require("../schema/homeSchema");
const userSchema = require("../schema/userSchema");
const cloudinary = require("../conf/cloudinary");
const multer = require("../conf/multer");
const cors = require("cors");
const router = express.Router();

//multer berguna untuk mindahin file
router.post(
  "/createRumah",
  multer.single("gambarRumah"),
  cors(),
  (req, res) => {
    //proses upload gambar
    let upload = cloudinary.uploader.upload(req.file.path);

    //kalo upload udah beres
    upload.then((resultUpload) => {
      const home = new homeSchema();
      home.warnaRumah = req.body.warna;
      home.nomerRumah = req.body.nomer;
      home.alamatRumah = req.body.alamatRumah;
      home.anggotaRumah = req.body.anggotaRumah;
      home.homeGambar = resultUpload.secure_url;
      home.cloudinaryId = resultUpload.public_id;
      home.jumlahLike = 0;

      return home.save((err, result) => {
        if (err) {
          res.json({
            msg: "data gagal dimasukan",
          });
        } else {
          res.json({
            msg: "rumah berhasil dibuat",
            result,
          });
        }
      });
    });
  }
);

router.get("/getAllHome", (req, res) => {
  return homeSchema.find({}, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json({
        result: result,
      });
    }
  });
});

router.post("/updateHome", (req, res) => {
  const id = req.body.id;
  const payload = {
    warnaRumah: req.body.warna,
  };

  return homeSchema.findOneAndUpdate(
    { _id: req.body.id }, //filter
    payload, //isi
    (err, result) => {
      if (err) {
        res.json({
          msg: "gagal di update",
        });
      } else {
        res.json({
          msg: "berhasil di update",
          result,
        });
      }
    }
  );
});

router.delete("/deleteRumah", (req, res) => {
  const id = req.body.id;

  return homeSchema.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json({
        msg: "berhasil di hapus",
        result,
      });
    }
  });
});

router.post("/likeRumah", cors(), (req, res) => {
  const payloadAwal = {
    idRumah: req.body.idRumah,
    idUser: req.body.idUser,
  };

  return homeSchema.findOne(
    { _id: payloadAwal.idRumah },
    (err, resultRumah) => {
      if (err) {
        res.sendStatus(404);
      } else {
        const payload = {
          jumlahLike: resultRumah.jumlahLike + 1,
        };

        return homeSchema.findOneAndUpdate(
          { _id: payloadAwal.idRumah },
          payload,
          (err, resultUpdate) => {
            if (err) {
              res.sendStatus(400);
            } else {
              return userSchema.findOne(
                { _id: payloadAwal.idUser },
                (err, resultUser) => {
                  if (err) {
                    res.sendStatus(404);
                  } else {
                    const likedRumah = {
                      warnaRumah: resultUpdate.warnaRumah,
                      nomerRumah: resultUpdate.nomerRumah,
                      alamatRumah: resultUpdate.alamatRumah,
                      anggotaRumah: resultUpdate.anggotaRumah,
                    };

                    resultUser.likedHome.push(likedRumah);

                    return userSchema.findOneAndUpdate(
                      { _id: payloadAwal.idUser },
                      { likedHome: resultUser.likedHome },
                      (err, resultUpdate) => {
                        if (err) {
                          res.sendStatus(404);
                        } else {
                          res.sendStatus(200);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// router.post('/getById', (req, res) => {
//   return homeSchema.findOne({_id: req.body.id})
// })

module.exports = router;
