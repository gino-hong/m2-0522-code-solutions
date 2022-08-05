const express = require('express');
const app = express();

const pg = require('pg');

// only create ONE pool for your whole server
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to port 3000!');
});

app.get('/api/grades', (req, res) => {
  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
  `;
  db.query(sql)
    .then(result => {
      const rows = result.rows;
      res.status(200).json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

const expressJSON = express.json();
app.use(expressJSON);

app.post('/api/grades', (req, res) => {
  if (req.body.name === undefined || req.body.course === undefined || req.body.score === undefined) {
    res.status(400).json({
      error: 'Missing name, course, or score'
    });
  } else if (req.body.score < 0 || req.body.score > 100 || !Number.isInteger(req.body.score)) {
    res.status(400).json({
      error: 'Score must be an integer from 0 to 100.'
    });
  } else {
    const sql = `
    insert into "grades" ("name", "course", "score")
      values ($1, $2, $3)
    returning *
  `;
    const params = [req.body.name, req.body.course, req.body.score];
    db.query(sql, params)
      .then(result => {
        const grade = result.rows[0];
        res.status(201).json(grade);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  }
});

app.put('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  if (gradeId < 1 || !Number.isInteger(gradeId)) {
    res.status(400).json({
      error: 'gradeId must be a positive integer.'
    });
  } else if (req.body.name === undefined || req.body.course === undefined || req.body.score === undefined) {
    res.status(400).json({
      error: 'Missing name, course, or score'
    });
  } else if (req.body.score < 0 || req.body.score > 100 || !Number.isInteger(req.body.score)) {
    res.status(400).json({
      error: 'Score must be an integer from 0 to 100.'
    });
  } else {
    const sql = `
    update "grades"
      set "name" = $2,
          "course" = $3,
          "score" = $4
    where "gradeId" = $1
    returning *
    `;
    const params = [gradeId, req.body.name, req.body.course, req.body.score];
    db.query(sql, params)
      .then(result => {
        const grade = result.rows[0];
        if (!grade) {
          res.status(404).json({
            error: `Cannot find grade with gradeId ${gradeId}`
          });
        } else {
          res.status(200).json(grade);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  }
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  if (gradeId < 1 || !Number.isInteger(gradeId)) {
    res.status(400).json({
      error: 'gradeId must be a positive integer.'
    });
  } else {
    const sql = `
    delete from "grades"
    where "gradeId" = $1
    returning *
    `;
    const params = [gradeId];
    db.query(sql, params)
      .then(result => {
        const grade = result.rows[0];
        if (!grade) {
          res.status(404).json({
            error: `Cannot find grade with "gradeId" ${gradeId}`
          });
        } else {
          res.sendStatus(204);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  }
});
