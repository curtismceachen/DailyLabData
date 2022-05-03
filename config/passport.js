const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Employee = require('../models/employee');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb) {
// ^^when a user logs in with oauth 
// check if in DB if not, add them
    Employee.findOne({'googleId': profile.id}, function(err, employee) {
        if (err) return cb(err)
        if (employee) {
            return cb(null, employee)
        } else {
            let newEmployee = new Employee({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            })
            newEmployee.save(function(err) {
                if (err) return cb(err)
                return cb(null, newEmployee)
            })
        }
    })
}))

passport.serializeUser(function(employee, done) {
    done(null, employee.id)
})

passport.deserializeUser(function(id, done) {
    Employee.findById(id, function(err, employee) {
        done(err, employee)
    })
})