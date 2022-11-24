const router = require('express').Router()

router.post('/login', (req,res) => {
    return res.send(['Login screen works now',req.body])
})
router.get('/register', (req,res) => {
    return res.send('Register screen works now')
})

module.exports = router