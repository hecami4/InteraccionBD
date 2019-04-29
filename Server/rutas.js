const Router = require('express').Router();
const path = require('path')
var MongoClient=  require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/NextU";
const citas = require('./eventsmodel.js')
var u = require('./middle.js')
const bodyParser = require('body-parser')
var express =  require('express')
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


// Funcion que muestra los eventos asociados al usuario
Router.get("/all", function (req, res){
	req.session.user
	console.log("rutas ln 17 "+ req.session.user)

	//conecto la base de datos
			MongoClient.connect(url,{useNewUrlParser:true}, function (err, db){
			var base = db.db("NextU");
			var coleccion = base.collection("citas");
      coleccion.find({"fk_usuario": req.session.user}).toArray(function (error, citas){
				if (error) throw error;
				res.send(citas);
				console.log(citas)
			});
		  db.close();
		});


});


Router.post("/new", function (req, res){
	req.session.user
  console.log(req.session)
  console.log("sesion ln 31 "+ req.session.user)
if (req.session.user){
	MongoClient.connect(url,{useNewUrlParser:true}, function(err, db){
		if (err) throw err;
		var base = db.db("NextU");
		var coleccion = base.collection("citas");
		//var nID = req.body.titulo.trim() + Math.floor(Math.random(0),100 )+1;

		coleccion.insertOne({
			//_id:nID,
			titulo:req.body.titulo,
			fecha_ini:req.body.fecha_ini,
			fecha_fin: req.body.fecha_fin,
			hora_ini: req.body.hora_ini,
			hora_fin: req.body.hora_fin,
			fk_usuario: req.session.user
		});
		res.send(req.session.user)

		db.close();
	});
}	else{
	res.send("noLOGIN con "+req.session.user);
}

});

Router.post("/delete", function (req, res){

	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var base = db.db("NextU");
		var coleccion = base.collection("Citas");

		try{
		coleccion.remove({
			_id:req.body.id,
			fk_usuario: req.session.email_user
		});
		res.send("Evento borrado con exito!  :)");
		}catch (err){
			res.send(err);
		}



		db.close();
	});
});

Router.post("/update", function (req, res){

	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var base = db.db("NextU");
		var coleccion = base.collection("Citas");
		try {
			;
			coleccion.update(
				{_id:req.body.id },
				{$set:{
						fecha_ini: req.body.start,
					  fecha_fin: req.body.end,
						hora_ini: req.body.end_hour,
						hora_fin: req.body.start
					}
				}
			);
			res.send("El evento se ha cambiado con exito! :)");
		} catch(e){
			console.log(e);
		}



		db.close();
	});
});

Router.get("/logout", function (req,res){
	req.session.email_user= false;
	req.session.destroy(function(err) {
  			res.send("adios");
	})
});


module.exports = Router;
