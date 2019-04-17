const Router = require('express').Router();
const Users = require('./model.js')

Router.get('/all', function (req, res) {
    res.sendFile('./index.html',{root: '/'});
    //res.sendFile(path.resolve('~/../client/index.html'))
});


Router.get('/', function (req, res) {
   let nombre = req.query.user

});

Router.post('/login', function (req, res) {
  let username = req.body.user
  let pwd = req.body.pass
  console.log("usuario: "+username+", pwd: "+pwd)
    Usuario.findOne({userID:username,password:pwd}).exec(function(err,doc){
      if(err){
        res.status(500)
        res.json(err)
      }
      res.json(doc)
      res.sendFile ('./main.html');
    })

});

module.exports = Router;
