const Router = require('express').Router();
const Users = require('./model.js')
const path = require('path')

Router.get('/', function (req, res) {
    res.sendFile('./index.html',{root: '/'});
    //res.sendFile(path.resolve('~/../client/index.html'))
});


Router.post('/login', function (req, res) {
  let username = req.body.user
  let pwd = req.body.pass
  let response
  console.log("usuario: "+username+", pwd: "+pwd)
    Users.findOne({"userID":username,"password":pwd}).exec(function(err,doc){
      if(err){
        return res.json({status:500, error:err})
        console.log(err)
      }
      //res.json(doc)
      console.log(doc)
      response = "Validado"
      res.sendFile(path.resolve(__dirname,'../client/main.html'))
      })

});

module.exports = Router;
