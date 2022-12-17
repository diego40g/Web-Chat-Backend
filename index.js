const express = require('express');
const bodyParser= require('body-parser')
const http = require('http')
const config = require('./config/app');
const router = require('./router');
const SocketServer = require('./socket')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = config.appPort;
const server = http.createServer(app)
SocketServer(server)

server.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})