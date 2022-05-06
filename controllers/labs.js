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
    //for (let key in req.body) {
	  //  if (req.body[key] === "") delete req.body[key];
	//}
    //const lab = new Lab({
      //  reactPh: req.body.reactPh,
        //pH: req.body.pH,
        //temperature: req.body.temperature,
        //dissOx: req.body.dissOx,
        //ammonia: req.body.ammonia,
        //date: req.body.date,
    //});
  
    Employee.findById(req.params.id, function(err, employee) {
      employee.labs.push(req.body);
      console.log("this is" + employee)
      // is this not being pushed?
      //or is it just not an array?
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
    let myLab = employee.labs.id(req.params.id) //for update + delete*
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
    //let myLab = employee.labs.id(req.params.id) //for update + delete*
    employee.save(function(err) {
      res.redirect('/labs')
    })
    //res.render('employees/show', { employee, user: req.user, myLab })
  })
  
  //Employee.updateOne(req.params.id, req.body)
  //res.redirect('/labs')
}