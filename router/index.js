const router = require('express').Router()

router.get('/home', (req, res) => {
    return res.send('home screen')
})
router.get('/login', (req, res) => {
    return res.send('login screen')
})

module.exports = router