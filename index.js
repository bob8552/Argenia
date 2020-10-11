const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));

//CORS Headers
app.use((req, res, next) => {  
  res.header('Access-Control-Allow-Origin', 'http://argenia.bob8552.repl.co/');
  next();
});  

var isUp = process.env.STATUS;

//Use public
app.use(express.static("public"));

//Main page
app.get("/", (req, res) => {
  if (isUp === "DOWN") { 
    return res.sendFile(__dirname + "/views/unavailable.html");
  } else {
    return res.status(200).sendFile(__dirname + "/views/index.html");
  }
});

//Promo code (GET)
app.get("/promo", (req, res) => {
  res.send("Spooktober");
});

//App listen
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
