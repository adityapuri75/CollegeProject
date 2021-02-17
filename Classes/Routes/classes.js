//Routes of classes
const express = require("express");
const Classes = require("../Model/classes");
const router = express.Router();

router.get("/section/:section/:group/:date", async function (req, res) {
  console.log(req.params.section);
  console.log(req.params.date);

  var timetable = await Classes.find({
    section: req.params.section,
    date: req.params.date,
    group:req.params.group
  });
  res.send(timetable);
});

router.delete("/id:id", async function (req, res) {
  var timetable = await Classes.findOne(req.params.id);

  if (timetable != null) {
    timetable.deleteOne();
    res.send({ message: "success" });
  }
});

router.post("/", function (req, res) {
  const timetable = new Classes({
    section: req.body.section,
    group: req.body.group,
    time: req.body.time,
    date: req.body.date,
    subject: req.body.subject,
    link: req.body.link,
  });
  console.log(timetable);
  timetable.save();

  res.json(timetable);
});

module.exports = router;
