const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required(),
    feedback: Joi.string().required(),
});
