const express = require("express");
const sqlite3 = require('better-sqlite3')
const db = sqlite3('user.db', {verbose:console.log})
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }));










app.listen("3000", () => {
    console.log("UP!")
})