var mongoose = require('mongoose')

var labSchema = new mongoose.Schema({
    pH: Number,
    ammonia: Number,
    mlss: Number,
    wasteVol: Number,
    inletTurbidity: Number,
    outletTurbidity: Number,
    coagDose: Number,
    date: Date,
})

var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    labs: [labSchema],
    googleId: String
})


module.exports = mongoose.model('Employee', employeeSchema)
