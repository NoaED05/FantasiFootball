const express = require("express");
const sqlite3 = require('better-sqlite3')
const db = sqlite3('team.db', {verbose:console.log})
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }));

app.post("/addUser", (request, response) => {
    const sql = db.prepare('INSERT INTO user (username,password,points) VALUES (?,?,?)')
    
    const info = sql.run(request.body.username, request.body.password, request.body.points)
    console.log("Amount changes done: " + info.changes)
    console.log("lastInsertRowID: " + info.lastInsertRowID)
    
  
    response.redirect("http://localhost:3000/")
})

app.post("/login", (request, response) => {
    const sql = db.prepare("SELECT * FROM user WHERE username=(?)")
    const results = sql.get(request.body.username)
    if (request.body.password === results.password){
       response.redirect("http://localhost:3000/")
    }
    else {
        console.log("shit")
        response.redirect("back")
    }

})






app.listen("3000", () => {
    console.log("UP!")
})