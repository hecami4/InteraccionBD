//librerias requeridas
var prompt = require('prompt')
var MongoClient = require('mongodb').MongoClient
var user;
var pwd;
//crea prompt para creación de usuario
var prompt_attributes =[{
  name : 'user',
  validator: /^[a-zA-Z\s\-]+$/,
  warning: 'username not valid, it can only contain letters, spaces or dashes'
},
{
  name: 'pass',
  hidden: true,
  validator: /^[a-zA-Z\s\-]+$/,
  warning: 'pwd not valid, it can only contain letters, spaces or dashes'
  }
]
//inicializa prompt
prompt.start();
prompt.get(prompt_attributes,function(err,result){
  if (err){
    console.log(err);
    return 1;
  } else {
    console.log('Command-line received data: ');
    user = result.user;
    pwd =result.pass;
    console.log("user: "+user+", pwd: "+pwd);
    MongoClient.connect('mongodb://localhost:27017/NextU',{useNewUrlParser:true}, function (err,db){
      if (err) throw err;
      var dbo = db.db("NextU");
      var usr = {userID:user, password:(pwd)};
      dbo.collection('Usuario').insertOne(usr,function(err,res){
        if (err) throw err;
        console.log(usr+" fue insertado");
        db.close();
      })
    })
  }

})
