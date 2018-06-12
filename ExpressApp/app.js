// @ts-nocheck
/* jshint esversion:6 */

// input validator
const express = require('express');
const appServer = express();
const courses = require('./data/courseCatalog').courses;
const Validator = require('./data/validations');


// body parsing
appServer.use(express.json());


// GET API methods
appServer.get('/', (req, res) => {
    res.send("Hello World");
});

appServer.get("/api/courses", (req, res) => {
    res.send(courses);
});

appServer.get("/api/courses/:id", (req, res) => {
    //res.send(req.params.id);
    let course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        res.status(404).send('Requested course with the id not found');

    res.send(course);
});

appServer.get("/api/courses/:name", (req, res) => {
    let course = courses.find(c => c.name.contains(req.param.name));

    if (!course)
        res.status(404).send('Requested course with the name not found');

    res.send(course);
});



//// POST API methods
appServer.post('/api/courses', (req, res) => {
    if (Validator.validate(req.body, res, 'course')) {

        let course = {
            id: courses.length + 1,
            //name: req.params.name,
            // author: req.params.author,
            // published: req.params.published
            // we have to read from the content parsed from the req body
            // for that we are using body parses, by passing express.json
            name: req.body.name,
            author: req.body.author,
            published: req.body.published
        };

        courses.push(course);
        res.send(course);
    }
});

//PORT
// for windows in cmd 'SET PORT = 5000
// for mac in cmd 'export PORT=5000
const port = process.env.PORT || 3003;

appServer.listen(port, (req, res) => {
    var date = new Date(0);
    date.setUTCSeconds(Date.now());
    console.log(`Listening on port ${port}... Started on ${date.toTimeString()}`);
});