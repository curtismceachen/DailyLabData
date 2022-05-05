var mongoose = require('mongoose');

var labSchema = new mongoose.Schema({
    reactPh: Number,
    pH: Number,
    temperature: Number,
    dissOx: Number,
    ammonia: Number,
    date: Date,
    //employees: [employeeSchema]
})

var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    labs: [labSchema],
    googleId: String
})



//627141a888ca03d1bfdc99a3 need to work this in so it expects it

module.exports = mongoose.model('Employee', employeeSchema);
