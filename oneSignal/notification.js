 module.exports = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic NTdjM2ViMWEtZGIyMi00MTQyLWIzMGQtMTVkZGIzYjc4MmYy"
    //   "Authorization": "Basic MzRhMzBiNjctNWNlYS00NmZjLWFiMjktY2U2ODFiY2RkMzM3

    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  
//   var message = { 
//     // app_id: "a1b8c730-a67e-47ac-9081-f8a481a6ad8c",
//     app_id: "c0069866-c963-42d5-9cda-f05f59b99886",
//     contents: {"en": "English Message"},
//     included_segments: ["Subscribed Users"]
//   };
  
//   sendNotification(message);