const Employee = require('../models/employee');

module.exports = {
    index
}

function index(req, res, next) {
    console.log(req.query)
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    let sortKey = req.query.sort || 'name';
    Employee.find(modelQuery)
    .sort(sortKey).exec(function(err, employees) {
        if (err) return next(err);
        res.render('employees/index', { 
            employees, 
            name: req.query.name, 
            sortKey,
            user: req.user
        });
    });
}