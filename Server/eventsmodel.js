//importa librerias
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//crea esquema de mongo
var citasSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  titulo: {type: String, require:true, trim:true},
  fecha_ini:{type: Date, require:true },
  fecha_fin:{type: Date, require:true },
  hora_ini:{type: Date, require:true },
  hora_fin:{type: Date, require:true },
  fk_user:{type: String, require:true, trime:true}
})

//exporta el esquema
let citas = mongoose.model('citas',citasSchema,'citas')
module.exports = citas

module.exports.fetchCitas = function(date,callback){
  citas.find({year: date.year, month:date.month},callback);
};

module.exports.createCitas = function(newCitas,callback){
  newCitas.save(callback);
}

module.exports.editCitas = function(citasData,callback){
  citas.findById(citasData.id,function(err,event){
    citas.titulo = citasData.title;
    citas.fecha_ini = citasData.fecha_ini;
    citas.fecha_fin = citasData.fecha_fin;
    citas.hora_ini = citasData.hora_ini;
    citas.hora_fin = citasData.hora_fin;
    citas.save(callback);
  })
}

module.exports.deleteCitas = function(citasID,callback){
  citas.findById(citasID,function(err,event){
    event.remove(callback);
  })
}
