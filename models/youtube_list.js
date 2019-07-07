const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Defining schema for list
const ytlistSchema = mongoose.Schema({
    name:{ type:String,required:true, unique: true},
    subscribers :{ type:String},
    videos:{ type:String}
});
ytlistSchema.plugin(uniqueValidator);
const Ytlist = mongoose.model( 'Ytlist' , ytlistSchema);

module.exports.Ytlist=Ytlist;