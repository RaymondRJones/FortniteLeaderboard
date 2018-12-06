var path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    listingsRouter = require('./sightings.server.routes');
const sqlite3 = require('sqlite3').verbose();
const app = express();

module.exports.init = function() {


  app.use(morgan('dev'));
  app.use(bodyParser.json());


  //Serve static files
  app.use('/', express.static(path.join(__dirname, '../client')));

  //Flowers Router for requests to api
  app.use('/api/listings', listingsRouter);

  //Go to homepage for any other routes entered
  /*
  app.all('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/index.html'));
  });
*/

  // open the database
  let db = new sqlite3.Database('flowers.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the flowers database.');
  });
  /*
  //Serialize prevents parallel queries
  db.serialize(() => {
    db.each(`SELECT Name as name
             FROM sightings`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.name);
    });
  });
  */
  app.get('/api', (req,res) => {
    console.log("enter");
  });
  app.get('/apii', (req,res) => {
    res.send("enter");
  });
  //Flowers Router for requests to api
  app.get('/api/sightings', (req,res) => {
    db.all('SELECT * FROM sightings', (err, rows) => {
      res.send(rows);
    });
  });
  app.get('/api/flowers', (req,res) => {
    db.all('SELECT * FROM flowers', (err, rows) => {
      res.send(rows);
    });
  });
  app.get('/api/features', (req,res) => {
    db.all('SELECT * FROM features', (err, rows) => {
      res.send(rows);
    });
  });
  //close
  /*
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  */


  return app;
};
