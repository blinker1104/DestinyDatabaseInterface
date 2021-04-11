const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

const db = require('../database/db');  // EN global - world content db
const ItemDAO = require('../database/itemDB/db_item_DAO');
const ItemDB = require('../database/itemDB/db_item');
const itemDAO = new ItemDAO();
const itemDB = new ItemDB(itemDAO);

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => { res.send('hello')});


app.get('/getSeasons', (req, res) => {
  db.getSeasons()
    .then(r => {res.send(r)});
});


app.get('/getItem/:id', (req, res) => {
  itemDB.getById(req.params.id)
    .then((result) => {
      console.log('Item Search: ' + result.name);
      res.send(result);
    });
});

// app.get('/getItemDetail', (req, res) => {
//   // res.send(200);
// });


app.get('/getItemList/:items', (req, res) => {
  itemDB.getByIds(req.params.items)
    .then((result) => {
      console.log('Item Search: ' + result.name);
      res.send(result);
    });
});


app.listen(port, () => {
  console.log( `Path: ${(path.join(__dirname, 'public'))}\n` + `proxy listening on http://localhost:${port}\n` );



});


//+ `${db.printSeasons()}`
