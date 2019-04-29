const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useCreateIndex',true)
let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
userID: {type: String, require:true, unique:true, trim:true},
password: {type: String, require:true, unique:false, trim:true}
})

let UserModel = mongoose.model('Usuario',UserSchema,'Usuario')
module.exports = UserModel

//mongoose.connect('mongodb://localhost/NextU')
