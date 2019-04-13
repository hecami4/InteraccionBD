const http = require('http');
const hostname = ('127.0.0.1');
const PORT = 3000
const express = require ('express')
const Routing = require ('./rutas.js')
const app = express();
const path = require ('path')
const bodyParser = require('body-parser')
const Mongoose = require ('mongoose')

const Server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('client'))
app.use('/users', Routing)

Server.listen(PORT,function(){
  console.log('Server is listening on PORT: '+PORT)
})
