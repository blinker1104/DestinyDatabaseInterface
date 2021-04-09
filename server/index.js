const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

const db = require('../database/db');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => { res.send('hello')});


app.get('/getSeasons', (req, res) => {
  db.getSeasons()
    .then(r => {res.send(r)});
});


app.get('/getWeapons', (req, res) => {
  // db.getSeasons()
  //   .then(r => {res.send(r)});
});


app.listen(port, () => {
  console.log( `Path: ${(path.join(__dirname, 'public'))}\n` + `proxy listening on http://localhost:${port}\n`
  )

});


//+ `${db.printSeasons()}`
