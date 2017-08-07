const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  pgp = require('pg-promise')();

const db = pgp(process.env.DB_CONNSTRING || 'postgres://localhost/census-api');

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/ea/:ea_code', async function (req, res, next) {
  try {
    var result = await db.oneOrNone(
      'SELECT code AS ea_code, sal_code, sp_code, ea_gtype, ea_type FROM ea WHERE code = $1',
      [req.params.ea_code]
    );
    if (result) res.json(result);
    else return next(404);
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  if (err == 404) {
    res.status(404).send('Not Found');
  } else {
    console.log('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

let port = parseInt(process.env.PORT) || 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});
