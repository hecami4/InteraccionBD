//librarias necesarias
const http = require('http');
const hostname = ('0.0.0.0');
const PORT = 3000
const express = require ('express')
const mongoose = require ('mongoose')
const Router = require ('./Server/rutas.js')
const path = require ('path')
const bodyParser = require('body-parser')
var app = express()
const Server = http.createServer(app)
var events     =  require('./Server/rutas');
var session = require('express-session')
var Users = require('./Server/model.js')
var user

//variable de sesion
app.use(session({
  secret: "NU",
  resave: true,
  saveUninitialized: false,
  cookie: {secure:false, maxAge:36000000}
}))
//uso de las librerias
app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', Router);
app.use('/events', events);

//escucha inicio de sesion
Router.get('/', function (req, res) {
    res.sendFile('./index.html',{root: '/'});
    req.session.user
});

//Router de inicio, envía los datos de login a validar
Router.post('/login', function (req, res) {
  let username = req.body.user
  let pwd = req.body.pass
  let response
  console.log("usuario: "+username+", pwd: "+pwd)
    Users.findOne({"userID":username,"password":pwd}).exec(function(err,doc){
      if(err) throw err;
      if (doc && doc._id){
        if (pwd == doc ["password"]){
        console.log("first name is "+doc.userID)
         req.session.user = username
         console.log(req.session)
         response = "Validado"
        res.send(response)
        } else {
          res.send("invalid login")
        }
      } else {
        res.send("invalid login")
      }
    })

});

//conexion a server
mongoose.connect('mongodb://localhost:27017/NextU',{useNewUrlParser:true});
mongoose.connection
.on ('connected',()=>{
  console.log('Mongoose connection open on '+ mongoose.collection);
})
.on ('error', (err)=>{
  console.log('connectiobn error: '+err.message);
});

//configuracion de servidor
Server.listen(PORT,function(){
  console.log('Server is listening on PORT: '+PORT+' and dirname '+__dirname)
})
