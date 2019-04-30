//importa librerias de mongo
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//crea esquema de tabla de usuarios
mongoose.set('useCreateIndex',true)
let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
userID: {type: String, require:true, unique:true, trim:true},
password: {type: String, require:true, unique:false, trim:true}
})

let UserModel = mongoose.model('Usuario',UserSchema,'Usuario')
module.exports = UserModel

//mongoose.connect('mongodb://localhost/NextU')
