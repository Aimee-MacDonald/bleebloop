require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Email = require(__dirname + "/dbmodels/email");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/subscribe", (req, res) => {
  let newEmail = new Email({
    email: req.body.email
  });

  newEmail.save(err => {
    if(err) throw err;
  });
  
  res.render("thanks");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || 8080);
