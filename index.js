const express = require('express');
const bodyParser= require('body-parser')

const config = require('./config/app');
const router = require('./router');

const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

const port = config.appPort;

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})