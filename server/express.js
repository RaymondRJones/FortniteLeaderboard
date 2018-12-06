var path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    listingsRouter = require('./sightings.server.routes');
const sqlite3 = require('sqlite3').verbose();
const app = express();

module.exports.init = function() {
  // open the database
  let db = new sqlite3.Database('flowers.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the flowers database.');
  });
  //Practice query to display all of the name
  db.serialize(() => {
    db.each(`SELECT Name as name
             FROM sightings`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.name);
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });

  app.use(morgan('dev'));
  app.use(bodyParser.json());


  //Serve static files
  app.use('/', express.static(path.join(__dirname, '../client')));


  //Flowers Router for requests to api
  app.use('/api/listings', listingsRouter);

  //Go to homepage for any other routes entered
  app.all('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/index.html'));
  });
  return app;
};
