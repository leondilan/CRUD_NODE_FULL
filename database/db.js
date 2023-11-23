const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crud_node')
    .then(() => console.log('Connected!'))
    .catch((e) => console.log(e))

module.exports=mongoose