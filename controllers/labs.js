const Employee = require('../models/employee');
const brain = require('brainjs');


module.exports = {
    new: newLab,
    create,
    index,
    wasteVolCalc,
    coagDoseCalc,
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
    employee.labs.push(req.body)
    employee.save(function(err) {
      res.redirect('/labs')
    });
  });
}

function index(req, res) {
  Employee.find({}, function(err, employees) {
    // Map a new array of lab objects with the parent employee id
    // and name included in each lab object.
    let labsIndex = employees.flatMap(function(e) {
      return e.labs.map(function(l){
        return {
          employeeId: e.id, 
          name: e.name,
          id: l.id,
          pH: l.pH,
          ammonia: l.ammonia,
          mlss: l.mlss,
          wasteVol: l.wasteVol,
          inletTurbidity: l.inletTurbidity,
          outletTurbidity: l.outletTurbidity,
          coagDose: l.coagDose,
          date: l.date
        }
      })
    }).sort((a, b) => a.date - b.date)
    
    res.render('employees/index', { 
      employees,
      labsIndex,
      user: req.user, 
    })
  })
}

function wasteVolCalc(req, res) {
  Employee.find({}, function(err, employees) {
    // The calculator re-renders the index page, so will need to grab
    // the data for the table, not just for the calculator.
    // Map a new array of lab objects with the parent employee id
    // and name included in each lab object
    let labsIndex = employees.flatMap(function(e) {
      return e.labs.map(function(l){
        return {
          employeeId: e.id, 
          name: e.name,
          id: l.id,
          pH: l.pH,
          ammonia: l.ammonia,
          mlss: l.mlss,
          wasteVol: l.wasteVol,
          inletTurbidity: l.inletTurbidity,
          outletTurbidity: l.outletTurbidity,
          coagDose: l.coagDose,
          date: l.date
        }
      })
    }).sort((a, b) => a.date - b.date)

    // Labs with no date, mlss, or wasteVol data need to be filtered out of the
    // array before performing the linear regression.
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
    
    // Arrays now set, begin the linear regression.
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

function coagDoseCalc(req, res) {
  Employee.find({}, function(err, employees) {
    // The calculator rerenders the index page, so will need to grab all
    // the data for the table, not just for the calculator.
    // Map a new array of lab objects with the parent employee id
    // and name included in each lab object.
    let labsIndex = employees.flatMap(function(e) {
      return e.labs.map(function(l){
        return {
          employeeId: e.id, 
          name: e.name,
          id: l.id,
          pH: l.pH,
          ammonia: l.ammonia,
          mlss: l.mlss,
          wasteVol: l.wasteVol,
          inletTurbidity: l.inletTurbidity,
          outletTurbidity: l.outletTurbidity,
          coagDose: l.coagDose,
          date: l.date
        }
      })
    }).sort((a, b) => a.date - b.date)

    let turbidity = labsIndex.map(function(l) {
      return {
        inletTurbidity: l.inletTurbidity,
        outletTurbidity: l.outletTurbidity
      }
    }).slice(1, Infinity)
    
    let coagDosages = labsIndex.map(function(l) {
      return {
        coagDose: l.coagDose
      }
    }).slice(0, -1)
    console.log(coagDosages)

    // Finalize the training data, and divide the inputs/outputs to below 1 so 
    // that Brain.js can handle them.
    let trainingData = turbidity.map(function(t, index) {
      let coagDosage = coagDosages[index].coagDose
      return {
        input: [t.inletTurbidity / 120, t.outletTurbidity / 5], 
        output: [coagDosage / 70]
      }
    })

    // The array is prepared, begin artifical neural network.
    const net = new brain.NeuralNetwork()

    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.02
    })
  
    const finalCoagDose = Math.round(net.run([req.body.inletTurbidity, req.body.outletTurbidity]) * 70)
    
    res.render('employees/index', {
      user: req.user,
      labsIndex,
      finalCoagDose,
      inletTurbidity: req.body.inletTurbidity,
      outletTurbidity: req.body.outletTurbidity
    })
  })
}

function show(req, res) {
  Employee.findById(req.user.id, function(err, employee) {
    res.render('employees/show', { 
      employee, 
      user: req.user, 
      myLab: employee.labs.id(req.params.id)
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
      user: req.user,
      myLab: employee.labs.id(req.params.id)
    })
  })
}

function update(req, res) {
  // To access embedded lab document, must pass parent employee Id and
  // child lab Id in arguments. Also, "$" communicates that it is an element
  // being updated, not an object.
  Employee.updateOne({ _id: req.body.employeeId, 'labs._id': req.params.id },
    { $set: {
      'labs.$.pH': req.body.pH,
      'labs.$.ammonia': req.body.ammonia,
      'labs.$.mlss': req.body.mlss,
      'labs.$.wasteVol': req.body.wasteVol,
      'labs.$.inletTurbidity': req.body.inletTurbidity,
      'labs.$.outletTurbidity': req.body.outletTurbidity,
      'labs.$.coagDose': req.body.coagDose,
      'labs.$.date': req.body.date,
  }}, (err) => {
      res.redirect('/labs')
  })
}
