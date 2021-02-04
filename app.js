//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/secretDB",{useUnifiedTopology: true,useNewUrlParser: true});

const secretSchema = new mongoose.Schema({
username : String,
password : String
});

const Secret = mongoose.model("Secret",secretSchema);

app.get("/",(req,res)=>{
  res.render("home");
})

app.get("/login",(req,res)=>{
  res.render("login");
})

app.get("/register",(req,res)=>{
  res.render("register");
})

app.post("/register",(req,res)=>{
  const newUser = new Secret({
    username : req.body.username,
    password : req.body.password
  })
  newUser.save((err)=>{
    if(!err)
    res.render("secrets");
    else
    console.log(err);
  })
})

app.post("/login",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  Secret.findOne({username : username},(err,foundItem)=>{
    if(!err)
    {
      if(foundItem.password === password)
      res.render("secrets");
    }
  })
})

app.listen(3000,()=>{
  console.log("Server started at port 3000");
})
