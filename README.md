Daily Lab Data

This project is a storage site for wastewater treatment plant lab data. Each day plant operators conduct a series of lab tests on the water they're treating, and record the results on paper. This web application allows them to backup this data on the cloud in order to better protect it.

Once users have signed in to a Google account, they can add, delete, or update lab results.

Technologies used include MongoDB/Mongoose, Express Generator, Node.js, and Google's OAuth + Passport.


Link to deployed app: https://tp-lab-data.herokuapp.com/


Icebox items:

- expand user authentication to include more user authorization as well
- create functionality that will take the MLSS and wasting volumes and develop a relationship between the two, and use that to tell the operator how much to waste that day