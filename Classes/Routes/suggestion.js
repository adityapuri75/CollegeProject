const express = require("express");
const suggestion = require("../Model/suggestion");
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
  var feedback =new Suggetion({
    section: req.body.section,
    group: req.body.group,
    feedback: req.body.feedback,
  });
   feedback.save();
 res.json(feedback);
});

router.patch("/patch/:id",async function (req, res) {
  var id=req.params.id
  var isdisplay = req.body.isDisplay
  suggestion.findById(id,function(err,data){
    data.isDisplay=isdisplay;
    data.save(function(err){
      if (err) throw err;
      res.send("Data Updated")
    })
  })
});

router.get("/all",async function (req, res) {
  try {
    var feedback = await Suggetion.find();
    res.json(feedback);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
