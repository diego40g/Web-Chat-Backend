const router = require('express').Router()
const { login, register } = require('../controllers/authController')
const { validate } = require('../validators')
const { rules: registrationRules } = require('../validators/auth/register')

router.post('/login', login)
router.post('/register', [
    registrationRules,
    validate
],register)

module.exports = router