Daily Lab Data

This application uses an algorithm for recommending process changes for water treatment operators, and works as a cloud storage site for treatment plant lab data.

Each day plant operators conduct a series of lab tests on the water they're treating, and make changes to their process based on those numbers. This app develops a relationship between the MLSS results and daily waste volumes using linear regression, and based on this relationship, tells the user how much they should waste today in order to achieve tomorrow's MLSS target.


How To Use The App:

Once users have signed in to a Google account, they can add, delete, or update lab results, as well as use the MLSS-Wasting Calculator.

The calculator is accessed via the "View Lab Results" page. Simply enter a number for the current MLSS and target MLSS, and click submit. The recommended waste volume will be displayed below.

Technologies used include MongoDB/Mongoose, Express, Node.js, and Google's OAuth + Passport, as well as materialize for styling.


Link to deployed app: https://tp-lab-data.herokuapp.com/


Icebox items:

- Add another algorithm for recommending alum dosage based on previous dosages and reactive phosphorous levels.