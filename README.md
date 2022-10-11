## Daily Lab Data

Each day plant operators conduct a series of lab tests on the water they're treating, and make changes to their treatment process based on those numbers. This application uses two machine learning algorithms for recommending those process changes, while also working as a cloud storage site for lab data.


#### Regression Neural Network
Using that lab data, this app performs a regression neural network on the inlet turbidity, coagulant dosage, and resulting outlet turbidity levels. Then, using this neural network, it provides a calculator that determines how much coagulant needs to be dosed in order to reach tomorrow's turbidity level target.


#### Linear Regression
A second calculator develops a relationship between the MLSS results and daily waste volumes using linear regression, and based on this relationship, tells the user how much they should waste today in order to reach tomorrow's MLSS target.

Using the most current lab numbers submitted by the user, these machine learning algorithms get more accurate with every entry, and help to remove the guess work from water treatment.


#### How To Use The App

![calculators](/public/images/calculators.png?raw=true)

Once users have signed in to a Google account, they can create, delete, or update lab results, as well as use the coagulant dosage or MLSS-wasting algorithm calculators.

The calculators are accessed via the "View Lab Results" page, as shown above. Simply enter a number for the inlet turbidity and outlet turbidity, and click calculate. Or, in the case of the MLSS-wasting calculator, enter the current MLSS and target MLSS, and click calculate. The machine learning algorithms will be run in the controller file and the recommended values will be displayed inside each calculator.


#### Technologies Used

Technologies used include MongoDB/Mongoose, Express, Node.js, and Google's OAuth + Passport, as well as materialize for styling. Brain.js used for the artificial neural network.


Link to deployed app: https://tp-lab-data.herokuapp.com/