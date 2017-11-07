const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const contactManager = require('./lib/contact_manager');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/timers', (req, res) => {
  res.json(contactManager.getAll());
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
