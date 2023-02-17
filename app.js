const express = require("express");
const sqlite3 = require('better-sqlite3')
const db = sqlite3('user.db', {verbose:console.log})
const path = require("path")
const session = require('express-session');


const app = express()

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "safe secret",
    resave: false,
    saveUninitialized: false
}));


app.post("/addUser", (request, response) => {
    const sql = db.prepare('INSERT INTO user (username,password,points  ) VALUES (?,?,?)')
    
    const info = sql.run(request.body.username, request.body.password, request.body.points)
    console.log("Amount changes done: " + info.changes)
    console.log("lastInsertRowID: " + info.lastInsertRowID)
    
  
    response.redirect("/")
})

app.post("/login", (request, response) => {
    const sql = db.prepare("SELECT * FROM user WHERE username =(?)")
    const results = sql.get(request.body.username)
    if (request.body.password == results.password){
        request.session.logedIn = true
        response.redirect("/")
    }
    else {
        console.log("shit")
        request.session.logedIn = false
        response.redirect("back")
    }
  
    
})

app.post("/predict", (request,response) => {

console.log(request.body)
    
})



app.listen("3000", () => {
    console.log("UP!")
})