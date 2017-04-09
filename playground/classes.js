class Person {
    constructor (name, age) { //constructor function within class gets called by default do not need to explicitly call 
                    //gets called with the arguments specified when creating a new class instance
        this.name = name //this refers to individual instance created
        this.age = age //this.age is referring the created instance age is = age passed in 
    }
    getUserDescription() { //method for the class doesn't require a comma 
        return `${this.name} is ${this.age} year(s) old`
    }
}

var me = new Person('Boob', 25);
console.log('this.name', me.name);
console.log('this.age', me.age);
var description = me.getUserDescription();
console.log(description);

//methods can be any function with or without arguments 