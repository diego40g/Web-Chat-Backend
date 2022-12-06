const { body } =require('express-validator')

exports.rules = (() => {
    return [
        body('firstName').notEmpty(),
        body('lastname').notEmpty(),
        body('gender').notEmpty(),
        body('email').isEmail(),
        body('password').optional().isLength({ min: 5})
    ]
})()