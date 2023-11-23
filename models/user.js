const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{ type: String,required:true },
    name: { type: String,required:true },
    pays: { type: String,required:true},
    ville: { type: String,required:true },
    tel: { type: String,required:true },
    nomImage: { type: String,required:true },
    date: { type: Date, default: Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports=userModel