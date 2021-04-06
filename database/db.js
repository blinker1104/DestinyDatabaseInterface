

// let request = require('request');
// let fs = require('fs');

let sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database(':memory:');
// let db_en = 'world_sql_content/world_sql_content_95411fe3f93a8c687c6eab50c0e5c445.content';
const path = require('path');
let db_en = path.join(__dirname,'world_sql_content/world_sql_content.db');
let db = new sqlite3.Database(db_en, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log('filepath: ' + db_en);
    console.error(err.message);
  }
  console.log('Connected to the DB');
});

let jsonObjs = [], itemInfo=[];



let routine = () => {
  db.serialize(() => {
    //Season Definition
    let q = 'SELECT id, json FROM DestinySeasonDefinition';
    db.each(q, function (err, row){
      jsonObjs.push(JSON.parse(row.json));
    });

    q = 'SELECT id, json FROM DestinyInventoryItemDefinition';
    db.each(q, (err, row) => {
      // itemInfo[row.id] = (JSON.parse(row.json));
      itemInfo.push(JSON.parse(row.json));
    })
  });

}

routine();


let printSeasonInfo = () => {
  console.log('SeasonInfo - from JSON objs'); // console.log(jsonObjs[0]);

  for( let o of jsonObjs ){
    if(o.index === 0){
      continue;
    }
    let msg = o.seasonNumber + ' ' ;
    if(o.redacted ){
      msg += ' [redacted]';
    } else {
      msg += o.displayProperties.name;
    }
    console.log(msg);
  }
}

//Huckleberry itemHash = 2286143274
let printItemInfo = (itemHash=2286143274) => {
  console.log('id: ' + itemHash); // console.log(jsonObjs[0]);
  console.log('item#: ' + itemInfo.length);

  console.log('info: ');
  let flag_search = false;
  for ( let o of itemInfo) {
    if( o.hash === itemHash) {
      console.log('Item Found');
      console.log(o);
      flag_search = true;
      break;
    }
  }

}


db.close( () => {
  printSeasonInfo();
  printItemInfo();
});

//module.exports = db;  // var db = require("./database.js")






// db.serialize(function() {

  // db.run('CREATE TABLE lorem (info TEXT)');
  // var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

  // for ( let i = 0; i<10; i++) {
  //   stmt.run('Ipsum ' + i);
  // }

  // stmt.finalize();

//   db.each('SELECT rowid AS id, info FROM lorem', function (err, row){
//     console.log(row.id + ': ' + row.info);
//   });
// });

// db.close();


/*
let en_path = 'world_sql_content/world_sql_content_95411fe3f93a8c687c6eab50c0e5c445.content';



function queryManifest(){
	let db = new sqlite.Database('manifest.content');


  const rawdb = db.getDatabaseInstance();
  rawdb.serialize(function(){
    console.log('db working?');
		let query = "SELECT name FROM sqlite_master WHERE type='table'";

		db.each(query, function(err, row){
			if(err){
        console.log(err);
        throw err;
      }

			console.log(row);

	});
}

*/