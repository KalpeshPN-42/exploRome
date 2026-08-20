const Joi = require("joi");

module.exports.userSchema = Joi.object({
    // 🌟 1. Enforces proper email format checking (e.g., text@domain.com)
    email: Joi.string()
        .email({ minDomainSegments: 2 }) 
        .required()
        .messages({
            "string.email": "Please provide a valid email address.",
            "any.required": "Email is a required field."
        }),

    // 🌟 2. Restricts usernames to at least 3 characters
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.min": "Username must be at least 3 characters long.",
            "any.required": "Username is a required field."
        }),

    // 🌟 3. Protects password complexity before hashing it
    password: Joi.string()
        .min(4) // Change to 6 or 8 for production apps
        .required()
        .messages({
            "string.min": "Password must be at least 4 characters long.",
            "any.required": "Password is a required field."
        })
});