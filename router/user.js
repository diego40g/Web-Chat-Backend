const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')
const { rules: updateRules} = require('../validators/auth/user/update')
const { auth } = require('../middleware/auth')

router.post('/update', [auth, updateRules, validate], update)

module.exports = router
