//importando librerias
const Router = require('express').Router();
const path = require('path')
var MongoClient=  require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/NextU";
const citas = require('./eventsmodel.js')
var u = require('./middle.js')
const bodyParser = require('body-parser')
var express =  require('express')
var app = express();
var ObjectId = require('mongodb').ObjectId

//indicando uso de librerias
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

//Funcion que guarda los eventos asociados al usuario
Router.post("/new", function (req, res){
	req.session.user
//valida sesion y conecta a la BD
if (req.session.user){
	MongoClient.connect(url,{useNewUrlParser:true}, function(err, db){
		if (err) throw err;
		var base = db.db("NextU");
		var coleccion = base.collection("citas");
		coleccion.insertOne({
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

//Funcion que borra los eventos asociados al usuario según id de evento
Router.post("/delete/:id", function (req, res){
	//conecta a la BD
	MongoClient.connect(url,{useNewUrlParser:true}, function(err, db){
		const _id = ObjectId(req.params.id);
		if (err) throw err;
		var base = db.db("NextU");
		var coleccion = base.collection("citas");
 		citas.findByIdAndRemove({
			"_id":_id},(err,result)=>{
				if (err) return (err);
				res.send(result)

			})
			db.close();
});
});

//Funcion que actualiza los eventos segun el arrastre
Router.post("/events/update/:id", function (req, res){
//Conexion a la BD
	MongoClient.connect(url,{useNewUrlParser:true}, function(err, db){
		const _id = ObjectId(req.params.id)
		if (err) throw err;
		var base = db.db("NextU");
		var coleccion = base.collection("citas");
		try {
			;
			coleccion.updateOne(
				{"_id":_id },
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
	req.session.user= false;
	req.session.destroy(function(err) {
  			res.send("adios");
	})
});


module.exports = Router;
