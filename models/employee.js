var mongoose = require('mongoose');

var labSchema = new mongoose.Schema({
    reactPh: Number,
    pH: Number,
    temperature: Number,
    dissOx: Number,
    ammonia: Number,
    mlss: Number,
    wasteVol: Number,
    date: Date,
})

var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    labs: [labSchema],
    googleId: String
})


module.exports = mongoose.model('Employee', employeeSchema);
