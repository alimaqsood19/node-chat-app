var moment = require('moment');

//Unix Epic Jan 1st 1970 00:00:00 am UTC, timezone independant 
// positive numbers are in the future
// negative numbers are in the past 
// numbers are stored as miliseconds 1000ms = 1s 

var date = new Date();
console.log(date.getMonth()); //0 index value 

var date = moment(); //current point in time 
date.add(1, 'year').subtract(2, 'months');
console.log(date.format('MMM Do, YYYY')); //pattern that grabs the short hand version of current month, the year
//


var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var newDate = moment(1491527399621); //From this moment in time 
console.log(newDate.format('h:mm a'))