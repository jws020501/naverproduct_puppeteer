const express = require("express");
const app = express()

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/",(req,res)=>{
    res.render("login")
})

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})