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
    // map a new array of lab objects with the parent employee id
    // and name included in each lab object
    let labsIndex = employees.flatMap(function(e) {
      return e.labs.map(function(l){
        return {
          employeeId: e.id, 
          name: e.name,
          id: l.id,
          reactPh: l.reactPh,
          pH: l.pH,
          temperature: l.temperature,
          dissOx: l.dissOx,
          ammonia: l.ammonia,
          mlss: l.mlss,
          wasteVol: l.wasteVol,
          date: l.date
        }
      })
    })
    labsIndex.sort((a, b) => a.date - b.date)
    res.render('employees/index', { 
      employees,
      labsIndex,
      user: req.user, 
    })
  })
}

function wasteVolCalc(req, res) {
  Employee.find({}, function(err, employees) {
    // map a new array of lab objects with the parent employee id
    // and name included in each lab object
    let labsIndex = employees.flatMap(function(e) {
      return e.labs.map(function(l){
        return {
          employeeId: e.id, 
          name: e.name,
          id: l.id,
          reactPh: l.reactPh,
          pH: l.pH,
          temperature: l.temperature,
          dissOx: l.dissOx,
          ammonia: l.ammonia,
          mlss: l.mlss,
          wasteVol: l.wasteVol,
          date: l.date
        }
      })
    })
    labsIndex.sort((a, b) => a.date - b.date)

    // labs with no date, mlss, or wasteVol data need to be filtered out of the
    // array before performing the linear regression
    let filteredLabsIndex = labsIndex.filter(function(l) {
      if(l.mlss !== null && l.wasteVol !== null && l.date !== null) {
        return l
      }
    })

    let mlss = filteredLabsIndex.map(function(l) {
      return l.mlss
    })
    let wasteVol = filteredLabsIndex.map(function(l) {
      return l.wasteVol
    })
    
    let mlssOne = mlss.slice(1, Infinity)
    let mlssTwo = mlss.slice(0, mlss.length - 1)
    let yValues = mlssOne.map(function (num, idx) { 
      return num - mlssTwo[idx]
    });
    let xValues = wasteVol.slice(0, wasteVol.length - 1)
    
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
      labsIndex,
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
