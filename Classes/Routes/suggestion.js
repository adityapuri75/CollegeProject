const express = require("express");
const Suggetion = require("../Model/suggestion");
const router = express.Router();

router.get("/",async function (req, res) {
  try {
    var feedback = await Suggetion.find({isDisplay:true});
    res.json(feedback);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", function (req, res) {
  var feedback = new Suggetion({
    section: req.body.section,
    group: req.body.group,
    feedback: req.body.feedback,
  });

  feedback.save();
});

module.exports = router;
