const express = require("express");
const Classes = require("../Classes/Model/classes");
const router = express.Router();

router.get("/", async function (req, res) {

  
  var d = new Date();
  var n = d.getDay();
  var day;
  //day computer match data
  if (n == 0) {
    day = "Sunday";
  } else if (n == 1) {
    day = "Monday";
  } else if (n == 2) {
    day = "Tuesday";
  } else if (n == 3) {
    day = "Wednesday";
  } else if (n == 4) {
    day = "Thursday";
  } else if (n == 5) {
    day = "Friday";
  } else if (n == 6) {
    day = "Saturday";
  }

  var timetable = await Classes.find();
  const notifications = require("./notification");
res.send(timetable);

  var localTime ="0"+ (d.getHours() %12) + ":" + d.getMinutes();

  if(d.getHours()>=9 && d.getHours()<=17){

    timetable.forEach( (element) =>  {
      var time = element.time.toString();
      var dataTime =  time.substring(0, time.indexOf(" "));
      console.log(dataTime,localTime,day,element.date);
      if (localTime == dataTime && day == element.date) {
        var message = {
          app_id: "a1b8c730-a67e-47ac-9081-f8a481a6ad8c",
          contents: { en: "You have " + element.subject + " class now" },
          filters: [
            {
              field: "tag",
              key: element.section,
              relation: "=",
              value: element.group,
            },
          ],
        };
        
        notifications(message);
        res.end;
      }
  
  
    });
  }
 

});

module.exports = router;
