const express = require('express');

const config = require('./config/app');
const app = express();

const port = config.appPort;

app.get('/home', (req, res) => {
    return res.send('home screen')
})
app.get('/login', (req, res) => {
    return res.send('login screen')
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})