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
      console.log("this is" + employee)
      employee.save(function(err) {
        res.redirect('/labs');
      });
      
    });
}

function index(req, res) {
  Employee.find({}, function(err, employees) {
    console.log(employees)
    res.render('employees/index', { employees, user: req.user })
  })
}

function show(req, res) {
  let lab = req.user.labs.id(req.params.id)
  console.log(lab)
  Employee.findById(req.user.id, function(err, employee) {
    console.log("THIS IS THE USER ID", req.user.labs)
    let myLab = employee.labs.id(req.params.id)
    console.log("THIS IS MYLAB", myLab)
    res.render('employees/show', { employee, user: req.user, myLab })
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
    res.render('employees/edit', {lab: employee.labs.id(req.params.id), user: req.user})
  })
}

function update(req, res) {
  Employee.findById(req.user.id, function(err, employee) {
    //let myLab = employee.labs.id(req.params.id)
    employee.save(function(err) {
      res.redirect('/labs')
    })
    //res.render('employees/show', { employee, user: req.user, myLab })
  })
}