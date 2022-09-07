## Daily Lab Data

This application uses a machine learning algorithm for recommending process changes for water treatment operators, and works as a cloud storage site for treatment plant lab data.

Each day plant operators conduct a series of lab tests on the water they're treating, and make changes to their treatment process based on those numbers. This app develops a relationship between the MLSS results and daily waste volumes using linear regression, and based on this relationship, tells the user how much they should waste today in order to achieve tomorrow's MLSS target.

Using the most current lab data submitted by the user, this machine learning algorithm gets more accurate with every entry, and helps remove the guess work from water treatment.


#### How To Use The App

Once users have signed in to a Google account, they can create, delete, or update their own lab results, as well as use the MLSS-wasting algorithm calculator.

The calculator is accessed via the "View Lab Results" page. Simply enter a number for the current MLSS and target MLSS, and click submit. A linear regression will be run in the controller function and the recommended waste volume will be displayed inside the calculator.


#### Technologies Used

Technologies used include MongoDB/Mongoose, Express, Node.js, and Google's OAuth + Passport, as well as materialize for styling.


Link to deployed app: https://tp-lab-data.herokuapp.com/


#### Icebox items:

- Add another algorithm for recommending alum dosage based on previous dosages and reactive phosphorous levels.