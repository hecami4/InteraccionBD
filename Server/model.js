const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
userID: {type: String, require:true, unique:true, trim:true},
password: {type: String, require:true, unique:false, trim:true}
})

lef UserModel = mongoose.model('Usuario',UserSchema)
module.exports = Usuario

//mongoose.connect('mongodb://localhost/NextU')
