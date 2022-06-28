const data = require('./data.json');
const fs = require('fs');

if (process.argv[2] === 'read') {
  for (const number in data.notes) {
    console.log(`${number}: ${data.notes[number]}`);
  }
}

if (process.argv[2] === 'create') {
  data.notes[String(data.nextId)] = process.argv[3];
  data.nextId++;
  fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8', err => {
    if (err) throw err;
  });
}

if (process.argv[2] === 'delete') {
  delete data.notes[process.argv[3]];
  fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8', err => {
    if (err) throw err;
  });
}

if (process.argv[2] === 'update') {
  data.notes[process.argv[3]] = process.argv[4];
  fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8', err => {
    if (err) throw err;
  });
}
