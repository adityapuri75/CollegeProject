
const express = require("express");
const router = express.Router();
const User = require("../Model/user");


router.post("/", async function (req, res) {
  const newUser = {
    name: req.body.displayName,
    image: req.body.image,
    googleId: req.body.email,
    group: req.body.group,
    section: req.body.section,
    university: req.body.university,
  };

  let user = await User.findOne({ googleId: req.body.email });

  if (user) {
    res.send({ message: "User Already In Database" });
  } else {
    user = await User.create(newUser);
    res.json(user);
  }
});

router.put("/user:userId", async function (req, res) {
    User.findByIdAndUpdate(req.params.userId, {
      $set: req.body,
    }).then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.userId,
        });
      }
      res.send(data);
    });
  });

  module.exports = router;
  
  