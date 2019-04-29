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

app.use(session({
  secret: "NU",
  resave: true,
  saveUninitialized: false,
  cookie: {secure:false, maxAge:36000000}
}))
app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', Router);
app.use('/events', events);

Router.get('/', function (req, res) {
    res.sendFile('./index.html',{root: '/'});
    req.session.user
    //res.sendFile(path.resolve('~/../client/index.html'))
});


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
            //res.sendFile(path.resolve(__dirname,'../client/main.html'))
});

mongoose.connect('mongodb://localhost:27017/NextU',{useNewUrlParser:true});
mongoose.connection
.on ('connected',()=>{
  console.log('Mongoose connection open on '+ mongoose.collection);
})
.on ('error', (err)=>{
  console.log('connectiobn error: '+err.message);
});


Server.listen(PORT,function(){
  console.log('Server is listening on PORT: '+PORT+' and dirname '+__dirname)
})
