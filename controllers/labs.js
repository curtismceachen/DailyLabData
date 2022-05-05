const Employee = require('../models/employee');

module.exports = {
    new: newLab,
    create,
    index,
    show
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
  Employee.findById(req.params.id, function(err, employee) {
    res.render('employees/show', { employee, user: req.user })
  })
}