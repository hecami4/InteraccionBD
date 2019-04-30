const mongoose = require ('mongoose');
const Schema = mongoose.Schema

var citasSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  titulo: {type: String, require:true, trim:true},
  fecha_ini:{type: Date, require:true },
  fecha_fin:{type: Date, require:true },
  hora_ini:{type: Date, require:true },
  hora_fin:{type: Date, require:true }
})

let citas = mongoose.model('Citas',citasSchema,'Citas')
module.exports = citasModel

module.exports.fetchCitas = function(date,callback){
  citas.find({year: date.year, month:date.month},callback);
};

module.exports.createCitas = function(newCitas,callback){
  newCitas.save(callback);
}

module.exports.editCitas = function(citasData,callback){
  Citas.findById(citasData.id,function(err,event){
    Citas.titulo = citasData.title;
    Citas.fecha_ini = citasData.fecha_ini;
    Citas.fecha_fin = citasData.fecha_fin;
    Citas.hora_ini = citasData.hora_ini;
    Citas.hora_fin = citasData.hora_fin;
    Citas.save(callback);
  })
}

module.exports.deleteCitas = function(citasID,callback){
  Citas.findById(citasID,function(err,event){
    event.remove(callback);
  })
}
