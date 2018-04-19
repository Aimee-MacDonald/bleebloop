require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Email = require(__dirname + "/dbmodels/email");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || 8080);
