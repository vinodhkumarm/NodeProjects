const Joi = require('joi');

const courseSchema = {
    name: Joi.string().min(3).required(),
    author: Joi.string().min(2).required(),
    published: Joi.number().optional()
};

const validate = (reqBody, res, schemaName) => {

    if (schemaName === 'course') {
        var validationResult = Joi.validate(reqBody, courseSchema);

        if (validationResult.error) {
            //res.status(400).send(validationResult.error);
            res.status(400).send(validationResult.error.details[0].message);
            return false;
        } else {
            return true;
        }
    }
};

module.exports.courseSchema = courseSchema;
module.exports.validate = validate;