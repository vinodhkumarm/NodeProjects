const Joi = require('joi');

// Catalog of available validation schemas
const AvailableSchemas = {
    Course: 'course',
    ID: 'id'
};

// Schemas
const courseSchema = {
    name: Joi.string().min(3).required(),
    author: Joi.string().min(2).required().optional(),
    published: Joi.number().optional()
};

const idSchema = {
    id: Joi.number().min(2).required().positive().integer(),
};

// Utility function
const fetchValidationSchema = (scheme) => {
    if (scheme === 'course') {
        return courseSchema;
    }
    if (scheme === 'id') {
        return idSchema;
    }

    return false;
};

// Generic Validation method
const validate = (reqBody, res, schemaName) => {
    var schema = fetchValidationSchema(schemaName);

    if (schema) {
        var validationResult = Joi.validate(reqBody, schema);

        if (validationResult.error) {
            //res.status(400).send(validationResult.error);
            res.status(400).send(validationResult.error.details[0].message);
            return false;
        } else {
            return true;
        }
    } else {
        console.log(`No validation schema with name ${schemaName} found`);
        return true;
    }
};

module.exports.validate = validate;
module.exports.AVAILABLE_SCHEMAS = AvailableSchemas;