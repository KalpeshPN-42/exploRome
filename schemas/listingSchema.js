const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0).max(9999999),

    // Allow image to be optional, empty string, or null
    image: Joi.alternatives()
        .try(
            Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required(),
            }),
            Joi.string().allow("", null),
            null,
        )
        .optional(),

    location: Joi.string().required(),
    country: Joi.string().required(),

    longitude: Joi.number().optional().allow("", null),
    latitude: Joi.number().optional().allow("", null),
    // Allow geometry if it's included in req.body
    geometry: Joi.object({
        type: Joi.string().valid("Point").required(),
        coordinates: Joi.array().items(Joi.number()).length(2).required(),
    }).optional(),
});
