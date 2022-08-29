const Employee = require('../models/employee');

module.exports = {
    new: newLab,
    create,
    index,
    show,
    delete: deleteLab,
    edit,
    update
}

function newLab(req, res) {
  res.render('employees/new', {user: req.user})
}

function create(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    employee.labs.push(req.body);
    employee.save(function(err) {
      res.redirect('/labs');
    });
    
  });
}

function index(req, res) {
  Employee.find({}, function(err, employees) {
    res.render('employees/index', { employees, user: req.user })
  })
}

function show(req, res) {
  Employee.findById(req.user.id, function(err, employee) {
    let myLab = employee.labs.id(req.params.id)
    res.render('employees/show', { 
      employee, 
      user: req.user, 
      myLab 
    })
  })
}

function deleteLab(req, res) {
  Employee.findById(req.user.id, function(err, employee) {
    employee.labs.id(req.params.id).remove()
    employee.save(function(err) {
      res.redirect('/labs')
    })
  })
}

function edit(req, res) {
  Employee.findById(req.user.id, function(err, employee) {
    res.render('employees/edit', {
      employee, 
      lab: employee.labs.id(req.params.id), 
      user: req.user
    })
  })
}

function update(req, res) {
  Employee.updateOne({ _id: req.body.employeeId, 'labs._id': req.params.id },
    { $set: {
      'labs.$.reactPh': req.body.reactPh,
      'labs.$.pH': req.body.pH,
      'labs.$.temperature': req.body.temperature,
      'labs.$.dissOx': req.body.dissOx,
      'labs.$.ammonia': req.body.ammonia,
      'labs.$.mlss': req.body.mlss,
      'lab.$.wasteVol': req.body.wasteVol,
      'labs.$.date': req.body.date,
  }}, (err) => {
      res.redirect('/labs');
  })
}
