const express = require('express');
const app = express();
const data = require('./data.json');

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});

app.get('/api/notes', (req, res) => {
  const array = [];
  for (const property in data.notes) {
    array.push(data.notes[property]);
  }
  res.json(array);
});

app.get('/api/notes/:id', (req, res) => {
  if (Number(req.params.id) < 1) {
    res.status(400).json(
      {
        error: 'id must be a positive integer'
      }
    );
  } else if (data.notes[req.params.id] === undefined) {
    res.status(404).json(
      {
        error: `cannot find note with id ${req.params.id}`
      }
    );
  } else {
    res.json(data.notes[req.params.id]);
  }
});

app.use(express.json());
const fs = require('fs');

app.post('/api/notes', (req, res) => {
  if (req.body.content === undefined) {
    res.status(400).json(
      {
        error: 'content is a required field'
      }
    );
  } else {
    req.body.id = data.nextId;
    data.notes[String(data.nextId)] = req.body;
    data.nextId++;
    fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf-8', function (err) {
      if (err) {
        res.status(500).json(
          {
            error: 'An unexpected error occurred.'
          }
        );
      } else {
        res.status(201).json(req.body);
      }
    });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  if (Number(req.params.id) < 1) {
    res.status(400).json(
      {
        error: 'id must be a positive integer'
      }
    );
  } else {
    if (data.notes[req.params.id] === undefined) {
      res.status(404).json(
        {
          error: `cannot find note with id ${req.params.id}`
        }
      );
    } else {
      delete data.notes[req.params.id];
      fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf-8', function (err) {
        if (err) {
          res.status(500).json(
            {
              error: 'An unexpected error occurred.'
            }
          );
        } else {
          res.status(204).json();
        }
      });
    }
  }
});
