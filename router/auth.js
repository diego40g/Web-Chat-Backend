const router = require('express').Router()
const { login, register } = require('../controllers/authController')
const { body } = require('express-validator')
const { validate } = require('../validators')

router.post('/login', login)
router.post('/register', [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('gender').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

    validate
],register)

module.exports = router