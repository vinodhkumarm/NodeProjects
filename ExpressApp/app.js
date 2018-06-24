// @ts-nocheck
/* jshint esversion:6 */

// input validator
const _ = require('underscore');
const express = require('express');
const appServer = express();
const courses = require('./data/courseCatalog').courses;
const Validator = require('./data/validations');

// body parsing
appServer.use(express.json());


// General utility functions
const isCourseExist = (req, res) => {
    let id = req.params.id;
    let course = courses.find(c => c.id === parseInt(id));

    if (!id || !course) {
        res.status(404).send('Requested course with the id not found');
        return course;
    }

    return course;
};

//// GET API methods
appServer.get('/', (req, res) => {
    res.send("Hello World");
});

appServer.get("/api/courses", (req, res) => {
    res.send(courses);
});

appServer.get("/api/courses/:id", (req, res) => {
    //res.send(req.params.id);
    var course = isCourseExist(req, res);

    if (course) {
        res.send(course);
    }
});

// appServer.get("/api/courses/:name", (req, res) => {
//     let course = courses.find(c => c.name.contains(req.param.name));

//     if (!course)
//         res.status(404).send('Requested course with the name not found');

//     res.send(course);
// });



//// POST API methods
appServer.post('/api/courses', (req, res) => {

    if (Validator.validate(req.body, res, Validator.AVAILABLE_SCHEMAS.Course)) {

        let course = {
            id: courses.length + 11,
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



//// PUT API method
const updateCourseDetail = (oldCourseDetail, updatedCourseDetail) => {
    return _.isUndefined(updatedCourseDetail) || _.isEmpty(updatedCourseDetail) ?
        oldCourseDetail :
        updatedCourseDetail;
};

appServer.put('/api/courses/:id', (req, res) => {

    if (Validator.IsValid(req.params.id, res) &&
        Validator.validate(req.params, res, Validator.AVAILABLE_SCHEMAS.ID) &&
        Validator.validate(req.body, res, Validator.AVAILABLE_SCHEMAS.Course)) {

        var course = isCourseExist(req, res);

        if (course) {
            course.author = updateCourseDetail(course.author, req.body.author);
            course.name = updateCourseDetail(course.name, req.body.name);
            course.published = updateCourseDetail(course.published, req.body.published);

            res.send(course);
        }
    }
});


//// DELETE API method
appServer.delete('/api/courses/:id', (req, res) => {

    if (Validator.IsValid(req.params.id, res) ||
        Validator.validate(req.params, res, Validator.AVAILABLE_SCHEMAS.ID)) {

        var course = isCourseExist(req, res);

        if (course) {
            let indexOfCourse = courses.indexOf(course);
            courses.splice(indexOfCourse, 1);

            res.send(course);
        }
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