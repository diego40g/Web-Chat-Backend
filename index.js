const express = require('express');

const app = express()

const port = 3000

app.get('/home', (req, res) => {
    return res.send('home screen')
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})