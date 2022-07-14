const employee = require('../models/employee');
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
  console.log("This is the lab", lab)
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
  // perhaps make that req.params.id to stop error from occurring, then
  // everyone can change/alter lab results
  Employee.findById(req.user.id, function(err, employee) {
    console.log(" EMPLOYEE", employee)
    res.render('employees/edit', {employee, lab: employee.labs.id(req.params.id), user: req.user})
  })
}

function update(req, res) {
  console.log("this is req.body", req.body)
  // console.log("this is req.params.id", req.params.id)
  // Employee.findById(req.body.employeeId, function(err, employee) {
  //   console.log("This is it", employee)
  //   employee.labs.id(req.params.id).update({
  //         // employee.labs.findByIdAndUpdate(req.params.id, {
  //     reactPh: req.body.reactPh,
  //     pH: req.body.pH,
  //     temperature: req.body.temperature,
  //     dissOx: req.body.dissOx,
  //     ammonia: req.body.ammonia,
  //     date: req.body.date,
  //   })
  //   employee.save(function(err) {
      res.redirect('/labs');
  //   })
  // })
}
  
  




// Employee.findByIdAndUpdate(req.params.id, function(err, employee) {
          // let myLab = employee.labs.id(req.params.id)
      // console.log("req.params.id", req.params.id)
      // employee.save(function(err) {
      // res.redirect('/labs')
    // })
          //res.render('employees/show', { employee, user: req.user, myLab })
  // })
// }