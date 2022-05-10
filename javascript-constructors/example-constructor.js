function ExampleConstructor() {
}

console.log('value of ExampleConstructor.prototype:', ExampleConstructor.prototype);
console.log('type of ExampleConstructor.prototype:', typeof ExampleConstructor.prototype);

var newExampleConstructor = new ExampleConstructor();
console.log('newExampleConstructor:', newExampleConstructor);

var boolean = newExampleConstructor instanceof ExampleConstructor;
console.log('boolean:', boolean);
