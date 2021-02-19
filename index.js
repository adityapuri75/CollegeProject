var express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const userRoute = require("./Classes/Routes/users");
const classRoute = require("./Classes/Routes/classes");
const notification = require("./oneSignal/automate");

const connectDB = require("./config/db");

require("./auth/google")(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use("/timetable", classRoute);
app.use("/user", userRoute);
app.use("/notification", notification);



app.use(passport.initialize());

app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);


connectDB();

app.listen(process.env.PORT || 4000, function () {
  console.log("Server Started .....");
});
