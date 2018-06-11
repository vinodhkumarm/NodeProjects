/*jshint esversion:6*/
const express = require('express');
const appServer = express();


appServer.get("/", (req, res) => {
    res.send("Hello World");
});

appServer.get("/advanced", (req, res) => {
    res.send("Hello World Adv");
});

appServer.listen(3003, (req, res) => {
    console.log("Listening");
});