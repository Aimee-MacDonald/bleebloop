const express = require("express");
const app = express();

require('dotenv').config()

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || 8080);
