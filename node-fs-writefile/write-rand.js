var fs = require('fs');

var random = Math.floor(Math.random() * 100);
var data = `${random.toString()} \n`;

fs.writeFile('random.txt', data, 'utf8', err => {
  if (err) throw err;
});
