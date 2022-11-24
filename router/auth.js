const router = require('express').Router()

router.get('/login', (req,res) => {
    return res.send('Login screen works now')
})
router.get('/register', (req,res) => {
    return res.send('Register screen works now')
})

module.exports = router