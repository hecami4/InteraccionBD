const Router = require('express').Router();
Router.get('/all', function(req,res){
  Users.find({}).exec(function(err,docs){
    if(err){
      res.status(500)
      res.json(err)
    }
    res.json(docs)
  })
})


Router.get('/', function(req,res){
let nombreUsuario = req.query.nombreUsuario
let pass = req.query.pass
Users.findOne({user:nombreUsuario, password:pass}),exec(function(err,doc){
  if (err){
    res.status(500)
    res.json(err)
  }
  res.json(doc)
})
})

module.exports = Router
