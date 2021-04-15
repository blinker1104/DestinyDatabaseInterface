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
  // console.log(`request getItem: ${req.params.id}`);
  // res.end();
  itemDB.getById(req.params.id)
    .then((response) => {
      if(response){
        console.log(`Item Search: ${response.name} / ${response.id}`);

      } else {
      }
      res.send(response);
    });

});



app.get('/searchHash', (req, res) => {

});




app.get('/getItems/:items', (req, res) => {
  let ids = req.params.items;  // TextFormat
  //  432476743,1294026524,3250034553,1561002382,706527188,3108830275,1363705634,3336648220

  itemDB.getByIds(ids)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).end(err);
    });
});



//432476743,1294026524,3250034553,1561002382,706527188,3108830275,1363705634,3336648220
//http://localhost:4000/getItemList/[432476743,1294026524,3250034553,1561002382,706527188,3108830275,1363705634,3336648220]

app.listen(port, () => {
  console.log( `Path: ${(path.join(__dirname, 'public'))}\n` + `proxy listening on http://localhost:${port}\n` );



});


//+ `${db.printSeasons()}`
