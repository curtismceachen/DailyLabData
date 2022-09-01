const Employee = require('../models/employee');

module.exports = {
    new: newLab,
    create,
    index,
    wasteVolCalc,
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
    let finalWasteVol = 0
    let currMLSS = 0
    let targetMLSS = 0
    res.render('employees/index', { 
      employees, 
      user: req.user, 
      finalWasteVol,
      currMLSS,
      targetMLSS
    })
  })
}

function wasteVolCalc(req, res) {
  console.log("I MADE IT HERE")
  Employee.find({}, function(err, employees) {
    const mlss = employees.flatMap(function(e) {
      return e.labs.map(function(l) {
        return l.mlss
      })
    })
    const wasteVol = employees.flatMap(function(e) {
      return e.labs.map(function(l) {
        return l.wasteVol
      })
    })
    const mlssOne = mlss.slice(1, Infinity)
    const mlssTwo = mlss.slice(0, mlss.length - 1)
    const yValues = mlssOne.map(function (num, idx) { 
      return num - mlssTwo[idx]
    });
    const xValues = wasteVol.slice(0, wasteVol.length - 1)
      
    let n = yValues.length
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXX = 0
    
    for (let i = 0; i < yValues.length; i++) {
      sumX += xValues[i]
      sumY += yValues[i]
      sumXY += (xValues[i]*yValues[i])
      sumXX += (xValues[i]*xValues[i])
    }
    
    let slope = (n * sumXY - sumX * sumY) / (n*sumXX - sumX * sumX)
    let yIntercept = (sumY - slope * sumX)/n
    
    let finalWasteVol = Math.round(((req.body.targetMLSS - req.body.currMLSS) - yIntercept) / slope)

    if (finalWasteVol < 0) {
      finalWasteVol = "0"
    }

    res.render('employees/index', {
      employees, 
      user: req.user, 
      finalWasteVol,
      currMLSS: req.body.currMLSS,
      targetMLSS: req.body.targetMLSS
    })
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
