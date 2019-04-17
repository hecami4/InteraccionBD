const http = require('http');
const hostname = ('0.0.0.0');
const PORT = 3000
const express = require ('express')
const mongoose = require ('mongoose')
require('dotenv').config()
const Router = require ('./rutas.js')
const path = require ('path')
const bodyParser = require('body-parser')
var app = express()
const Server = http.createServer(app)

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/users', Router);


mongoose.connect(process.env.DATABASE,{useNewUrlParser:true});
mongoose.Promise = global.Promise;
mongoose.connection
.on ('connected',()=>{
  console.log('Mongoose connection open on'+ process.env.DATABASE);
})
.on ('error', (err)=>{
  console.log('connectiobn error: '+err.message);
});


Server.listen(PORT,function(){
  console.log('Server is listening on PORT: '+PORT+' and dirname '+__dirname)
})
