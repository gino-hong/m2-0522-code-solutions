const takeAChance = require('./take-a-chance');

const note = takeAChance('Gino');
note.then(note => {
  console.log(note);
});
note.catch(error => {
  console.error(error.message);
});
