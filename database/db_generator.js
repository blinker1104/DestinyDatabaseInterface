// let fs = require('fs');

const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');
// let db = new sqlite3.Database(':memory:');
// let db_en = 'world_sql_content/world_sql_content_95411fe3f93a8c687c6eab50c0e5c445.content';
const path = require('path');
let db_en = path.join(__dirname,'world_sql_content/world_sql_content.db');


let db_item = path.join(__dirname,'simplified_content/itemDB.db');



let itemDB_initTable = () => {
  let q = '';
}


let itemDB_generator = () => {


  // //Huckleberry itemHash = 2286143274
  // //Posterity itemHash   = 3281285075
  // //Astral Horizon itemHash = 1697682876

  //Manifest
  let db = new sqlite3.Database(db_en, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log('filepath: ' + db_en);
      console.error(err.message);
    }
    console.log('Connected to the ManifestInventoryDB');
  });

  //Item DB
  let itemDb = new sqlite3.Database(db_item, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log('filepath: ' + db_item);
      console.error(err.message);
    }

    console.log('Connected to the itemDB');
  });

  db.serialize(() => {

    //db_item - init
    // init - cleanup

    // if()
    let q_i = `CREATE TABLE IF NOT EXISTS itemDB (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      hasIcon INTEGER NOT NULL,
      icon TEXT
      )`;
    db_item.run(q_i);


    let q = 'SELECT json FROM DestinyInventoryItemDefinition';


    db.each(q, (err, row) => {
      const r = JSON.parse(row.json);
      if(r.inventory.isInstanceItem) {
        // Item DB format
        let t = {
          id:       r.hash,
          name:     r.displayProperties.name,
          hasIcon: (r.displayProperties.hasIcon ? 1 : 0),
          icon:     r.displayProperties.icon
        };

        db_item.run('INSERT INTO itemDB(id, name, hasIcon, icon) VALUES (?, ?, ?, ?)', [t.id, t.name, t.hasIcon, t.icon ] , (err) => {
          if(err) {
            return console.log(err.message);
          }
          console.log( 'item ' + t.name + ' added to ItemDB');
        });

      }
    });

  });

  db.close();
  itemDb.close();

};




itemDB_generator();